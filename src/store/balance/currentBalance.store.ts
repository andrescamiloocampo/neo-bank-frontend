import { createJSONStorage, persist } from 'zustand/middleware';
import { BalanceModel } from './../../models/User.model';
import { create } from 'zustand';

interface BalanceState {
  balance: BalanceModel[];
  currentBalance: BalanceModel | null;
  setBalance: (balance: BalanceModel[]) => void;
  clearBalance: () => void;
  setCurrentBalance: (balance: BalanceModel) => void;
}

const useBalanceStore = create<BalanceState>()(
  persist(
    (set) => ({
      balance: [],
      currentBalance: null,
      setBalance: (balance) => set({ balance }),
      clearBalance: () => set({ balance: [], currentBalance: null }),
      setCurrentBalance: (balance) => set({ currentBalance: balance }),
    }),
    {
      name: 'balance-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useBalanceStore;