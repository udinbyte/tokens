import { PublicKey, Transaction } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

/**
 * Mendapatkan URL Solana Explorer untuk berbagai keperluan
 * 
 * @param network - Network (devnet/mainnet/testnet)
 * @param viewTypeOrItemAddress - Address atau tipe view
 * @param itemType - Jenis item ('address' | 'tx' | 'token')
 * @returns URL lengkap ke Solana Explorer
 */

export function getExplorerUrl(
  network: WalletAdapterNetwork | string,
  viewTypeOrItemAddress: 'inspector' | PublicKey | string,
  itemType: 'address' | 'tx' | 'token' | 'block'
): string {
  // 1. Tentukan cluster
  const getClusterParam = () => {
    switch (network) {
      case WalletAdapterNetwork.Mainnet:
        return '';
      case WalletAdapterNetwork.Testnet:
        return '?cluster=testnet';
      case WalletAdapterNetwork.Devnet:
      default:
        return '?cluster=devnet';
    }
  };

  // 2. Base URL
  const baseUrl = 'https://explorer.solana.com';
  const clusterParam = getClusterParam();

  // 3. Handle viewType 'inspector' (buat liat raw data)
  if (viewTypeOrItemAddress === 'inspector') {
    return `${baseUrl}/inspector${clusterParam}`;
  }

  // 4. Convert PublicKey ke string
  const address =
    viewTypeOrItemAddress instanceof PublicKey
      ? viewTypeOrItemAddress.toString()
      : viewTypeOrItemAddress;

  // 5. Build URL berdasarkan itemType
  switch (itemType) {
    case 'address':
      return `${baseUrl}/address/${address}${clusterParam}`;
    case 'tx':
      return `${baseUrl}/tx/${address}${clusterParam}`;
    case 'token':
      return `${baseUrl}/token/${address}${clusterParam}`;
    case 'block':
      return `${baseUrl}/block/${address}${clusterParam}`;
    default:
      return `${baseUrl}/address/${address}${clusterParam}`;
  }
}

/**
 * Shortcut: Lihat transaksi di explorer
 */
export function getTxExplorerUrl(
  network: WalletAdapterNetwork | string,
  txid: string
): string {
  return getExplorerUrl(network, txid, 'tx');
}

/**
 * Shortcut: Lihat address di explorer
 */
export function getAddressExplorerUrl(
  network: WalletAdapterNetwork | string,
  address: PublicKey | string
): string {
  return getExplorerUrl(network, address, 'address');
}

/**
 * Shortcut: Lihat token di explorer
 */
export function getTokenExplorerUrl(
  network: WalletAdapterNetwork | string,
  mintAddress: PublicKey | string
): string {
  return getExplorerUrl(network, mintAddress, 'token');
}

export function getBlockExplorerUrl(
  network: WalletAdapterNetwork | string,
  mintAddress: PublicKey | string
): string {
  return getExplorerUrl(network, mintAddress, 'block');
}