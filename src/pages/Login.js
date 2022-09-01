/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box,
  Button,
  Paper,
  Stack,
  styled,
  TextField,
  Typography } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { userEmail } from '../redux/actions';
import Image from '../images/backgroundLogin.jpg';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisable: true,
      emailValid: false,
      passwordValid: false,
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
      const validEmail = this.validEmail(email);
      const validPassword = this.validPassword(password);
      const validAll = this.validEmail(email) && this.validPassword(password);
      this.setState({
        isDisable: !validAll,
        emailValid: !validEmail,
        passwordValid: !validPassword,
      });
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
    // =============BreakPoints==========================
    const PaperCustom = styled(Paper)(({ theme }) => ({
      [theme.breakpoints.down('sm')]: {
        width: '20rem',
        height: '20rem',
      },
    }));

    const BoxCustom = styled('div')(({ theme }) => ({
      [theme.breakpoints.down('sm')]: {
        width: '15rem',
      },
    }));

    const { email, password, isDisable, emailValid, passwordValid } = this.state;
    return (
      <Box
        sx={ {
          backgroundImage: `url(${Image})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        } }
      >

        <PaperCustom
          sx={ {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '32.813rem',
            height: '22.25rem',
            boxShadow: '-4px 9px 13px #036B52',
          } }
        >

          <BoxCustom
            sx={ {
              width: '20.625rem',
            } }
          >
            <Stack spacing={ 2 }>

              <Box
                sx={ {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                } }
              >
                <AccountBalanceWalletIcon
                  fontSize="large"
                  color="primary"
                />
                <Typography
                  variant="h3"
                  color="primary"
                >
                  Trybe
                </Typography>
                <Typography
                  variant="h3"
                  color="secondary"
                >
                  Wallet
                </Typography>
              </Box>

              <TextField
                sx={ {
                  width: '100%',
                } }
                error={ emailValid }
                id="outlined-error"
                label="Email"
                name="email"
                value={ email }
                onChange={ (event) => this.handleChange(event) }
              />

              <TextField
                sx={ {
                  width: '100%',
                } }
                error={ passwordValid }
                id="outlined-password-input"
                label="Senha"
                name="password"
                type="password"
                value={ password }
                onChange={ this.handleChange }
              />

              <Button
                sx={ {
                  width: '100%',
                } }
                variant="contained"
                onClick={ this.submit }
                disabled={ isDisable }
              >
                Entrar
              </Button>
            </Stack>

          </BoxCustom>

        </PaperCustom>
      </Box>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
