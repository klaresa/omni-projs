import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import { api } from "../services/api";

// props de uma transação para ser exibida no table, já criada
interface TransactionsProps {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

// props dos dados p/ criacao. Aqui é uma sintaxe do TS em que o tipo 'herda' tal tipo exceto.. as exceções
type TransactionInput = Pick<TransactionsProps, 'title' | 'amount' | 'type' | 'category'>;

interface TransactionsContextData {
  transactions: TransactionsProps[];
  createTransaction: (transactionInput: TransactionInput) =>  Promise<void>; //pq toda funcao async retorna uma Promise
}

interface TransactionsProviderProps {
  children: ReactNode; // aceita conteúdos válido pro react (tag, texto, jsx)
}

/**
 * crio o contexto atraves do metodo createContext e para consumi-lo eu poderia deixar envolto do app.
 * Aqui eu dou um valor inicial e aponto que é do tipo transactioProps
 * Poderia consumir atraves do TransactionsContext.Provider
 */
// aqui eu estou forçando o tipo do valor inicial mesmo mas tá ok pq esse valor inicial nunca será utilizado
const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);
// observa que pós useTransaction ela esta var n precisa ser explortada

/*
*  Aqui eu crio um componente para substituir o TransactionContext.Provider lá no App.tsx
*
*/
export function TransactionsProvider ({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([]);

  useEffect(() => {
    api.get('/transactions')
        .then(response => setTransactions(response.data.transactions));
  }, []);


  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {...transactionInput, createdAt: new Date()});

    const { transaction } = response.data;

    setTransactions([...transactions, transaction]);
  }

  return (
      /* passa o children para dentro do componente */
      <TransactionsContext.Provider value={{ transactions, createTransaction }}>
        {children}
      </TransactionsContext.Provider>
  )
}

/* CUSTOM hook
* Essa função tem o propósito de deixar o código mais enxuto sem que haja a necessidade de criar
* um useContext e um TransactionsContext no mesmo arquivo.
* Agora uma função exporta o contexto atraves de useTransactions()
*/
export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
