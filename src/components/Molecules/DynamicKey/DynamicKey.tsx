import { useEffect, useState, type ReactElement } from "react";
import styles from "./DynamicKey.module.css";
import { IoCopyOutline } from "react-icons/io5";
import { errorLogs } from "../../../utils/errors";
import useBalanceStore from "../../../store/balance/currentBalance.store";

export const DynamicKey = (): ReactElement => {
  const [dynamicKey, setDynamicKey] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const balance = useBalanceStore((state) => state.balance);
  const currentBalance = useBalanceStore((state) => state.currentBalance);
  const setCurrentBalance = useBalanceStore((state) => state.setCurrentBalance);

  const copyKey = async (): Promise<void> => {
    const text = dynamicKey;
    try {
      await navigator.clipboard.writeText(text);
      console.log("Contenido copiado al portapapeles");
    } catch (error) {
      console.log(errorLogs[1].message, ":", error);
    }
  };

  const changeAccount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentBalance(balance[Number(event.target.value)]);
    localStorage.setItem('balance-index',event.target.value ?? '0');
  };

  useEffect(() => {
    const generateKey = () => {
      const newKey = Math.random().toString(36).substring(2, 8).toUpperCase();
      setDynamicKey(newKey);
      setTimeLeft(30);
    };
    generateKey();
    const interval = setInterval(generateKey, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (balance.length > 0 && !currentBalance) setCurrentBalance(balance[0]);
  }, [balance]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  return (
    <div className={styles.container}>
      <div className={styles.primaryContent}>
        <div className={styles.cardPlaceholder}>
          <img
            src="/card.png"
            alt="credit-card"
            width={"100%"}
            height={"100%"}
          />
        </div>
        <div>
          <p className={styles.title}>{currentBalance?.accountType ?? 'No Account'}</p>
          <div className={styles.keyContainer}>
            <p className={styles.key}>{dynamicKey}</p>
            <IoCopyOutline
              size={15}
              className={styles.copy}
              color="#4F7396"
              onClick={copyKey}
            />
          </div>
          <p className={styles.time}>Expires in {timeLeft} seconds</p>
        </div>
      </div>
    
      <div className={styles.select_container}>
        <select
          className={styles.select_balance}
          name="balance"
          id="balance"
          onChange={changeAccount}
          defaultValue={0}          
        >
          {balance.map((b, index) => (
            <option value={index} key={b.id}>
              {b.accountType}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.timeOutBarContainer}>
        <div
          className={styles.timeOutBar}
          style={{ width: `${(timeLeft / 30) * 100}%` }}
        />
      </div>

    </div>
  );
};
