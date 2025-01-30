import styles from "./MainLayout.module.css";
import { ReactElement, useEffect, useState } from "react";
import { Header } from "../../components/Organisms";
import { Outlet, Navigate } from "react-router";
import { getSession } from "../../utils/session";
import { stompClient } from "../../server/websockets/stompClient";
import { connectToNotifications } from "../../server/websockets/notificationWS";
import { NotificationModel } from "../../models";
import { toast, ToastContainer } from "react-toastify";

export default function MainLayout(): ReactElement {
  const session = getSession();
  const [notifications,setNotifications] = useState<NotificationModel[]>([]);  

  useEffect(()=>{
    connectToNotifications({
      username: session.user.username ?? '',
      onMessageReceived: (notification) =>{
        console.log('Aqui estoy:',notification)
        setNotifications(prev => [...prev,notification]);
        console.log(notifications);
        toast(notification.message);
      }      
    })

    return () => {
      if(stompClient.active)
        stompClient.deactivate();
    }
  },[]);

  
  if (!session.user.token) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className={styles.mainContainer}>                  
      <ToastContainer />
      <Header />
      <div className={styles.children}>
        <Outlet />
      </div>
    </div>
  );
}
