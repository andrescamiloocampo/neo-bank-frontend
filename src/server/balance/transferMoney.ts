import type { TransactionModel } from "../../models/Transaction.model";
import type { BalanceModel } from "../../models/User.model";
import { errorLogs } from "../../utils";

export const transferMoney = async (
  receiver: string,
  sender_account_type: string,
  transaction: TransactionModel
): Promise<BalanceModel | null> => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_SPRING_BACKEND
      }/balance/transferMoney?receiver=${receiver}&sender_account_type=${sender_account_type}`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(transaction),
      }
    );
    if (!response.ok) throw new Error(errorLogs[1].message);
    return await response.json();
  } catch (error) {
    throw new Error(`${(errorLogs[0].message, error)}`);
  }
};
