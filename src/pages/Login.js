import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userEmail } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisable: true,
    };
  }

  validEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  validPassword = (password) => {
    const limitMinCharacter = 6;
    const isvalid = password.length >= limitMinCharacter;
    return isvalid;
  };

  handleChange = ({ target }) => {
    const { name } = target;

    this.setState({ [name]: target.value }, () => {
      const { email, password } = this.state;
      const validAll = this.validEmail(email) && this.validPassword(password);
      this.setState({ isDisable: !validAll });
    });
  };

  submit = (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(userEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, isDisable } = this.state;
    return (
      <div>
        <label htmlFor="emailInput">
          <input
            type="text"
            id="emailInput"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ (event) => this.handleChange(event) }
          />
        </label>
        <label htmlFor="passwordInput">
          <input
            type="password"
            id="passwordInput"
            data-testid="password-input"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          onClick={ this.submit }
          disabled={ isDisable }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
