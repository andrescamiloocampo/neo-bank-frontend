import { type ReactElement } from "react";
import styles from './Loader.module.css';
import { Portal } from "../../Atoms/Portal/Portal";

export const Loader = ():ReactElement =>{
    return(
        <Portal show>
            <div className={styles.loader}/>        
        </Portal>
    );
}