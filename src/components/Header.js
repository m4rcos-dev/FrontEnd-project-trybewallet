import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  currentCurrency = () => {
    const { expenses } = this.props;
    const arrCurrency = [];
    expenses.forEach((expense) => {
      const { value, currency, exchangeRates } = expense;
      const currentCurrency = exchangeRates[currency].ask;
      const sumValue = value * currentCurrency;
      arrCurrency.push(sumValue);
    });
    const total = arrCurrency.reduce((acc, curr) => acc + curr, 0);
    return parseFloat(total).toFixed(2);
  };

  render() {
    const { email, expenses } = this.props;
    const validExpense = expenses.length > 0;
    const expensesTotal = validExpense ? this.currentCurrency() : 0;
    return (
      <div>
        <span data-testid="email-field">
          {email}
        </span>
        <span data-testid="total-field">
          {expensesTotal}
        </span>
        <span data-testid="header-currency-field">
          BRL
        </span>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
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
  ...state.user,
  ...state.wallet,
});

export default connect(mapStateToProps)(Header);
