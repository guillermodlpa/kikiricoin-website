import { createContext, useState, useContext, useEffect } from 'react';
import { getTokenTransactionHistory } from '../../util/web3api';
import { fromWei } from '../../util/conversions';

type FormattedTransaction = {
  hash: string;
  from: string;
  to: string | undefined;
  value: string;
  method: string | undefined;
  formattedDate: string | undefined;
  formattedDateDiff: string | undefined;
};
export const TRANSACTION_DISPLAY_LIMIT = 10;

const typeToLabel: { [key: string]: string } = {
  0: 'Transfer',
};

const getDifference = (date1: Date, date2: Date) => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const TransactionHistoryContext = createContext<Array<FormattedTransaction>>([]);

export const TokenTransactionHistoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, setTransactions] = useState<Array<FormattedTransaction>>([]);

  useEffect(() => {
    (async () => {
      const history = await getTokenTransactionHistory();

      const rawTransactions = history.reverse().slice(0, TRANSACTION_DISPLAY_LIMIT);
      const formattedTransactions = rawTransactions.map((result) => {
        const transactionDate = result.timestamp ? new Date(result.timestamp * 1000) : undefined;
        const dateDiff = transactionDate ? getDifference(transactionDate, new Date()) : undefined;

        return {
          hash: result.hash,
          from: result.from,
          to: result.to,
          method: result.type != null ? typeToLabel[result.type] || `${result.type}` : undefined,
          value: fromWei(result.value.toString()),
          formattedDate: transactionDate?.toLocaleString(),
          formattedDateDiff: (dateDiff && (dateDiff > 0 ? `${dateDiff}d ago` : 'today')) || undefined,
        };
      });

      setTransactions(formattedTransactions);
    })();
  }, []);

  return <TransactionHistoryContext.Provider value={transactions}>{children}</TransactionHistoryContext.Provider>;
};

const useTokenTransactionHistory = () => {
  const transactions = useContext(TransactionHistoryContext);
  return transactions;
};

export default useTokenTransactionHistory;
