import { type ReactElement } from "react";
import { LoginForm } from "../../components/Organisms/LoginForm/LoginForm";

import styles from './LoginPage.module.css';

export default function LoginPage():ReactElement{        
    return(
        <div className={styles.main_container}>
            <div className={styles.welcome}>
                <h1 className={styles.title}>Neo-Bank</h1>
                <p className={styles.message}>Login to your bank account</p>
            </div>
            <LoginForm/>
        </div>
    );
}