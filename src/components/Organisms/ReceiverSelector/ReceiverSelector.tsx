import { useEffect, useState, type ReactElement, ChangeEvent } from "react";
import styles from './ReceiverSelector.module.css';
import { getUsersByUsername } from "../../../server";
import { UserModel } from "../../../models";
import { useTransactionStore } from "../../../store/transaction/transaction.store";
import { clearNumericInput } from "../../../utils/clearNumericInput";

export const ReceiverSelector = (): ReactElement => {

    const [users, setUsers] = useState<UserModel[] | null>([]);    
    const fromAccount = useTransactionStore(state => state.fromAccount);
    const setToAccount = useTransactionStore(state => state.setToAccount);
    const toAccount = useTransactionStore(state => state.toAccount);
    const [debouncedTerm, setDebouncedTerm] = useState<string>(toAccount.username ?? '');    

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(toAccount.username ?? '');
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [toAccount.username]);

    useEffect(() => {
        const getUsers = async () => {
            const response = await getUsersByUsername(debouncedTerm);
            setUsers(response);
        }
        if (debouncedTerm) {
            getUsers();
        }
    }, [debouncedTerm]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setToAccount({...toAccount,username: e.target.value});
    };

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(0, Number(e.target.value));
        setToAccount({
            ...toAccount,
            amount: value,
        });
    };

    return (
        <div className={styles.receiver_container}>                        
            <div className={styles.input_container}>
            <label htmlFor="username" className={styles.label}>Receiver</label>
            <input 
                className={styles.input} 
                name="username"
                type="text" 
                placeholder="John Doe" 
                onChange={handleInputChange} 
                value={toAccount.username} 
            />
            </div>
            {
                users?.map(user => (
                    <div key={user.id} className={styles.user_card} onClick={()=>setToAccount({
                        ...toAccount,
                        username: user.username
                    })}>
                        <div className={styles.user_avatar}/>                                                    
                        <div className={styles.user_info}>
                        <p className={styles.name}>{user.name}</p>
                        <p className={styles.username}>{user.username}</p>
                        </div>
                    </div>
                ))        
            }
            <div className={styles.input_container}>
            <label htmlFor="amount" className={styles.label}>Amount</label>
            <input 
                className={styles.input} 
                name="amount"
                type="number" 
                min={0}
                placeholder={`Less than or equal $${fromAccount.amount}`}                 
                onChange={handleAmountChange}
                onInput={clearNumericInput}
                value={toAccount.amount}                
            />
            </div>

            <div className={styles.input_container}>
            <label htmlFor="description" className={styles.label}>Description</label>
            <textarea                 
                className={styles.text_area} 
                name="description"                
                placeholder='What you gonna do?'  
                maxLength={254}
                onChange={(e)=>{
                    setToAccount({
                        ...toAccount,
                        description: e.target.value
                    })
                }}               
                value={toAccount.description}
            />
            </div>
            <div className={styles.users_list}>            
            </div>
            <div className={styles.currentBalance}>
                <p className={styles.quantity_title}>Quantity Available</p>
                <p className={styles.quantity}>${fromAccount.amount}</p>
            </div>
        </div>
    );
};