import { type ReactElement } from "react";
import styles from "./TransactionCard.module.css";
import type { TransactionCardModel } from "./TransactionCard.model";
import { MdAttachMoney } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";

export const TransactionCard = ({
  account_type,
  amount,
  timestamp,
  title  
}: TransactionCardModel): ReactElement => {
  return (
    <div className={styles.transaction_card}>
      <div className={styles.transaction_card_header}>
        <p className={styles.title}>{title.trim() === '' ? 'No title':title}</p>
        <div className={styles.transaction_card_header_details}>
          <p className={styles.detail}><MdAttachMoney /> {account_type}</p>
          <p className={styles.separation_dot}>•</p>
          <p className={styles.detail}><CiCalendar/>{timestamp.toDateString()}</p>
        </div>
      </div>

      <p className={styles.amount}>${amount}</p>      
    </div>
  );
};
