'use client';

import { useState, useCallback } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { 
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction
} from '@solana/web3.js';
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  getAssociatedTokenAddress,
  createMintToInstruction,
  createAssociatedTokenAccountInstruction
} from '@solana/spl-token';
import {
  PROGRAM_ID,
  createCreateMetadataAccountV3Instruction,
} from '@metaplex-foundation/mpl-token-metadata';
import axios from 'axios';
import { notifySuccess, notifyError, notifyWarning } from '@/utils/notifications';
import { useNetwork } from '@/app/providers/NetworkProvider';
import { getExplorerUrl } from '@/utils/explorer';

// shadcn components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldSeparator,
} from '@/components/ui/field';
import { Loader2, Upload, AlertCircle, Coins, Copy, ExternalLink, Check, Info } from 'lucide-react';
import Link from 'next/link';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

// Opsi decimals dengan penjelasan bahasa Indonesia
const decimalsOptions = [
  { label: '0 - Tidak bisa dipecah (NFT / Soulbound)', value: 0 },
  { label: '2 - Dasar (Gaya Rupiah/Sen)', value: 2 },
  { label: '6 - Stablecoin (Gaya USDC/USDT)', value: 6 },
  { label: '9 - Standar (Gaya SOL) ✅ Direkomendasikan', value: 9 },
  { label: '12 - Presisi tinggi (Token DeFi) ⚠️ Supply terbatas', value: 12 },
];

export default function CreateToken() {
  const { network } = useNetwork();
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  
  const [tokenMintAddress, setTokenMintAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showDecimalsInfo, setShowDecimalsInfo] = useState(false);
  
  const [token, setToken] = useState({
    name: '',
    symbol: '',
    decimals: '9',
    amount: '',
    image: '',
    description: ''
  });
  
  // Handle form change dengan null safety
  const handleFormChange = (fieldName: string, value: string | null) => {
    setToken({ ...token, [fieldName]: value || '' });
  };
  
  // Upload gambar ke Pinata
  const uploadImagePinata = async (file: File) => {
    if (!file) return null;
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axios({
        method: 'POST',
        url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
        data: formData,
        headers: {
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY || '',
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_KEY || '',
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    } catch (error) {
      console.error('Error uploading image:', error);
      notifyError('Gagal upload gambar', 'Silakan coba lagi');
      return null;
    }
  };
  
  // Upload metadata ke Pinata
  const uploadMetadata = async (tokenData: typeof token) => {
    const { name, symbol, image, description } = tokenData;
    
    if (!name || !symbol || !image || !description) {
      notifyWarning('Harap isi semua data token!');
      return null;
    }
    
    setIsLoading(true);
    
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        data: JSON.stringify({ name, symbol, image, description }),
        headers: {
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY || '',
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_KEY || '',
          'Content-Type': 'application/json'
        }
      });
      
      return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    } catch (error) {
      console.error('Error uploading metadata:', error);
      notifyError('Gagal upload metadata ke Pinata');
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Dapatkan link explorer
  const getExplorerLink = (address: string) => {
    return getExplorerUrl(network, address, 'address');
  };
  
  // Copy address
  const copyAddress = async () => {
    await navigator.clipboard.writeText(tokenMintAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Buat token
  const createToken = useCallback(async () => {
    if (!publicKey) {
      notifyError('Dompet tidak terhubung', 'Silakan sambungkan dompet Anda terlebih dahulu');
      return;
    }

    const { name, symbol, decimals, amount, image, description } = token;
    
    if (!name || !symbol || !decimals || !amount || !image || !description) {
      notifyWarning('Harap isi semua data token!');
      return;
    }

    setIsLoading(true);
    
    try {
      const lamports = await getMinimumBalanceForRentExemptMint(connection);
      const mintKeypair = Keypair.generate();
      const tokenATA = await getAssociatedTokenAddress(mintKeypair.publicKey, publicKey);
      
      const metadataUrl = await uploadMetadata(token);
      if (!metadataUrl) {
        setIsLoading(false);
        return;
      }
      
      const createMetadataInstruction = createCreateMetadataAccountV3Instruction({
        metadata: PublicKey.findProgramAddressSync([
          Buffer.from('metadata'),
          PROGRAM_ID.toBuffer(),
          mintKeypair.publicKey.toBuffer()
        ], PROGRAM_ID)[0],
        mint: mintKeypair.publicKey,
        mintAuthority: publicKey,
        payer: publicKey,
        updateAuthority: publicKey
      }, {
        createMetadataAccountArgsV3: {
          data: {
            name,
            symbol,
            uri: metadataUrl,
            creators: null,
            sellerFeeBasisPoints: 0,
            uses: null,
            collection: null
          },
          isMutable: false,
          collectionDetails: null
        }
      });
      
      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: MINT_SIZE,
          programId: TOKEN_PROGRAM_ID,
          lamports
        }),
        createInitializeMintInstruction(
          mintKeypair.publicKey,
          Number(decimals),
          publicKey,
          publicKey,
          TOKEN_PROGRAM_ID
        ),
        createAssociatedTokenAccountInstruction(
          publicKey,
          tokenATA,
          publicKey,
          mintKeypair.publicKey
        ),
        createMintToInstruction(
          mintKeypair.publicKey,
          tokenATA,
          publicKey,
          Number(amount) * Math.pow(10, Number(decimals))
        ),
        createMetadataInstruction
      );
      
      const signature = await sendTransaction(transaction, connection, {
        signers: [mintKeypair]
      });
      
      setTokenMintAddress(mintKeypair.publicKey.toString());
      notifySuccess(
        'Token berhasil dibuat! 🎉',
        `${name} (${symbol}) telah di-deploy di jaringan ${network}`,
        signature,
        network
      );
      
      // Reset form
      setToken({
        name: '',
        symbol: '',
        decimals: '9',
        amount: '',
        image: '',
        description: ''
      });
      setImagePreview(null);
      
    } catch (error: any) {
      console.error('Error creating token:', error);
      notifyError('Gagal membuat token', error.message || 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  }, [token, publicKey, connection, sendTransaction, network]);
  
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    const imgUrl = await uploadImagePinata(file);
    if (imgUrl) {
      setToken({ ...token, image: imgUrl });
    }
  };
  
  const isDevnet = network === WalletAdapterNetwork.Devnet;

  // Cek apakah decimals > 9 untuk kasih warning
  const selectedDecimals = Number(token.decimals);
  const maxSupply = Math.floor(2**64 / 10**selectedDecimals);
  const isHighDecimals = selectedDecimals > 9;
  const isDangerDecimals = selectedDecimals > 12;

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-3">
            <Coins className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Buat Token SPL
            </h1>
            <p className="text-sm text-muted-foreground">
              Buat token SPL sendiri di jaringan Solana
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-muted-foreground">Jaringan:</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400">
                {network === 'mainnet-beta' ? 'Mainnet' : network}
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); createToken(); }}>
          <FieldGroup>
            <FieldSet className="border border-white/5 rounded-xl bg-card p-6">
              <FieldLegend className="text-lg font-semibold">Buat Token di Solana</FieldLegend>
              <FieldDescription className="text-muted-foreground">
                Semua transaksi aman dan terenkripsi
              </FieldDescription>

              <FieldGroup className="space-y-4 mt-4">
                {/* Nama Token */}
                <Field>
                  <FieldLabel htmlFor="name-token">Nama Token *</FieldLabel>
                  <Input
                    id="name-token"
                    placeholder="Contoh: Token Keren Saya"
                    value={token.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                    required
                    className="h-11 bg-muted/50 border-white/10 focus:border-purple-500/50"
                  />
                </Field>

                {/* Simbol Token */}
                <Field>
                  <FieldLabel htmlFor="symbol-token">Simbol Token *</FieldLabel>
                  <Input
                    id="symbol-token"
                    placeholder="CONTOH: TKS"
                    value={token.symbol}
                    onChange={(e) => handleFormChange('symbol', e.target.value.toUpperCase())}
                    required
                    maxLength={10}
                    className="h-11 bg-muted/50 border-white/10 focus:border-purple-500/50"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Maksimal 10 karakter</p>
                </Field>

                {/* Decimals */}
                <Field>
                  <div className="flex items-center gap-2">
                    <FieldLabel>Desimal Token *</FieldLabel>
                    <button
                      type="button"
                      onClick={() => setShowDecimalsInfo(!showDecimalsInfo)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Info className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {showDecimalsInfo && (
                    <div className="mb-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm text-blue-400">
                      <p className="font-medium">💡 Apa itu Desimal?</p>
                      <p className="text-xs mt-1">
                        Desimal menentukan berapa banyak angka di belakang koma token Anda.
                        <br />
                        • <strong>9</strong> = Standar Solana (paling umum) ✅
                        <br />
                        • <strong>6</strong> = Untuk stablecoin (seperti USDC)
                        <br />
                        • <strong>0</strong> = Untuk NFT / token yang tidak bisa dipecah
                        <br />
                        • <strong>&gt;9</strong> = ⚠️ Membatasi total supply maksimum!
                      </p>
                    </div>
                  )}
                  
                  <Select
                    value={token.decimals}
                    onValueChange={(value) => handleFormChange('decimals', value || '9')}
                  >
                    <SelectTrigger className="w-full h-11 bg-muted/50 border-white/10 focus:border-purple-500/50">
                      <SelectValue placeholder="Pilih desimal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {decimalsOptions.map((item) => (
                          <SelectItem key={item.value} value={String(item.value)}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {/* Warning untuk decimals tinggi */}
                  {isHighDecimals && !isDangerDecimals && (
                    <div className="mt-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <p className="text-yellow-500 text-sm">
                        ⚠️ Dengan {selectedDecimals} desimal, maksimum total supply adalah{' '}
                        <strong>{maxSupply.toLocaleString()}</strong> token
                      </p>
                      <p className="text-yellow-500/80 text-xs mt-1">
                        Pastikan supply yang Anda rencanakan di bawah batas ini!
                      </p>
                    </div>
                  )}

                  {isDangerDecimals && (
                    <div className="mt-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <p className="text-red-500 text-sm font-medium">
                        🚨 PERINGATAN! {selectedDecimals} desimal terlalu tinggi!
                      </p>
                      <p className="text-red-500/80 text-xs mt-1">
                        Maksimum supply hanya <strong>{maxSupply.toLocaleString()}</strong> token.
                        {selectedDecimals >= 18 && ' Dengan 18 desimal, Anda hanya bisa membuat ~18 token!'}
                      </p>
                      <p className="text-red-500/80 text-xs mt-1">
                        💡 Gunakan 9 desimal (standar) untuk hasil terbaik.
                      </p>
                    </div>
                  )}

                  {/* Preview */}
                  <div className="mt-2 p-3 bg-muted/30 border border-white/5 rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      🔍 Dengan {selectedDecimals} desimal:
                      <br />
                      1 token = <strong>{(10 ** selectedDecimals).toLocaleString()}</strong> unit dasar
                      {selectedDecimals > 9 && ' ⚠️ (besar!)'}
                    </p>
                    {token.amount && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Total unit dasar: <strong>
                          {(Number(token.amount) * 10 ** selectedDecimals).toLocaleString()}
                        </strong>
                        {Number(token.amount) * 10 ** selectedDecimals > Number.MAX_SAFE_INTEGER && 
                          ' 🚨 MELEBIHI BATAS!'
                        }
                      </p>
                    )}
                  </div>
                </Field>

                {/* Supply */}
                <Field>
                  <FieldLabel htmlFor="supply-token">Total Supply *</FieldLabel>
                  <Input
                    id="supply-token"
                    type="number"
                    placeholder="1000000"
                    value={token.amount}
                    onChange={(e) => handleFormChange('amount', e.target.value)}
                    required
                    min="1"
                    className="h-11 bg-muted/50 border-white/10 focus:border-purple-500/50"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Jumlah token yang akan dibuat (dalam satuan token, bukan unit dasar)
                  </p>
                </Field>

                {/* Deskripsi */}
                <Field>
                  <FieldLabel htmlFor="description-token">Deskripsi</FieldLabel>
                  <Textarea
                    id="description-token"
                    placeholder="Jelaskan token Anda..."
                    value={token.description}
                    onChange={(e) => handleFormChange('description', e.target.value)}
                    rows={3}
                    className="resize-none bg-muted/50 border-white/10 focus:border-purple-500/50"
                  />
                </Field>

                {/* Upload Gambar */}
                <Field>
                  <FieldLabel>Gambar Token *</FieldLabel>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        disabled={isLoading}
                      />
                      <div className="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 hover:bg-muted transition-colors overflow-hidden">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="h-full w-full rounded-lg object-cover"
                          />
                        ) : (
                          <Upload className="h-8 w-8 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">
                        Upload logo untuk token Anda. PNG, JPG atau SVG.
                      </p>
                      <p className="text-xs text-muted-foreground/60">Maksimal 2MB</p>
                    </div>
                  </div>
                </Field>

                <FieldSeparator className="my-2" />

                {/* Warning SOL */}
                <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4 flex gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-yellow-500">
                      Pastikan Anda memiliki cukup SOL untuk biaya transaksi di jaringan <strong>{network}</strong>.
                    </p>
                    <Link
                      href="/airdrop"
                      className="text-sm text-purple-400 hover:underline inline-flex items-center gap-1"
                    >
                      {isDevnet ? 'Dapatkan SOL Devnet →' : 'Dapatkan SOL Devnet →'}
                    </Link>
                  </div>
                </div>

                {/* Tombol Submit */}
                <Button
                  type="submit"
                  disabled={isLoading || !publicKey}
                  className="w-full h-11 bg-gradient-to-r from-purple-400 to-blue-500 hover:from-purple-500 hover:to-blue-600 text-base shadow-lg shadow-purple-500/25"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Membuat Token...
                    </>
                  ) : (
                    'Buat Token'
                  )}
                </Button>

                {/* Hasil - Token Berhasil Dibuat */}
                {tokenMintAddress && (
                  <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-4 space-y-3 animate-in fade-in slide-in-from-bottom-2">
                    <p className="text-sm text-green-500 font-medium flex items-center gap-2">
                      <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                       Token berhasil dibuat!
                    </p>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Alamat Mint</p>
                      <div className="flex items-center gap-2 bg-background/50 rounded-lg p-2.5 border border-white/5">
                        <code className="text-xs font-mono flex-1 break-all text-foreground">
                          {tokenMintAddress}
                        </code>
                        <button
                          onClick={copyAddress}
                          className="p-1.5 rounded hover:bg-muted transition-colors flex-shrink-0"
                          title="Salin alamat"
                        >
                          {copied ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <a
                        href={getExplorerLink(tokenMintAddress)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Lihat di Explorer
                      </a>
                      <a
                        href={`https://solscan.io/token/${tokenMintAddress}${network !== 'mainnet-beta' ? `?cluster=${network}` : ''}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Lihat di Solscan
                      </a>
                    </div>
                  </div>
                )}

                {/* Status koneksi wallet */}
                {!publicKey && (
                  <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3">
                    <p className="text-sm text-red-400 text-center">
                      ⚠️ Silakan sambungkan dompet Anda terlebih dahulu
                    </p>
                  </div>
                )}
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Dibuat dengan ❤️ di Solana {network}
        </p>
      </div>
    </div>
  );
}