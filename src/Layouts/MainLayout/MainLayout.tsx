import styles from "./MainLayout.module.css";
import { ReactElement, useEffect, useState } from "react";
import { Header } from "../../components/Organisms";
import { Outlet, Navigate } from "react-router";
import { getSession } from "../../utils/session";
import { stompClient } from "../../server/websockets/stompClient";
import { connectToNotification } from "../../server/websockets/notificationWS";
import { NotificationModel } from "../../models";

export default function MainLayout(): ReactElement {
  const session = getSession();
  const [lastNotification,setLastNotification] = useState<NotificationModel | null>(null);

  useEffect(() => {
    connectToNotification((notification)=>{
      setLastNotification(notification);
      console.log(lastNotification);
    });

    return () => {
      stompClient.deactivate();
    };
  }, []);

  if (!session.user.token) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className={styles.mainContainer}>      
      <Header />
      <div className={styles.children}>
        <Outlet />
      </div>
    </div>
  );
}
