import { create } from "zustand";
import type { NotificationModel } from "../../models";
import { persist, createJSONStorage } from "zustand/middleware";

interface NotificationState {
    notification: NotificationModel | null;
    setNotification: (notification:NotificationModel) => void;
}


const useNotificationStore = create<NotificationState>()(
    persist(
        (set) => ({
            notification: null,
            setNotification: (notification) => set({notification})
        }),
        {
            name: 'notification-store',
            storage: createJSONStorage(()=>localStorage)
        }
    )
)


export default useNotificationStore;