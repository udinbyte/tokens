'use client';

import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import useNotificationStore from '@/stores/useNotifications';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { getTxExplorerUrl } from '@/utils/explorer';
import { useNetwork } from '@/app/providers/NetworkProvider';

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const colors = {
  success: 'border-green-500/50 bg-green-500/10 text-green-500',
  error: 'border-red-500/50 bg-red-500/10 text-red-500',
  warning: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-500',
  info: 'border-blue-500/50 bg-blue-500/10 text-blue-500',
};

export default function Notification() {
  const { notifications, removeNotification } = useNotificationStore();
  const { network } = useNetwork();

  // Auto remove setelah duration
  useEffect(() => {
    const timers = notifications.map((notif) => {
      if (notif.duration !== 0) {
        return setTimeout(() => {
          removeNotification(notif.id);
        }, notif.duration || 5000);
      }
      return null;
    });

    return () => {
      timers.forEach((timer) => {
        if (timer) clearTimeout(timer);
      });
    };
  }, [notifications, removeNotification]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
      {notifications.map((notification) => {
        const Icon = icons[notification.type] || Info;

        return (
          <div
            key={notification.id}
            className={cn(
              'border rounded-lg p-4 shadow-lg backdrop-blur-sm animate-in slide-in-from-top-5',
              colors[notification.type] || colors.info
            )}
          >
            <div className="flex items-start gap-3">
              <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{notification.message}</p>
                {notification.description && (
                  <div className="text-sm opacity-80 mt-1">
                    {notification.description}
                  </div>
                )}
                {notification.txid && (
                  <Link
                    href={getTxExplorerUrl(network, notification.txid)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs underline hover:no-underline mt-1 block"
                  >
                    View on Explorer →
                  </Link>
                )}
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="flex-shrink-0 hover:opacity-70 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}