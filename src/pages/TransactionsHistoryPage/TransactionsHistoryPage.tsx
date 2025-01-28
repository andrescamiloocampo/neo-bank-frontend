import { useEffect, useState, type ReactElement } from "react";
import styles from "./TransactionsHistoryPage.module.css";
import type { TransactionResponsePagination } from "../../models";
import { getTransactionsById } from "../../server/transactions/getTransactionsById";
import useUserStore from "../../store/user/userStore";
import { formatCurrency } from "../../utils";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function TransactionsHistoryPage(): ReactElement {
  const [transactionsCache, setTransactionsCache] = useState<
    Record<number, TransactionResponsePagination>
  >({});
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions, setTransactions] =
    useState<TransactionResponsePagination>({
      paginationStats: { totalRecords: 0, totalPages: 0 },
      transactions: [],
    });
  const batch = 10;
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (transactionsCache[currentPage]) {
        setTransactions(transactionsCache[currentPage]);
      } else {
        const response = await getTransactionsById(
          currentPage,
          batch,
          user?.id ?? ""
        );
        setTransactions(response);
        setTransactionsCache((prevCache) => ({
          ...prevCache,
          [currentPage]: response,
        }));
      }
    };

    fetchTransactions();
  }, [currentPage, transactionsCache]);

  return (
    <div className={styles.transactions_history_page}>
      <div className={styles.title_container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Transactions History</h1>
          <p className={styles.description}>View your last transactions</p>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.transactionsTable}>
          <thead>
            <tr>
              <th>Account Type</th>
              <th>Amount</th>
              <th>Timestamp</th>
              <th>Description</th>
              <th>Transaction Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions.transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.account_type}</td>
                <td>${formatCurrency(transaction.amount)}</td>
                <td>{new Date(transaction.timestamp).toDateString()}</td>
                <td>
                  {transaction.description === "" ||
                  transaction.description == null
                    ? "No description"
                    : transaction.description}
                </td>
                <td>{transaction.transaction_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination_controls}>
        <button
          className={`${styles.pagination_button} ${
            currentPage === 1 ? styles.hidden : ""
          }`}
          onClick={() => {
            setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
          }}
        >
          <FaArrowLeft color="#fff" />
        </button>
        <div className={styles.current_page}>{currentPage}</div>

        <button
          className={`${styles.pagination_button} ${
            currentPage === transactions.paginationStats.totalPages? styles.hidden : ""}`}
          onClick={() => {
            setCurrentPage((prevPage) =>
              Math.min(transactions.paginationStats.totalPages, prevPage + 1)
            );
          }}
        >
          <FaArrowRight color="#fff" />
        </button>
      </div>
    </div>
  );
}
