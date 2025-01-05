import styles from './UpdatePocketForm.module.css';
import { FormEvent,type ReactElement } from "react";
import { Portal } from "../../../Atoms";
import { IoWalletOutline } from "react-icons/io5";
import { CreatePocketFormModel } from "./UpdatePocketForm.model";
import useUserStore from "../../../../store/user/userStore";
import { formatCurrency } from "../../../../utils";
import { PocketModel } from "../../../../models/User.model";
import { ToastContainer,toast } from "react-toastify";
import { infoLogs } from "../../../../utils";
import { updatePocket } from '../../../../server/pockets/updatePocket';

export const UpdatePocketForm = ({
  show,
  onClose,
  pocketId
}: CreatePocketFormModel): ReactElement => {
  const user = useUserStore((state) => state.user);
  const currentBalance = user?.balance?.[0]?.totalAmount ?? 0;
  const balanceId = user?.balance?.[0]?.id ?? "";
  const error = () => toast.error(infoLogs[0].message);
  const exception = () => toast.error("Could not create pocket");    
    
  const handleCreatePocket = async (event: FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const pocketData:PocketModel = {
        name: data.get("name") as string,
        sub_amount: Number(data.get("amount") ?? 0) as number,
        id: pocketId,        
    };

    if(pocketData.sub_amount > (currentBalance + pocketData.sub_amount)) {
      error();
      return;
    }

    if((pocketData.sub_amount < currentBalance + pocketData.sub_amount) && pocketData.name){
        const response = await updatePocket(pocketData,balanceId) ?? null;
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
        <p className={styles.current_balance}>Current balance: <span>{formatCurrency(currentBalance)}$</span></p>        
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
                min={0}
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
          <button type={'submit'} className={styles.create}>Update pocket</button>
        </div>
      </form>
    </Portal>
  );
};
