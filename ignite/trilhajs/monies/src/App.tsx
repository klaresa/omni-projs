import React, {useState} from 'react';
import { Header } from "./components/Header";
import { GlobalStyle } from './styles/global';
import { Dashboard } from "./components/Dashboard";
import Modal from "react-modal";
import { NewTransactionModal } from "./components/NewTransactionModal";
import {TransactionsProvider} from "./hooks/useTransactions";

Modal.setAppElement('#root'); // indica a qual elemento a modal percente

export function App() {

    const [isNewTransactionModalOpen, setNewTransactionModalOpen] = useState(false);

    function handleOpenNewTransactionModal() {
        setNewTransactionModalOpen(true);
    }

    function handleCloseNewTransactionModal() {
        setNewTransactionModalOpen(false);
    }

    return (
        // Componente criado para passar o Context.Provider e suas propriedades
        <TransactionsProvider>
            <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
            <Dashboard/>

            <NewTransactionModal
                isOpen={isNewTransactionModalOpen}
                onRequestClose={handleCloseNewTransactionModal}
            />

            <GlobalStyle/>
        </TransactionsProvider>
    );
}
