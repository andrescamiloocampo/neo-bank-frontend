import { ReactElement } from "react";
import styles from "./PocketCard.module.css";
import type { PocketCardModel } from "./PocketCard.model";
import { formatCurrency } from "../../../utils/formatCurrency";
import { CiEdit } from "react-icons/ci";

export const PocketCard = ({
  title,
  amount,
  url,
  id,
  setPocketId,
  setEditPocket
}: PocketCardModel): ReactElement => {

  const manageEdit = () => {        
    setEditPocket(true);
    setPocketId(id);    
  }

  return (
    <div className={styles.pocketCard}>      
      <div className={styles.header} >
        <img src={url ?? "/husky.png"} alt="" width={'100%'} height={'100%'}/>
      </div>
      <p className={styles.pocket_id}>Pocket id: <span>{id}</span></p>
      <div className={styles.content}>
        <div className={styles.content_text}>
        <p className={styles.title}>{title}</p>
        <p className={styles.amount}>${formatCurrency(amount)}</p>
        </div>
        <button className={styles.managePocket} onClick={manageEdit} >
          <CiEdit size={25} color="black"/>
        </button>
      </div>
    </div>
  );
};
