import { ReactElement, useEffect, useState } from "react";
import styles from "./PocketsPage.module.css";
import { PocketCard } from "../../components/Molecules/PocketCard/PocketCard";
import { NewPocket } from "../../components/Molecules/NewPocket/NewPocket";
import { CreatePocketForm } from "../../components/Organisms";
import useUserStore from "../../store/user/userStore";
import { getUser } from "../../server";
import { UpdatePocketForm } from "../../components/Organisms/Modals";

export default function PocketsPage(): ReactElement {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [createPocket, setCreatePocket] = useState(false);
  const [updatePocket, setUpdatePocket] = useState(false);
  const [pocketId, setPocketId] = useState("");
  const pocketsCount = user?.balance?.[0]?.pockets?.length;

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
        <p className={styles.pocketsCount}>
          You have {pocketsCount} active pockets
        </p>
      </div>

      <div className={styles.pockets}>
        {user &&
          user.balance &&
          user.balance[0].pockets?.map((pocket) => (
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
