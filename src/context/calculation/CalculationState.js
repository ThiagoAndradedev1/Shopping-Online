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

  return (
    <CalculationContext.Provider
      value={{
        transactions: state.transactions,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </CalculationContext.Provider>
  );
};

export default CalculationState;
