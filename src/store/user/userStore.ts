import { create } from "zustand";
import { UserModel } from "../../models";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStore {
  user: UserModel | null;
  setUser: (user: UserModel) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>()(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        clearUser: () => set({ user: null }),
      }),
      {
        name: "user-store", 
        storage: createJSONStorage(() => localStorage), 
      }
    )
  );

export default useUserStore;
