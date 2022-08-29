import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, totalExpenses } = this.props;
    return (
      <div>
        <span data-testid="email-field">
          {email}
        </span>
        <span data-testid="total-field">
          Dipesa Total: R$
          {' '}
          {totalExpenses}
          {' '}
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
  totalExpenses: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet.expenses[0],
});

export default connect(mapStateToProps)(Header);
