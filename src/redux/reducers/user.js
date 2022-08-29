import { USER_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_EMAIL:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;

// Esse reducer será responsável por tratar as informações da pessoa usuária
