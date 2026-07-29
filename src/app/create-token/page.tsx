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
  programId as PROGRAM_ID,
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
import { Loader2, Upload, AlertCircle, Coins, Copy, ExternalLink, Check } from 'lucide-react';
import Link from 'next/link';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

const items = [
  { label: '0 - Non-fractional (NFT / Soulbound)', value: 0 },
  { label: '2 - Basic (Cents-style)', value: 2 },
  { label: '6 - Stablecoin (USDC/USDT style)', value: 6 },
  { label: '9 - Standard (SOL style) Recommended', value: 9 },
  { label: '12 - High precision (DeFi tokens)', value: 12 },
];

const pinataApiKey="e736843165cc7bde50ef";
const pinataSecretApiKey="34776c6523d2b7c6cabe3659afed87b0072a075759df9b0af7553a4b4da93ca8";

export default function CreateToken() {
  const { network } = useNetwork();
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  
  const [tokenMintAddress, setTokenMintAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  const [token, setToken] = useState({
    name: '',
    symbol: '',
    decimals: '9',
    amount: '',
    image: '',
    description: ''
  });
  
  const handleFormChange = (fieldName: string, value: string) => {
    setToken({ ...token, [fieldName]: value });
  };
  
  // Upload image ke Pinata
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
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key:  pinataSecretApiKey,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    } catch (error) {
      console.error('Error uploading image:', error);
      notifyError('Failed to upload image', 'Please try again');
      return null;
    }
  };
  
  // Upload metadata ke Pinata
  const uploadMetadata = async (tokenData: typeof token) => {
    const { name, symbol, image, description } = tokenData;
    
    if (!name || !symbol || !image || !description) {
      notifyWarning('Please fill in all token data!');
      return null;
    }
    
    setIsLoading(true);
    
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        data: JSON.stringify({ name, symbol, image, description }),
        headers: {
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key:  pinataSecretApiKey,
          'Content-Type': 'application/json'
        }
      });
      
      return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    } catch (error) {
      console.error('Error uploading metadata:', error);
      notifyError('Failed to upload metadata to Pinata');
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  const getExplorerLink = (address: string) => {
    return getExplorerUrl(network, address, 'address');
  };
  
  // Copy address
  const copyAddress = async () => {
    await navigator.clipboard.writeText(tokenMintAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Create token
  const createToken = useCallback(async () => {
    if (!publicKey) {
      notifyError('Wallet not connected', 'Please connect your wallet first');
      return;
    }

    const { name, symbol, decimals, amount, image, description } = token;
    
    if (!name || !symbol || !decimals || !amount || !image || !description) {
      notifyWarning('Please fill in all token data!');
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
        'Token created successfully! 🎉',
        `${name} (${symbol}) has been deployed on ${network}`,
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
      notifyError('Failed to create token', error.message || 'Unknown error');
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
              Create Token
            </h1>
            <p className="text-sm text-muted-foreground">
              Launch your own SPL token on Solana
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-muted-foreground">Network:</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400">
                {network}
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); createToken(); }}>
          <FieldGroup>
            <FieldSet className="border border-white/5 rounded-xl bg-card p-6">
              <FieldLegend className="text-lg font-semibold">Create Token Solana</FieldLegend>
              <FieldDescription className="text-muted-foreground">
                All transactions are secure and encrypted
              </FieldDescription>

              <FieldGroup className="space-y-4 mt-4">
                {/* Token Name */}
                <Field>
                  <FieldLabel htmlFor="name-token">Token Name</FieldLabel>
                  <Input
                    id="name-token"
                    placeholder="My Awesome Token"
                    value={token.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                    required
                    className="h-11 bg-muted/50 border-white/10 focus:border-purple-500/50"
                  />
                </Field>

                {/* Token Symbol */}
                <Field>
                  <FieldLabel htmlFor="symbol-token">Token Symbol</FieldLabel>
                  <Input
                    id="symbol-token"
                    placeholder="MAT"
                    value={token.symbol}
                    onChange={(e) => handleFormChange('symbol', e.target.value.toUpperCase())}
                    required
                    maxLength={10}
                    className="h-11 bg-muted/50 border-white/10 focus:border-purple-500/50"
                  />
                </Field>

                {/* Decimals */}
                <Field>
                  <FieldLabel>Token Decimals</FieldLabel>
                  <Select
                    value={token.decimals}
                    onValueChange={(value) => handleFormChange('decimals', value)}
                  >
                    <SelectTrigger className="w-full h-11 bg-muted/50 border-white/10 focus:border-purple-500/50">
                      <SelectValue placeholder="Select decimals" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {items.map((item) => (
                          <SelectItem key={item.value} value={String(item.value)}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>

                {/* Supply */}
                <Field>
                  <FieldLabel htmlFor="supply-token">Token Supply</FieldLabel>
                  <Input
                    id="supply-token"
                    type="number"
                    placeholder="1000000"
                    value={token.amount}
                    onChange={(e) => handleFormChange('amount', e.target.value)}
                    required
                    className="h-11 bg-muted/50 border-white/10 focus:border-purple-500/50"
                  />
                </Field>

                {/* Description */}
                <Field>
                  <FieldLabel htmlFor="description-token">Description</FieldLabel>
                  <Textarea
                    id="description-token"
                    placeholder="Describe your token"
                    value={token.description}
                    onChange={(e) => handleFormChange('description', e.target.value)}
                    rows={3}
                    className="resize-none bg-muted/50 border-white/10 focus:border-purple-500/50"
                  />
                </Field>

                {/* Image Upload */}
                <Field>
                  <FieldLabel>Token Image</FieldLabel>
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
                        Upload a logo for your token. PNG, JPG or SVG.
                      </p>
                      <p className="text-xs text-muted-foreground/60">Max 2MB</p>
                    </div>
                  </div>
                </Field>

                <FieldSeparator className="my-2" />

                {/* Warning */}
                <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4 flex gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-yellow-500">
                      Make sure you have enough SOL to cover the transaction fees on <strong>{network}</strong>.
                    </p>
                    <Link
                      href="/airdrop"
                      className="text-sm text-purple-400 hover:underline inline-flex items-center gap-1"
                    >
                      {isDevnet ? 'Get more Devnet SOL →' : 'Get Devnet SOL →'}
                    </Link>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading || !publicKey}
                  className="w-full h-11 bg-gradient-to-r from-purple-400 to-blue-500 hover:from-purple-500 hover:to-blue-600 text-base shadow-lg shadow-purple-500/25"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating Token...
                    </>
                  ) : (
                    'Create Token'
                  )}
                </Button>

                {/*  HASIL DENGAN EXPLORER LINK */}
                {tokenMintAddress && (
                  <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-4 space-y-3 animate-in fade-in slide-in-from-bottom-2">
                    <p className="text-sm text-green-500 font-medium flex items-center gap-2">
                      <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      Token created successfully!
                    </p>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Mint Address</p>
                      <div className="flex items-center gap-2 bg-background/50 rounded-lg p-2.5 border border-white/5">
                        <code className="text-xs font-mono flex-1 break-all text-foreground">
                          {tokenMintAddress}
                        </code>
                        <button
                          onClick={copyAddress}
                          className="p-1.5 rounded hover:bg-muted transition-colors flex-shrink-0"
                          title="Copy address"
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
                      {/* ✅ PAKE getExplorerUrl DARI UTILS */}
                      <a
                        href={getExplorerLink(tokenMintAddress)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        View on Explorer
                      </a>
                      <a
                        href={`https://solscan.io/token/${tokenMintAddress}${network !== 'mainnet-beta' ? `?cluster=${network}` : ''}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        View on Solscan
                      </a>
                    </div>
                  </div>
                )}
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Built with ❤️ on Solana {network}
        </p>
      </div>
    </div>
  );
}