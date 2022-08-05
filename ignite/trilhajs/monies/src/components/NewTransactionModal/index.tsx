import React, { FormEvent, useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import Modal from "react-modal";

import closeImg from '../../assets/exit.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/withdraws.svg';

import {Container, RadioBox, TransactionTypeContainer} from "./styles";

interface NewTransactionModalProps {
    isOpen: boolean,
    onRequestClose: () => void,
}

export function NewTransactionModal ({ isOpen, onRequestClose} : NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');

  // é só passar o event e tipar com FormEvent
  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      type,
      category
    });

    // reseta os valores antes de fechar a modal
    setTitle('');
    setCategory('');
    setType('deposit');
    setAmount(0);

    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >

    <button type="button" onClick={onRequestClose} className="react-modal-close">
      <img src={closeImg} alt="Fechar modal"/>
    </button>

    <Container onSubmit={handleCreateNewTransaction}> {/* no TS n precisa passar o event como argumento*/ }
      <h2>Cadastrar transação</h2>

      <input
        placeholder="Título"
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
      <input
        type="number"
        placeholder="Valor"
        value={amount}
        onChange={event => setAmount(+event.target.value)} // transforma uma string em numerico em JS
      />

      <TransactionTypeContainer>
        <RadioBox
            isActive={type === 'deposit'}
            activeColor={'green'}
            onClick={() => setType('deposit')}
            type="button">
            <img src={incomeImg} alt="Entrada"/>
            <span>Entrada</span>
        </RadioBox>
        <RadioBox
            isActive={type === 'withdraw'}
            activeColor={'red'}
            onClick={() => setType('withdraw')}
            type="button">
            <img src={outcomeImg} alt="Saída"/>
            <span>Saída</span>
        </RadioBox>
      </TransactionTypeContainer>

      <input
        placeholder="Categoria"
        value={category}
        onChange={event => setCategory(event.target.value)}
      />

      <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
