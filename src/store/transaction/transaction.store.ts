import {create} from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { SelectBalanceModel,ReceiverModel } from '../../components/Organisms/BalanceSelector/BalanceSelector.model'

interface TransactionStore{
    fromAccount: SelectBalanceModel;
    toAccount: ReceiverModel; 
    setFromAccount: (fromAccount: SelectBalanceModel) => void;
    setToAccount: (toAccount: ReceiverModel) => void;
    clearFromAccount: () => void;
    clearToAccount: () => void;
}

export const useTransactionStore = create<TransactionStore>()(
    persist(
        (set)=>({
            fromAccount: {accountId:'',accountType:'Savings Account',amount:0},
            setFromAccount: (fromAccount) => set({fromAccount}),
            toAccount: {username: '',amount: 0,description:''},
            setToAccount: (toAccount) => set({toAccount}),
            clearFromAccount: () => set({ fromAccount: { accountId: '', accountType: 'Savings Account', amount: 0 } }),
            clearToAccount: () => set({ toAccount: { username: '', amount: 0, description: '' } }),
        }),
        {
            name: 'transaction-store',
            storage: createJSONStorage(()=>localStorage),
        }
    )
)