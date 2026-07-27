import { create } from 'zustand';
import { produce } from 'immer';
import { ReactNode } from 'react'; // 🔥 IMPORT DARI REACT

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  description?: string | ReactNode; // ✅ PAKE ReactNode
  txid?: string;
  duration?: number;
}

interface NotificationStore {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => string;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],

  addNotification: (notification) => {
    const id = crypto.randomUUID();

    set(
      produce((state) => {
        state.notifications.push({
          ...notification,
          id,
        });
      })
    );

    if (notification.duration !== 0) {
      setTimeout(() => {
        set(
          produce((state) => {
            state.notifications = state.notifications.filter(
              (n: Notification) => n.id !== id
            );
          })
        );
      }, notification.duration || 5000);
    }

    return id;
  },

  removeNotification: (id) =>
    set(
      produce((state) => {
        state.notifications = state.notifications.filter(
          (n: Notification) => n.id !== id
        );
      })
    ),

  clearNotifications: () =>
    set(
      produce((state) => {
        state.notifications = [];
      })
    ),
}));

export default useNotificationStore;