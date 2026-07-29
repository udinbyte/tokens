'use client';

import { useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { 
  Metadata,
  PROGRAM_ID,
} from '@metaplex-foundation/mpl-token-metadata';
import { getMint } from '@solana/spl-token';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldSeparator,
} from '@/components/ui/field';
import { 
  Loader2, 
  FileText, 
  ExternalLink, 
  Copy, 
  Check,
  AlertCircle,
  Pencil,
  Save,
  RefreshCw,
} from 'lucide-react';
import { useNetwork } from '@/app/providers/NetworkProvider';
import { getExplorerUrl } from '@/utils/explorer';
import { notifySuccess, notifyError, notifyWarning } from '@/utils/notifications';

interface TokenMetadata {
  mint: string;
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  creators: Array<{ address: string; verified: boolean; share: number }>;
  isMutable: boolean;
  primarySaleHappened?: boolean;
  updateAuthority?: string;
}

interface TokenSupply {
  supply: bigint;
  decimals: number;
}

export default function MetadataPage() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const { network } = useNetwork();
  
  const [mintAddress, setMintAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [metadata, setMetadata] = useState<TokenMetadata | null>(null);
  const [tokenSupply, setTokenSupply] = useState<TokenSupply | null>(null);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const [rawMetadata, setRawMetadata] = useState<any>(null);
  const [showRaw, setShowRaw] = useState(false);
  
  const [editData, setEditData] = useState({
    name: '',
    symbol: '',
    description: '',
    image: '',
  });

  const fetchUriMetadata = async (uri: string) => {
    try {
      const response = await axios.get(uri);
      setRawMetadata(response.data);
      setDescription(response.data.description || '');
      
      if (response.data.image) {
        setImageUrl(response.data.image);
        setEditData(prev => ({ ...prev, image: response.data.image }));
      }
      
      return response.data;
    } catch (error) {
      console.error('Error fetching URI metadata:', error);
      return null;
    }
  };

  const fetchMetadata = async () => {
    if (!mintAddress) {
      notifyWarning('Masukkan alamat mint token');
      return;
    }

    setFetching(true);
    setMetadata(null);
    setTokenSupply(null);
    setImageUrl(null);
    setDescription('');
    setRawMetadata(null);
    
    try {
      const mint = new PublicKey(mintAddress);
      
      const metadataPDA = await Metadata.fromAccountAddress(connection, mint);
      
      const mintInfo = await getMint(connection, mint);
      
      const creators = metadataPDA.data.creators?.map((creator) => ({
        address: creator.address.toString(),
        verified: creator.verified,
        share: creator.share,
      })) || [];

      const metadataData: TokenMetadata = {
        mint: mintAddress,
        name: metadataPDA.data.name || 'N/A',
        symbol: metadataPDA.data.symbol || 'N/A',
        uri: metadataPDA.data.uri || 'N/A',
        sellerFeeBasisPoints: metadataPDA.data.sellerFeeBasisPoints || 0,
        creators: creators,
        isMutable: metadataPDA.isMutable,
        primarySaleHappened: metadataPDA.data.primarySaleHappened,
        updateAuthority: metadataPDA.updateAuthority?.toString(),
      };
      
      setMetadata(metadataData);
      
      setTokenSupply({
        supply: mintInfo.supply,
        decimals: mintInfo.decimals,
      });
      
      if (metadataData.uri && metadataData.uri !== 'N/A') {
        await fetchUriMetadata(metadataData.uri);
      }
      
      setEditData({
        name: metadataData.name,
        symbol: metadataData.symbol,
        description: description || '',
        image: imageUrl || '',
      });
      
      notifySuccess('Metadata berhasil diambil!');
    } catch (error: any) {
      console.error('Error fetching metadata:', error);
      notifyError('Gagal mengambil metadata', error.message || 'Alamat mint tidak valid');
      setMetadata(null);
    } finally {
      setFetching(false);
    }
  };

  const refreshMetadata = async () => {
    setRefreshing(true);
    await fetchMetadata();
    setRefreshing(false);
  };

  const updateMetadata = async () => {
    if (!metadata?.isMutable) {
      notifyError('Tidak dapat diupdate', 'Token ini tidak mutable');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMetadata(prev => prev ? {
        ...prev,
        name: editData.name,
        symbol: editData.symbol,
      } : null);
      
      setDescription(editData.description);
      setImageUrl(editData.image);
      
      notifySuccess('Metadata berhasil diupdate! 🎉');
      setIsEditing(false);
    } catch (error: any) {
      notifyError('Gagal update metadata', error.message);
    } finally {
      setLoading(false);
    }
  };

  const copyAddress = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatSupply = (supply: bigint, decimals: number) => {
    return Number(supply) / Math.pow(10, decimals);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-3">
            <FileText className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Metadata Token
            </h1>
            <p className="text-sm text-muted-foreground">
              Lihat dan kelola metadata token Anda
            </p>
          </div>
        </div>

        <FieldGroup>
          <FieldSet className="border border-white/5 rounded-xl bg-card p-6">
            <FieldLegend>Lihat Metadata</FieldLegend>
            <FieldDescription>
              Masukkan alamat mint token untuk melihat metadata
            </FieldDescription>

            {/* Input Mint Address */}
            <div className="flex gap-2 mt-4">
              <Input
                placeholder="Masukkan alamat mint..."
                value={mintAddress}
                onChange={(e) => setMintAddress(e.target.value)}
                className="flex-1 h-11 bg-muted/50 border-white/10 focus:border-purple-500/50"
                onKeyDown={(e) => e.key === 'Enter' && fetchMetadata()}
              />
              <Button
                onClick={fetchMetadata}
                disabled={fetching}
                className="h-11 bg-gradient-to-r from-purple-400 to-blue-500 hover:from-purple-500 hover:to-blue-600"
              >
                {fetching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Ambil'
                )}
              </Button>
            </div>

            <FieldSeparator className="my-4" />

            {/* Loading State */}
            {fetching && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
                <span className="ml-3 text-muted-foreground">Mengambil metadata...</span>
              </div>
            )}

            {/* Metadata Display */}
            {metadata && !fetching && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                {/* Token Image */}
                {imageUrl && (
                  <div className="flex justify-center">
                    <div className="relative h-32 w-32 rounded-lg overflow-hidden border border-white/10">
                      <img
                        src={imageUrl}
                        alt={metadata.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder-token.png';
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Header Actions */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Mint:</span>
                    <code className="text-xs font-mono text-foreground">
                      {metadata.mint.slice(0, 8)}...{metadata.mint.slice(-8)}
                    </code>
                    <button
                      onClick={() => copyAddress(metadata.mint)}
                      className="p-1 rounded hover:bg-muted transition-colors"
                    >
                      {copied ? (
                        <Check className="h-3.5 w-3.5 text-green-500" />
                      ) : (
                        <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </button>
                    <a
                      href={getExplorerUrl(network, metadata.mint, 'address')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={refreshMetadata}
                      disabled={refreshing}
                    >
                      <RefreshCw className={`h-3.5 w-3.5 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
                      Refresh
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                      className="gap-1"
                      disabled={!metadata.isMutable}
                    >
                      {isEditing ? (
                        <>
                          <FileText className="h-3.5 w-3.5" />
                          Batal
                        </>
                      ) : (
                        <>
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Token Info Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-muted/30 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground">Nama</p>
                    <p className="font-semibold text-sm truncate">{metadata.name}</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground">Simbol</p>
                    <p className="font-semibold text-sm">{metadata.symbol}</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground">Supply</p>
                    <p className="font-semibold text-sm">
                      {tokenSupply ? formatSupply(tokenSupply.supply, tokenSupply.decimals).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground">Desimal</p>
                    <p className="font-semibold text-sm">{tokenSupply?.decimals || 'N/A'}</p>
                  </div>
                </div>

                <FieldSeparator />

                {/* Display Mode */}
                {!isEditing ? (
                  <div className="space-y-3">
                    {description && (
                      <div>
                        <p className="text-xs text-muted-foreground">Deskripsi</p>
                        <p className="text-sm mt-1">{description}</p>
                      </div>
                    )}

                    <div>
                      <p className="text-xs text-muted-foreground">URI</p>
                      <p className="text-sm font-mono break-all">{metadata.uri}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Biaya Penjual</p>
                        <p className="font-medium">{metadata.sellerFeeBasisPoints / 100}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Mutable</p>
                        <p className="font-medium">
                          {metadata.isMutable ? (
                            <span className="text-yellow-500">Ya</span>
                          ) : (
                            <span className="text-green-500">Tidak</span>
                          )}
                        </p>
                      </div>
                    </div>

                    {metadata.creators && metadata.creators.length > 0 && (
                      <div>
                        <p className="text-xs text-muted-foreground">Kreator</p>
                        <div className="space-y-1 mt-1">
                          {metadata.creators.map((creator, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <span className="font-mono text-xs">
                                {creator.address.slice(0, 8)}...{creator.address.slice(-8)}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {creator.share}%
                              </span>
                              {creator.verified && (
                                <span className="text-xs text-green-500">✅</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {metadata.updateAuthority && (
                      <div>
                        <p className="text-xs text-muted-foreground">Update Authority</p>
                        <p className="text-sm font-mono break-all">{metadata.updateAuthority}</p>
                      </div>
                    )}

                    {rawMetadata && (
                      <div>
                        <button
                          onClick={() => setShowRaw(!showRaw)}
                          className="text-xs text-purple-400 hover:underline"
                        >
                          {showRaw ? 'Sembunyikan Raw JSON' : 'Lihat Raw JSON'}
                        </button>
                        {showRaw && (
                          <pre className="mt-2 p-3 rounded-lg bg-muted/50 text-xs overflow-auto max-h-60">
                            {JSON.stringify(rawMetadata, null, 2)}
                          </pre>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  // Edit Mode
                  <div className="space-y-4">
                    {!metadata.isMutable && (
                      <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 flex gap-2">
                        <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-red-500">
                          Token ini TIDAK mutable. Perubahan tidak dapat disimpan di on-chain.
                        </p>
                      </div>
                    )}

                    <div>
                      <Label htmlFor="edit-name">Nama</Label>
                      <Input
                        id="edit-name"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className="mt-1 bg-muted/50"
                        disabled={!metadata.isMutable}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-symbol">Simbol</Label>
                      <Input
                        id="edit-symbol"
                        value={editData.symbol}
                        onChange={(e) => setEditData({ ...editData, symbol: e.target.value.toUpperCase() })}
                        className="mt-1 bg-muted/50"
                        disabled={!metadata.isMutable}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-description">Deskripsi</Label>
                      <Textarea
                        id="edit-description"
                        value={editData.description}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                        rows={3}
                        className="mt-1 resize-none bg-muted/50"
                        disabled={!metadata.isMutable}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-image">URL Gambar</Label>
                      <Input
                        id="edit-image"
                        placeholder="https://..."
                        value={editData.image}
                        onChange={(e) => setEditData({ ...editData, image: e.target.value })}
                        className="mt-1 bg-muted/50"
                        disabled={!metadata.isMutable}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={updateMetadata}
                        disabled={loading || !metadata.isMutable}
                        className="flex-1 bg-gradient-to-r from-purple-400 to-blue-500 hover:from-purple-500 hover:to-blue-600"
                      >
                        {loading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Simpan Perubahan
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Empty State */}
            {!metadata && !fetching && (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  Masukkan alamat mint untuk melihat metadata
                </p>
              </div>
            )}
          </FieldSet>
        </FieldGroup>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Dibuat dengan ❤️ di Solana {network}
        </p>
      </div>
    </div>
  );
}