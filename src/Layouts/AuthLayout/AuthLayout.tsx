import { type ReactElement } from "react";
import { Outlet } from "react-router";
import styles from "./AuthLayout.module.css";
import { getSession } from "../../utils/session";
import { Navigate } from "react-router";

export default function AuthLayout(): ReactElement {
  const session = getSession();

  if (session.user.token) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className={styles.main_container}>            
      <Outlet />
    </div>
  );
}
