import { ReactElement } from "react";
import styles from "./PocketCard.module.css";
import type { PocketCardModel } from "./PocketCard.model";
import { LuPlus, LuPocket } from "react-icons/lu";

export const NewPocket = ({
  title,createManager 
}: PocketCardModel): ReactElement => {
  return (
    <div className={styles.pocketCard}>
      <div className={styles.header} >        
        <LuPocket size={80} color="#D1DBE8" />
      </div>
      <div className={styles.content}>
        <div className={styles.content_text}>
        <p className={styles.title}>{title}</p>        
        </div>
        <button className={styles.managePocket} onClick={createManager} >
          <LuPlus size={25} color="black"/>
        </button>
      </div>
    </div>
  );
};
