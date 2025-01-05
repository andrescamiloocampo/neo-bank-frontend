import styles from './ClickableTab.module.css';
import { type ClickableTabModel } from './ClickableTab.model';
import { type ReactElement } from 'react';
import { NavLink } from 'react-router';

export const ClickableTab = ({ Icon, text, href,body }: ClickableTabModel):ReactElement => {
    return(
        <NavLink to={href} className={styles.clickableTabContainer}>
            {Icon && (
                <Icon size={'24'}/>
            )}
            <div className={styles.container}>
            <p className={styles.content}>
                {text}
            </p>
            <p className={styles.description}>
                {body}
            </p>            
            </div>
        </NavLink>
    );
}