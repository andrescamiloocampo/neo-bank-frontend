import { FormEvent, type ReactElement } from "react";
import styles from "./CreatePocketForm.module.css";
import { Portal } from "../../../Atoms";
import { IoWalletOutline } from "react-icons/io5";
import { CreatePocketFormModel } from "./CreatePocketForm.model";
import { formatCurrency } from "../../../../utils";
import { PocketModel } from "../../../../models/User.model";
import { ToastContainer,toast } from "react-toastify";
import { infoLogs } from "../../../../utils";
import { createPocket } from "../../../../server";
import useBalanceStore from "../../../../store/balance/currentBalance.store";

export const CreatePocketForm = ({
  show,
  onClose,
}: CreatePocketFormModel): ReactElement => {  
  const currentBalance = useBalanceStore((state)=>state.currentBalance) ?? {totalAmount:0,id: ''};  
  const error = () => toast.error(infoLogs[0].message);
  const exception = () => toast.error("Could not create pocket");

  const handleCreatePocket = async (event: FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const pocketData:PocketModel = {
        name: data.get("name") as string,
        sub_amount: Number(data.get("amount") ?? 0) as number,
        id: "",        
    };

    if(pocketData.sub_amount > currentBalance?.totalAmount) {
      error();
      return;
    }

    if(pocketData.sub_amount < currentBalance?.totalAmount && pocketData.name){
        const response = await createPocket(pocketData,currentBalance.id) ?? null;
        if(!response) {
          exception();
          return;
        }
        console.log(response);
        onClose();
    }

  };

  return (
    <Portal show={show}>
      <form className={styles.modal} onSubmit={handleCreatePocket}>
        <ToastContainer />
        <p className={styles.current_balance}>Current balance: <span>${formatCurrency(currentBalance?.totalAmount)}</span></p>        
        <div className={styles.modal_header}>
          <div className={styles.icon_container}>
            <IoWalletOutline size={24} color="#2563eb" />
          </div>
          <h3 className={styles.title}>Create New Pocket</h3>
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
                min={1}
                step={"1"}
                className={styles.modal_input}
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        <div className={styles.buttons_container}>
          <button className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
          <button type={'submit'} className={styles.create}>Create pocket</button>
        </div>
      </form>
    </Portal>
  );
};
