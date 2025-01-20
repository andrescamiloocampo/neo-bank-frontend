import styles from "./BalanceSelector.module.css";
import { type ReactElement } from "react";
import type { BalanceSelectorModel } from "./BalanceSelector.model";
import { formatCurrency } from "../../../utils";
import { LuPocket } from "react-icons/lu";
import { GoCreditCard } from "react-icons/go";
import { useTransactionStore } from "../../../store/transaction/transaction.store";

export const BalanceSelector = ({
  balance,
}: BalanceSelectorModel): ReactElement => {
  const pockets = balance?.pockets ?? [];
  const fromAccount = useTransactionStore((state) => state.fromAccount);
  const setFromAccount = useTransactionStore((state) => state.setFromAccount);

  return (
    <div className={styles.balance_selector}>      
      <div
        className={`${styles.amount_source} ${
          balance?.id === fromAccount.accountId ? styles.selected_balance : ""
        }`}
        onClick={() => {
          setFromAccount({
            accountId: balance?.id,
            accountType: balance?.accountType,
            amount: balance?.totalAmount,
          });
        }}
      >
        <div className={styles.amount_title_container}>
          <GoCreditCard />
          <p className={styles.amount_title}>{balance?.accountType}</p>
        </div>
        <p className={styles.balance_id}>{balance?.id}</p>
        <p className={styles.amount_total}>
          $ {formatCurrency(balance?.totalAmount ?? 0)}
        </p>
      </div>

      {pockets.filter(p => p.sub_amount > 0).map((pocket) => (
        <div
          key={pocket.id}
          className={`${styles.amount_source} ${
            pocket?.id === fromAccount.accountId ? styles.selected_balance : ""
          }`}
          onClick={() => {
            setFromAccount({
              accountId: pocket?.id,
              accountType: 'Pocket',
              amount: pocket.sub_amount,
            });
          }}
        >
          <div className={styles.amount_title_container}>
            <LuPocket />
            <p className={styles.amount_title}>{pocket.name}</p>
          </div>
          <p className={styles.balance_id}>{pocket?.id}</p>
          <p className={styles.amount_total}>
            $ {formatCurrency(pocket.sub_amount ?? 0)}
          </p>
        </div>
      ))}
    </div>
  );
};
