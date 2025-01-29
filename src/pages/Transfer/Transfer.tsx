import { useEffect, useState, type ReactElement } from "react";
import { NavLink, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

import styles from "./Transfer.module.css";
import { ProgressBar } from "../../components/Atoms/ProgressBar/ProgressBar";
import { Loader } from "../../components/Molecules";
import {
  BalanceSelector,
  ReceiverSelector,
  ConfirmTransaction,
} from "../../components/Organisms";

import useBalanceStore from "../../store/balance/currentBalance.store";
import { useTransactionStore } from "../../store/transaction/transaction.store";
import useUserStore from "../../store/user/userStore";

import { BalanceModel } from "../../models/User.model";
import { TransactionModel } from "../../models";
import { transferMoney } from "../../server/balance/transferMoney";
import { FaArrowLeft } from "react-icons/fa";
import { Notify } from "../../server/websockets/notificationWS";
import { stompClient } from "../../server/websockets/stompClient";


export default function Transfer(): ReactElement {
  const steps = 3;
  const stepPhrases = [
    "Choose a pocket",
    "Insert transaction data",
    "Confirm transaction",
  ];
  const navigate = useNavigate();  
  const [currentStep, setCurrentStep] = useState(1);
  const balance = useBalanceStore((state) => state.balance);
  const currentBalance = useBalanceStore((state) => state.currentBalance);
  const setCurrentBalance = useBalanceStore((state) => state.setCurrentBalance);
  const fromAccount = useTransactionStore((state) => state.fromAccount);
  const toAccount = useTransactionStore((state) => state.toAccount);
  const clearFromAccount = useTransactionStore(
    (state) => state.clearFromAccount
  );
  const clearToAccount = useTransactionStore((state) => state.clearToAccount);

  const user = useUserStore((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const amountError = () =>
    toast("The amount cannot be lower than zero o greater than de source", {
      type: "warning",
    });

  const handleBalanceSelect = (balance: BalanceModel) => {
    setCurrentBalance(balance);
    clearFromAccount();
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep((currentStep) => {
        if (fromAccount.accountId) return Math.min(currentStep + 1, steps);
        return currentStep;
      });
    }

    if (currentStep === 2) {
      if (
        (toAccount.amount ?? 0) <= 0 ||
        (toAccount.amount ?? 0) > (fromAccount.amount ?? 0)
      ) {
        amountError();
        return;
      }
      setCurrentStep((currentStep) => {
        if (toAccount.username) return Math.min(currentStep + 1, steps);
        return currentStep;
      });
    }
  };

  const goBack = () => {
    clearFromAccount();
    clearToAccount();
    navigate('/dashboard');
  };

  const confirmTransaction = async () => {
    setLoading(true);
    setSuccessMessage("");
    const transactionData: TransactionModel = {
      id: "",
      transaction_type: "Expediture",
      account_type: fromAccount.accountType ?? "Savings Account",
      amount: toAccount.amount ?? 0,
      description: toAccount.description ?? "",
      fromAccount: currentBalance?.id ?? "",
      fromPocket: fromAccount.accountId ?? "",
      timestamp: new Date(),
      userId: user?.id ?? "",
    };
    try {
      const response = await transferMoney(
        toAccount.username ?? "",
        fromAccount.accountType ?? "",
        transactionData
      );
      setSuccessMessage("Transaction successful!");            
      Notify(stompClient,`${user?.username} sent money`);
      console.log(response);      
    } catch (error) {
      setSuccessMessage("Transaction failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    clearFromAccount();
    clearToAccount();
  },[])
  
  return (
    <div className={styles.transfer_container}>
      <NavLink to={'/dashboard/transactions_panel'} className={styles.regress}>
        <FaArrowLeft/>
        Go back
      </NavLink>
      <ToastContainer />
      <p className={styles.step}>
        Step {currentStep}: <span>{stepPhrases[currentStep - 1]}</span>
      </p>
      <ProgressBar value={currentStep} totalLenght={steps} />
      {currentStep === 1 && (
        <div className={styles.step_1}>
          <p className={styles.source}>From</p>
          <div className={styles.balance_selection}>
            {balance.map((b) => (
              <div
                key={b.id}
                className={`${styles.balance_card} ${
                  currentBalance?.id === b.id ? styles.active_balance : ""
                }`}
                onClick={() => handleBalanceSelect(b)}
              >
                {b.accountType}
              </div>
            ))}
          </div>

          <BalanceSelector balance={currentBalance} />
        </div>
      )}

      {currentStep === 2 && (
        <div className={styles.step_2}>
          <p className={styles.source}>Send to</p>
          <ReceiverSelector />
        </div>
      )}

      {currentStep === 3 && (
        <div className={styles.step_3}>
          <p className={styles.source}>Confirm Transaction</p>
          <ConfirmTransaction />
        </div>
      )}

      <div className={styles.progress_controls}>
        <button
          className={styles.switch_step}
          onClick={() => {
            setCurrentStep((currentStep) => {
              return Math.max(currentStep - 1, 1);
            });
          }}
        >
          Previous
        </button>

        {currentStep < steps && (
          <button
            className={`${styles.switch_step} ${
              fromAccount.accountId === "" ? styles.blocked : ""
            }`}
            onClick={handleNextStep}
          >
            Next
          </button>
        )}

        {currentStep === steps && (
          <button
            className={`${styles.switch_step} ${
              fromAccount.accountId === "" ? styles.blocked : ""
            }`}
            onClick={confirmTransaction}
            disabled={loading}
          >
            Confirm
          </button>
        )}
      </div>

      {loading && <Loader />}
      {successMessage && (
        <div className={styles.confirmation}>
          <p className={styles.success_message}>{successMessage}</p>
          <p className={styles.go_back} onClick={goBack}>return to main menu</p>
        </div>
      )}
    </div>
  );
}
