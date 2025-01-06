import styles from './UpdatePocketForm.module.css';
import { FormEvent, useEffect, useState, type ReactElement } from "react";
import { Portal } from "../../../Atoms";
import { IoWalletOutline } from "react-icons/io5";
import { CreatePocketFormModel } from "./UpdatePocketForm.model";
import { formatCurrency } from "../../../../utils";
import { PocketModel } from "../../../../models/User.model";
import { ToastContainer, toast } from "react-toastify";
import { infoLogs } from "../../../../utils";
import { updatePocket } from '../../../../server/pockets/updatePocket';
import { getPocketById } from '../../../../server/pockets/getPocketById';
import useBalanceStore from '../../../../store/balance/currentBalance.store';

export const UpdatePocketForm = ({
  show,
  onClose,
  pocketId
}: CreatePocketFormModel): ReactElement => {  
  const currentBalance = useBalanceStore((state)=>state.currentBalance) ?? {totalAmount:0,id: ''};      
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const error = () => toast.error(infoLogs[0].message);
  const exception = () => toast.error("Could not create pocket");

  useEffect(() => {
    const getPocket = async () => {
      const response = await getPocketById(pocketId);      
      setName(response?.name ?? '');
      setAmount(response?.sub_amount ?? 0);
    }
    if (show) {
      getPocket();
    }
  }, [show, pocketId]);

  const handleUpdatePocket = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const pocketData: PocketModel = {
      name,
      sub_amount: amount,
      id: pocketId,
    };

    if (amount > currentBalance.totalAmount) {
      error();
      return;
    }

    if (amount < currentBalance.totalAmount && pocketData.name != '') {
      const response = await updatePocket(pocketData, currentBalance.id) ?? null;
      if (!response) {
        exception();
        return;
      }
      onClose();
    }
  };

  return (
    <Portal show={show}>
      <form className={styles.modal} onSubmit={handleUpdatePocket}>        
        <ToastContainer />
        <p className={styles.current_balance}>Current balance: <span>{formatCurrency(currentBalance.totalAmount)}$</span></p>
        <div className={styles.modal_header}>
          <div className={styles.icon_container}>
            <IoWalletOutline size={24} color="#2563eb" />
          </div>
          <h3 className={styles.title}>Update Pocket</h3>
        </div>

        <div className={styles.content}>
          <div className={styles.input_container}>
            <label className={styles.input_label} htmlFor="name">
              Pocket Name
            </label>
            <input
              required
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.modal_input}
              placeholder="e.g., Savings, Travel, Emergency Fund"
            />
          </div>

          <div className={styles.input_container}>
            <label className={styles.input_label} htmlFor="amount">
              Initial Balance
            </label>
            <div className={styles.input_icon}>
              <span className={styles.money}>$</span>
              <input
                required
                type="number"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min={0}
                step={"1"}
                className={styles.modal_input}
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        <div className={styles.buttons_container}>
          <button type="button" className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={styles.create}>Update pocket</button>
        </div>
      </form>
    </Portal>
  );
};
