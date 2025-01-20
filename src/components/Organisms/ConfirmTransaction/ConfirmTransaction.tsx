import { ReactElement } from "react";
import styles from './ConfirmTransaction.module.css';
import { useTransactionStore } from "../../../store/transaction/transaction.store";
import useBalanceStore from "../../../store/balance/currentBalance.store";
import { formatCurrency } from "../../../utils";

export const ConfirmTransaction = ():ReactElement => {
    const fromAccount = useTransactionStore(state => state.fromAccount);
    const toAccount = useTransactionStore(state => state.toAccount);
    const currentBalance = useBalanceStore(state => state.currentBalance);    
    const currentDate = new Date();
    return(        
        <div className={styles.confirm_transaction}>            
        {currentDate.toDateString()}
        <h3 className={styles.title}>Transaction details</h3>
        <div className={styles.separator}/>
            <p className={styles.transaction_label}>
                <span>Main Account </span>{currentBalance?.accountType}
            </p>
            <p className={styles.transaction_label}>
                <span>From </span>{fromAccount.accountType}
            </p>                        
            <p className={styles.transaction_label}>
                <span>Amount to send </span>${formatCurrency(toAccount.amount ?? 0)}
            </p>
            <p className={styles.transaction_label}>
                <span>Receiver </span>{toAccount.username}
            </p>                        
        </div>
    );
}