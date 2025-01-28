import type { TransactionResponsePagination } from "../../models";
import { errorLogs } from "../../utils";

export const getTransactionsById = async (
  page: number,
  registers: number,
  id: string
): Promise<TransactionResponsePagination> => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_SPRING_BACKEND
      }/transactions/getAll?page=${page}&registers=${registers}&user_id=${id}`,
      {
        method: "GET",
        headers,
      }
    );
    if (!response.ok) throw new Error(errorLogs[1].message);    
    return await response.json();
  } catch (error) {
    throw new Error(`${errorLogs[0].message} - ${error}`);
  }
};
