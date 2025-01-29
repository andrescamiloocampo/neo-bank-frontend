import { useEffect, useRef, type ReactElement } from "react";
import styles from "./UserMenu.module.css";
import type { UserMenuModel } from "./UserMenu.model";
import useUserStore from "../../../store/user/userStore";
import { ImagePlacement } from "../../Atoms/ImagePlacement/ImagePlacement";
import { NavLink } from "react-router";
import { IoNotifications, IoSettingsSharp } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Logout } from "../../../utils";

export const UserMenu = ({ setOpen }: UserMenuModel): ReactElement | null => {
  const user = useUserStore((state) => state.user);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.user_popup} onClick={handleClick} ref={menuRef}>

      <div className={styles.user_info}>
        <ImagePlacement image={user?.userImage} size="40" />
        <p className={styles.username}>{user?.name}</p>
      </div>

      <div className={styles.buttons}>
        <div className={styles.functionality}>          
          <NavLink to={'settings'} className={styles.option}><IoSettingsSharp/> Settings</NavLink>
          <div className={styles.option}><IoNotifications/> Notifications</div>
          <button className={styles.logout_button} onClick={Logout}><RiLogoutBoxLine/>Log out</button>
        </div>
      </div>
    </div>
  );
};
