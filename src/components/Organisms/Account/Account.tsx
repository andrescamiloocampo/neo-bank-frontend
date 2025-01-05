import { type ReactElement } from "react"
import styles from './Account.module.css';
import type { AccountModel } from "./Account.model";
import { formatCurrency } from "../../../utils";

export const Account = ({balance=0}:AccountModel): ReactElement => {    

    return (
        <div className={styles.accountContainer}>            
            <div className={styles.accountContent}>
                <div className={styles.text}>
                    <p className={styles.title}>Total balance</p>
                    <p className={styles.balance}>${formatCurrency(balance)}</p>
                </div>
                <button className={styles.details}>View details</button>
            </div>            
            <div className={styles.imageContainer}>
                <img src="/chart.jpeg" className={styles.roundedImage} width={'100%'} height={'100%'}/>
            </div>
            
        </div>
    );
}