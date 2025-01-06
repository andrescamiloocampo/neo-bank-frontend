import { ReactElement, useEffect, useState } from "react";
import styles from "./PocketsPage.module.css";
import { PocketCard } from "../../components/Molecules/PocketCard/PocketCard";
import { NewPocket } from "../../components/Molecules/NewPocket/NewPocket";
import { CreatePocketForm } from "../../components/Organisms";
import useUserStore from "../../store/user/userStore";
import { getUser } from "../../server";
import { UpdatePocketForm } from "../../components/Organisms/Modals";
import useBalanceStore from "../../store/balance/currentBalance.store";

export default function PocketsPage(): ReactElement {  
  const setUser = useUserStore((state) => state.setUser);
  const [createPocket, setCreatePocket] = useState(false);
  const [updatePocket, setUpdatePocket] = useState(false);
  const [pocketId, setPocketId] = useState("");
  const currentBalance = useBalanceStore((state)=>state.currentBalance);
  const setCurrentBalance = useBalanceStore((state)=>state.setCurrentBalance);
  const pocketsCount = currentBalance?.pockets?.length;

  const manageCreatePocket = () => {
    setCreatePocket(!createPocket);
  };

  const close = () => {
    setCreatePocket(false);
  };

  const manageUpdatePocket = () => {
    setUpdatePocket(false);
  };

  useEffect(() => {
    const updateUserData = async () => {
      const response =
        (await getUser(sessionStorage.getItem("username") ?? "")) ?? null;
      if (!response) return;
      setUser(response);      
      setCurrentBalance(response.balance[Number(localStorage.getItem('balance-index') ?? 0)])
    };
    updateUserData();    
  }, [createPocket,updatePocket]);

  return (
    <div className={styles.pocketsContainer}>            
      <CreatePocketForm show={createPocket} onClose={close} />
      <UpdatePocketForm
        show={updatePocket}
        onClose={manageUpdatePocket}
        pocketId={pocketId}
      />
      <div className={styles.content}>
        <h1 className={styles.title}>Your pockets</h1>
        {pocketsCount === 1 && (
        <p className={styles.pocketsCount}>
          You have {pocketsCount} active pocket
        </p>
        )}
        {pocketsCount != 1 && (
        <p className={styles.pocketsCount}>
          You have {pocketsCount} active pockets
        </p>
        )}
      </div>

      <div className={styles.pockets}>
        {currentBalance &&          
          currentBalance.pockets?.map((pocket) => (
            <PocketCard
              id={pocket.id}
              key={pocket.id}
              title={pocket.name}
              amount={pocket.sub_amount}
              setPocketId={(id) => setPocketId(id)}
              setEditPocket={(value)=>setUpdatePocket(value)}
            />
          ))}
        <NewPocket title="New Pocket" createManager={manageCreatePocket} />
      </div>
    </div>
  );
}
