/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Stack,
} from '@mui/material';
import {
  addEditExpense,
  editExpense,
  fetchCurrencyWallet,
  valueExpense,
} from '../redux/actions';

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
      const newExpenseSort = newExpense.sort((a, b) => {
        if (a.id < b.id) {
          const validSort = -1;
          return validSort;
        }
        return true;
      });
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
      <Box
        sx={ {
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#e1e5eb',
          // opacity: '0.4',
          p: '3rem 1rem 1rem 1rem',
        } }
      >
        <Box>
          <Stack
            direction="row"
            spacing={ 3 }
          >
            <TextField
              id="filled-basic"
              label="Valor"
              variant="filled"
              type="number"
              name="value"
              onChange={ this.handleChange }
              value={ value }
            />
            <TextField
              id="filled-basic"
              label="Breve Descrição"
              variant="filled"
              name="description"
              onChange={ this.handleChange }
              value={ description }
            />
            <FormControl variant="filled" sx={ { minWidth: 120 } }>
              <InputLabel id="select-coin-label">Moeda</InputLabel>
              <Select
                labelId="select-coin-label"
                id="select-coin"
                name="currency"
                onChange={ this.handleChange }
                value={ currency }
              >
                {currencies.map((currentCurrency, index) => (
                  <MenuItem
                    key={ `${currentCurrency}${index}` }
                    value={ currentCurrency }
                  >
                    {currentCurrency}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="filled" sx={ { minWidth: 200 } }>
              <InputLabel id="select-method-label">Método de pagamento</InputLabel>
              <Select
                labelId="select-method-label"
                id="select-method"
                name="method"
                onChange={ this.handleChange }
                value={ method }
              >
                <MenuItem value="Dinheiro">Dinheiro</MenuItem>
                <MenuItem value="Cartão de crédito">Cartão de crédito</MenuItem>
                <MenuItem value="Cartão de débito">Cartão de débito</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="filled" sx={ { minWidth: 200 } }>
              <InputLabel id="select-tag-label">Categoria</InputLabel>
              <Select
                labelId="select-tag-label"
                id="select-tag"
                name="tag"
                onChange={ this.handleChange }
                value={ tag }
              >
                <MenuItem value="Alimentação">Alimentação</MenuItem>
                <MenuItem value="Lazer">Lazer</MenuItem>
                <MenuItem value="Trabalho">Trabalho</MenuItem>
                <MenuItem value="Transporte">Transporte</MenuItem>
                <MenuItem value="Saúde">Saúde</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Box>
        <Box>
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
        </Box>
      </Box>
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
