export default (state, action) => {
  switch (action.type) {
    case 'DELETE_TRANSACTION':
      return {
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
      // const cloneTransactions = [...state.transactions];
      // let filtered = cloneTransactions.filter(
      //   (transaction) => transaction.id === action.payload.newTransaction.id
      // );
      // cloneTransactions.splice(
      //   action.payload.index,
      //   0,
      //   action.payload.newTransaction
      // );
      return {
        ...state,
        transactions: [
          ...state.transactions.filter(
            (transaction) => transaction.id !== action.payload.id
          ),
          action.payload,
        ],
        // transactions: [
        //   state.transactions.splice(
        //     action.payload.index,
        //     0,
        //     action.payload.newTransaction
        //   ),
        // ],
        // transactions: cloneTransactions,
      };
    default:
      return state;
  }
};
