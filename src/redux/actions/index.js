export const USER_EMAIL = 'USER_EMAIL';
export const VALUE_WALLET = 'VALUE_WALLET';
export const CURRENCY_WALLET = 'CURRENCY_WALLET';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export const userEmail = (email) => ({ type: USER_EMAIL, email });
const currencyWallet = () => ({ type: CURRENCY_WALLET });
export const valueWallet = (data) => ({ type: VALUE_WALLET, data });
const failedRequest = (error) => ({ type: FAILED_REQUEST, error });

export const fetchCurrencyWallet = () => async (dispatch) => {
  dispatch(currencyWallet());

  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const dataFilter = Object.keys(data)
      .filter((currentCurrency) => currentCurrency !== 'USDT');
    if (!data) throw new Error('Erro requisição API');
    dispatch(valueWallet(dataFilter));
  } catch (erro) {
    dispatch(failedRequest(erro.message));
  }
};

// Coloque aqui suas actions
