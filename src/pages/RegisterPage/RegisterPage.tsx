import { type ReactElement } from "react";
import styles from './RegisterPage.module.css';
import { RegisterForm } from "../../components/Organisms/RegisterForm/RegisterForm";

export default function RegisterPage(): ReactElement {
    return (
        <div className={styles.main_container}>
            <div className={styles.welcome}>
                <h1 className={styles.title}>Neo-Bank</h1>
                <p className={styles.message}>Create your bank account</p>
            </div>
            <RegisterForm/>
        </div>
    );
}