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
      const testeArray = [...state.transactions];
      testeArray.splice(action.payload.index, 1, action.payload.newTransaction);
      return {
        transactions: [...testeArray],
      };
    case 'UPDATE_INGREDIENTS':
      const testArray = [...state.transactions];
      const replaceIndex = testArray.findIndex(
        (info) => info.id === action.payload.id
      );

      testArray[replaceIndex].ingredientesSelecionados =
        action.payload.ingredients;
      return {
        transactions: [...testArray],
      };
    default:
      return state;
  }
};
