import { ReactNode } from 'react';
import Link from 'next/link';
import useNotificationStore from '@/stores/useNotifications';
import { getTxExplorerUrl } from './explorer';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

interface NotifyProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  message: string;
  description?: string | ReactNode;
  txid?: string;
  network?: WalletAdapterNetwork | string;
  duration?: number;
}

export function notify({
  type = 'info',
  message,
  description,
  txid,
  network,
  duration = 5000,
}: NotifyProps) {
  const { addNotification } = useNotificationStore.getState();

  let finalDescription = description;

  if (txid && network) {
    const explorerUrl = getTxExplorerUrl(network, txid);
    
    finalDescription = description ? (
      <>
        {description}
        <div className="mt-1">
          <Link
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:underline"
          >
            View on Explorer →
          </Link>
        </div>
      </>
    ) : (
      <Link
        href={explorerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-400 hover:underline"
      >
        View on Explorer →
      </Link>
    );
  }

  addNotification({
    type,
    message,
    description: finalDescription,
    txid,
    duration,
  });
}

export function notifySuccess(
  message: string,
  description?: string | ReactNode,
  txid?: string,
  network?: WalletAdapterNetwork | string
) {
  notify({ type: 'success', message, description, txid, network });
}

export function notifyError(
  message: string,
  description?: string | ReactNode,
  txid?: string,
  network?: WalletAdapterNetwork | string
) {
  notify({ type: 'error', message, description, txid, network });
}

export function notifyWarning(message: string, description?: string | ReactNode) {
  notify({ type: 'warning', message, description });
}

export function notifyInfo(message: string, description?: string | ReactNode) {
  notify({ type: 'info', message, description });
}