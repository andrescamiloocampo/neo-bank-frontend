import { useEffect, type ReactElement } from "react";
import styles from './HomePage.module.css';
import { Account } from "../../components/Organisms/Account/Account";
import { ShortCuts } from "../../components/Organisms/ShortCuts/ShortCuts";
import { DynamicKey } from "../../components/Molecules/DynamicKey/DynamicKey";
import { getUser } from "../../server/users/getUser";
import { getSession } from "../../utils";
import useUserStore from "../../store/user/userStore";
import useBalanceStore from "../../store/balance/currentBalance.store";

export default function HomePage (): ReactElement{

  const session = getSession();
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state)=>state.user);
  const setBalance = useBalanceStore((state)=>state.setBalance)
  const currentBalance = useBalanceStore((state)=>state.currentBalance);

  useEffect(()=>{
    const getUserData = async() => {
      const response = await getUser(session.user.username ?? '');      
      setUser(response);
      setBalance(response.balance ?? [])
    };
    getUserData();
  },[])

  return (
    <div className={styles.homePageContainer}>          
      <h1 className={styles.title}>Good morning, {session.user.username}</h1>
      <div className={styles.services}>
        <p className={styles.account_title}>Account summary</p>                
        {user && user.balance && <Account balance={currentBalance?.totalAmount}/>}        
      </div>      
      <div className={styles.shortcuts}>
        <p className={styles.access}>Quick access</p>
        <ShortCuts/>
      </div>
      <div className={styles.dynamicKey}>
        <p className={styles.key}>Dynamic key</p>
        <DynamicKey/>
      </div>      
    </div>
  );
};