import React, { useReducer, useState } from 'react';
import CalculationContext from './calculationContext';
import CalculationReducer from './CalculationReducer';

const initialState = {
  transactions: [],
};

const CalculationState = ({ children }) => {
  const [state, dispatch] = useReducer(CalculationReducer, initialState);

  const addTransaction = (transaction) => {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction,
    });
  };

  const deleteTransaction = (id) => {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id,
    });
  };

  const updateTransacation = (newTransaction, index) => {
    dispatch({
      type: 'UPDATE_TRANSACTION_LABEL',
      // payload: { newTransaction, index },
      payload: newTransaction,
    });
  };

  return (
    <CalculationContext.Provider
      value={{
        transactions: state.transactions,
        addTransaction,
        deleteTransaction,
        updateTransacation,
      }}
    >
      {children}
    </CalculationContext.Provider>
  );
};

export default CalculationState;
