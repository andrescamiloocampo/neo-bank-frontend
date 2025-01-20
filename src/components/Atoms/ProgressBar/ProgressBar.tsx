import { type ReactElement } from "react";
import styles from "./ProgressBar.module.css";
import type { ProgressBarModel } from "../../Molecules/DynamicKey/DynamicKey.model";

export const ProgressBar = ({
  value,
  totalLenght,
}: ProgressBarModel): ReactElement => {
  const widthPercentage = (value / totalLenght) * 100;

  return (
    <div className={styles.progress_container}>
        <div
          className={styles.progress_bar}
          style={{ width: `${widthPercentage}%` }}
        />
    </div>
  );
};
