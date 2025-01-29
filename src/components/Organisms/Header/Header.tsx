import { ReactElement, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";

import styles from "./Header.module.css";
import { navigationItems } from "../../../datasources/navigation";
import useUserStore from "../../../store/user/userStore";

import { TextIcon } from "../../Atoms/TextIcon/TextIcon";
import { ImagePlacement } from "../../Atoms/ImagePlacement/ImagePlacement";
import { UserMenu } from "../UserMenu/UserMenu";

export const Header = (): ReactElement => {
  const location = useLocation();
  const path = location.pathname;
  const user = useUserStore((state) => state.user);
  const [open, setOpen] = useState(false);  

  return (
    <div className={styles.headerContainer}>
      <NavLink to="/dashboard" className={styles.title}>
        Neo-Bank
      </NavLink>
      <div className={styles.items}>
        {navigationItems.map((item) => (
          <TextIcon
            key={item.href}
            text={item.text}
            href={item.href}
            path={path}
          />
        ))}        
        <div onClick={() => setOpen(!open)} className={styles.user_profile}>
          <ImagePlacement image={user?.userImage} size="40" />
        </div>
      </div>
      {open && <UserMenu setOpen={setOpen} />}
    </div>
  );
};
