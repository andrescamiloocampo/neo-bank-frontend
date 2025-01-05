import { type ReactElement } from "react"
import styles from './ShortCuts.module.css';
import { ClickableTab } from "../../Atoms/ClickableTab/ClickableTab";
import { shortCuts } from "../../../datasources/navigation";

export const ShortCuts = (): ReactElement => {

    return (
        <div className={styles.accountContainer}>                            
            <div className={styles.shortcutsContent}>  
                {shortCuts.map((shortcuts) => (
                    <ClickableTab key={shortcuts.href} Icon={shortcuts.icon} text={shortcuts.text} href={shortcuts.href} body={shortcuts.body}/>
                ))}
            </div>
        </div>
    );
}