import { type ReactElement } from "react";
import styles from './TransactionPage.module.css';
import { BalanceWrapper } from "../../components/Molecules/BalanceWrapper/BalanceWrapper";
import useBalanceStore from "../../store/balance/currentBalance.store";
import useUserStore from "../../store/user/userStore";
import { NavLink } from "react-router";

export default function TransactionPage():ReactElement{    

    const balance = useBalanceStore((state)=>state.balance);   
    const user = useUserStore((state)=>state.user);

    return(
        <div className={styles.transaction_page}>
            <div className={styles.banner}>
                <img src="/banner.jpg" alt="" className={styles.banner_image}/>
            </div>
            <div className={styles.heading_content}>
            <h1 className={styles.title}>
                Welcome back, {user?.name}
            </h1>
            <p className={styles.welcome}>Here's what's happening with your money today.</p>
            </div>

            <div className={styles.send_money}>            
            <NavLink to={'/dashboard/transfer'} className={styles.send_button}>
            Send money
            </NavLink>
            </div>

            <div className={styles.accounts}>
                <h3 className={styles.accounts_title}>Your accounts</h3>
                <div className={styles.accounts_container}>
                {
                    balance.map((b)=>(
                        <BalanceWrapper balance={b} key={b.id}/>                                                  
                    ))
                }
                </div>                
            </div>            
        </div>
    )
}