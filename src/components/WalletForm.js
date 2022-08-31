import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  addEditExpense,
  editExpense,
  fetchCurrencyWallet,
  valueExpense,
} from '../redux/actions';
import sortOjbt from '../tests/helpers/sortMock';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: [],
};

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: [],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencyWallet());
  }

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({ [name]: target.value });
  };

  addExpense = async (event) => {
    event.preventDefault();
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    this.setState({ exchangeRates: data }, () => {
      const { dispatch } = this.props;
      dispatch(valueExpense(this.state));
      this.setState((previousState) => ({
        id: previousState.id + 1,
        ...INITIAL_STATE,
      }));
    });
  };

  addEditExpense = async (event) => {
    event.preventDefault();
    const { idToEdit, expenses } = this.props;
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    this.setState({ exchangeRates: data, id: idToEdit }, () => {
      const currentIndex = expenses.findIndex((expense) => expense.id === idToEdit);
      const removeExpense = expenses
        .filter((currentExpense) => currentExpense.id !== idToEdit);
      const newExpense = [...removeExpense, expenses[currentIndex] = { ...this.state }];
      const newExpenseSort = newExpense.sort((a, b) => sortOjbt(a, b));
      const { dispatch } = this.props;
      dispatch(addEditExpense(newExpenseSort));
      dispatch(editExpense(0, false));
      this.setState((previousState) => ({
        id: previousState,
        ...INITIAL_STATE,
      }));
    });
  };

  render() {
    const { currencies, editor } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const validDisplayButtomEdit = editor ? 'inline' : 'none';
    const validDisplayButtomAdd = editor ? 'none' : 'inline';
    return (
      <div>
        <form>
          <label htmlFor="inputValue">
            Valor:
            <input
              type="text"
              id="inputValue"
              name="value"
              data-testid="value-input"
              onChange={ this.handleChange }
              value={ value }
            />
          </label>
          <label htmlFor="inputDescription">
            Descrição:
            <input
              type="text"
              id="inputDescription"
              name="description"
              data-testid="description-input"
              onChange={ this.handleChange }
              value={ description }
            />
          </label>
          <label htmlFor="coin">
            Moeda:
            <select
              name="currency"
              id="coin"
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ currency }
            >
              {currencies.map((currentCurrency, index) => (
                <option
                  key={ `${currentCurrency}${index}` }
                  value={ currentCurrency }
                >
                  {currentCurrency}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="payment">
            Metodo de pagamento:
            <select
              name="method"
              id="payment"
              data-testid="method-input"
              onChange={ this.handleChange }
              value={ method }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="category">
            Categoria:
            <select
              name="tag"
              id="category"
              data-testid="tag-input"
              onChange={ this.handleChange }
              value={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          {editor
            ? <div /> : (
              <button
                type="submit"
                onClick={ this.addExpense }
                style={ { display: validDisplayButtomAdd } }
              >
                Adicionar despesa
              </button>
            )}
          {editor ? (
            <button
              type="submit"
              onClick={ this.addEditExpense }
              style={ { display: validDisplayButtomEdit } }
            >
              Editar despesa
            </button>
          ) : <div />}
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  idToEdit: PropTypes.number.isRequired,
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    exchangeRates: PropTypes.objectOf(PropTypes.shape({
      code: PropTypes.string.isRequired,
      codein: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      high: PropTypes.string.isRequired,
      low: PropTypes.string.isRequired,
      varBid: PropTypes.string.isRequired,
      pctChange: PropTypes.string.isRequired,
      bid: PropTypes.string.isRequired,
      ask: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      create_date: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  ...state.wallet,
});

export default connect(mapStateToProps)(WalletForm);
