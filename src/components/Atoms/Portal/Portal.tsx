import type { PortalModel } from "./Portal.model"
import styles from "./Portal.module.css"
import { type ReactElement } from "react"

export const Portal = ({ children,show }: PortalModel): ReactElement | false => {
    return(
        show && (
            <div className={styles.portal}>
                {children}
            </div>
        )    
    );
}