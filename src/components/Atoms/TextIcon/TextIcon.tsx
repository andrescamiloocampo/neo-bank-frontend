import { type ReactElement } from "react";
import type { TextIconModel } from "./TextIcon.model";
import { NavLink } from "react-router";
import styles from "./TextIcon.module.css";

export const TextIcon = ({ text, href, Icon,path }: TextIconModel): ReactElement => {
  return (
    <NavLink to={href} className={`${styles.textIconContainer} ${href === path ? styles.active : ''}`}>
      {Icon && <Icon size={"20"} />}
      <p className={styles.content}>{text}</p>
    </NavLink>
  );
};
