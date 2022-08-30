import { CURRENCY_WALLET, VALUE_WALLET, FAILED_REQUEST } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [{
    totalExpenses: 0,
  }], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  isFetching: false,
  error: '',
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCY_WALLET:
    return {
      ...state,
      isFetching: true,
    };
  case VALUE_WALLET:
    return {
      ...state,
      currencies: action.data,
      isFetching: false,
    };
  case FAILED_REQUEST:
    return {
      ...state,
      isFetching: true,
      error: action.error,
    };
  default:
    return state;
  }
};

export default wallet;
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
