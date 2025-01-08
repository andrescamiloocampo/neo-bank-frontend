import { useState, type ReactElement } from "react";
import styles from './BalanceWrapper.module.css';
import type { BalanceWrapperModel } from "./BalanceWrapper.model";
import { formatCurrency } from "../../../utils";
import { PiPiggyBank } from "react-icons/pi";
import { LuPocket } from "react-icons/lu";

export const BalanceWrapper = ({balance}:BalanceWrapperModel):ReactElement => {
    const [toggle,setToggle] = useState(false);
    const {pockets=[]} = balance;
    return (
        <div className={styles.main_container}>
        <div className={styles.balance_wrapper} onClick={()=>{setToggle(!toggle)}}>
            <div className={styles.balance_description}>
                <div className={styles.icon_container}>
                <PiPiggyBank size={25}/>
                </div>
                <div className={styles.description_text}>
                <p className={styles.name}>{balance.accountType}</p>
                <p className={styles.amount}>${formatCurrency(balance.totalAmount)}</p>
                </div>
            </div>

            <p className={styles.balance_amount}>${formatCurrency(balance.totalAmount)}</p>            
        </div>
                
        <div className={`${toggle?styles.show_pockets:styles.pockets_list}`}>
            <h3 className={styles.pockets_title}>Pockets</h3>
            {pockets.map((pocket)=>(
                <div className={styles.pocket}>
                <div className={styles.pocket_icon}>
                    <LuPocket size={40}/>
                </div>
                <div className={styles.pocket_slot}>
                    <p className={styles.pocket_stat}>
                        <span>Name: </span>{pocket.name}
                    </p>
                    <p className={styles.pocket_stat}>
                        <span>Amount: </span>${formatCurrency(pocket.sub_amount)}
                    </p>
                    <p className={styles.pocket_stat}>
                        <span>Id: </span>{pocket.id}
                    </p>
                </div>

                </div>
            ))}            
        </div>                

        </div>
    );
}