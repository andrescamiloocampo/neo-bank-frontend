import { ReactElement } from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router";
import { navigationItems } from "../../../datasources/navigation";
import { TextIcon } from "../../Atoms/TextIcon/TextIcon";
import { useLocation } from "react-router-dom";
import { MdExitToApp } from "react-icons/md";
import { resetSession } from "../../../utils/session";

export const Header = (): ReactElement => {
  const location = useLocation();
  const path = location.pathname;

  const logout = ():void => {
    resetSession();
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();    
  }
  
  return (
    <div className={styles.headerContainer}>      
      <NavLink to="/dashboard" className={styles.title}>
        Neo-Bank
      </NavLink>      
      <div className={styles.items}>
        {navigationItems.map((item) => (        
            <TextIcon key={item.href} text={item.text} href={item.href} path={path}/>          
        ))}        
      <MdExitToApp size={25} className={styles.exit} onClick={logout}/>        
      </div>
    </div>
  );
};
