export default (state, action) => {
  switch (action.type) {
    case 'DELETE_TRANSACTION':
      // const ordersArray = state.transactions.splice(
      //   action.payload.index,
      //   0,
      //   action.payload.newTransaction
      // );

      return {
        // transactions: ordersArray,
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };

    case 'UPDATE_TRANSACTION_LABEL':
      const testeArray = [...state.transactions];
      testeArray.splice(action.payload.index, 1, action.payload.newTransaction);
      return {
        transactions: [...testeArray],
      };
    default:
      return state;
  }
};
