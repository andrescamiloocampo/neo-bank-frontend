import { type ReactElement } from "react";
import styles from './NotFoundPage.module.css';
import { SlGhost } from "react-icons/sl";
import { NavLink } from "react-router";

export default function NotFoundPage():ReactElement{
    return (
        <div className={styles.notFoundContainer}>
            <SlGhost size={100} color="#6366f1" className={styles.ghost}/>
            <h1 className={styles.title}>404</h1>
            <h2 className={styles.subtitle}>Page not found!</h2>
            <p className={styles.body}>Sorry, the page you are looking for does not exist.</p>
            <NavLink to="/" className={styles.link}>Go back to home</NavLink>
        </div>
    );
}