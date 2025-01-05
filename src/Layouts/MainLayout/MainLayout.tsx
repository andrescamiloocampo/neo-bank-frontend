import styles from './MainLayout.module.css';
import { ReactElement } from 'react';
import { Header } from '../../components/Organisms';
import { Outlet, Navigate } from 'react-router';
import {getSession} from '../../utils/session';

export default function MainLayout(): ReactElement {
  const session = getSession();

  if (!session.user.token) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className={styles.mainContainer}>
      <Header/>
      <div className={styles.children}>
        <Outlet/>
      </div>
    </div>
  );
}