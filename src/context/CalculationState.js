import React, { useReducer } from 'react';
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

  return (
    <CalculationContext.Provider
      value={{ transactions: state.transactions, addTransaction }}
    >
      {children}
    </CalculationContext.Provider>
  );
};

export default CalculationState;
