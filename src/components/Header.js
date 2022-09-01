import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TitleLogo from './TitleLogo';

class Header extends Component {
  currentCurrency = () => {
    const { expenses } = this.props;
    const arrCurrency = [];
    expenses.forEach((expense) => {
      const { value, currency, exchangeRates } = expense;
      const currentCurrency = exchangeRates[currency].ask;
      const sumValue = parseFloat(value) * currentCurrency;
      arrCurrency.push(sumValue);
    });
    const total = arrCurrency.reduce((acc, curr) => acc + curr, 0);
    return Number(total).toFixed(2);
  };

  render() {
    const { email, expenses } = this.props;
    const validExpense = expenses.length > 0;
    const expensesTotal = validExpense ? this.currentCurrency() : Number(0).toFixed(2);
    return (
      <Box
        sx={ {
          display: 'flex',
        } }
      >
        <TitleLogo />
        <Box
          sx={ {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          } }
        >
          <LocalAtmIcon
            fontSize="large"
            color="primary"
          />
          <Typography
            variant="h6"
            color="primary"
          >
            Total de despesas:
            {' '}
            {expensesTotal}
            {' '}
            BRL
          </Typography>
          <AccountCircleIcon
            fontSize="large"
            color="secondary"
          />
          <Typography
            variant="h6"
            color="secondary"
          >
            {email}
          </Typography>
        </Box>

        {/* <span data-testid="email-field">
          {email}
        </span> */}
        {/* <span data-testid="total-field">
          {expensesTotal}
        </span> */}
        {/* <span data-testid="header-currency-field">
          BRL
        </span> */}
      </Box>
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
