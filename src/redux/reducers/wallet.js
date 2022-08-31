import {
  CURRENCY_WALLET,
  VALUE_WALLET,
  FAILED_REQUEST,
  VALUE_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  ADD_EDIT_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
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
  case VALUE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.value],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.arr,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: action.isEdit,
      idToEdit: action.id,
    };
  case ADD_EDIT_EXPENSE:
    return {
      ...state,
      expenses: action.value,
    };
  default:
    return state;
  }
};

export default wallet;
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
