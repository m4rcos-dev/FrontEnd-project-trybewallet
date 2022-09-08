/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  styled,
  TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { userEmail } from '../redux/actions';
import TitleLogo from '../components/TitleLogo';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisable: true,
      emailValid: false,
      passwordValid: false,
      inputEmailFocus: false,
      inputPasswordFocus: false,
      passwordVisible: false,
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
    const { name, id } = target;
    this.setState({
      [name]: target.value,
      inputEmailFocus: false,
      inputPasswordFocus: false }, () => {
      const { email, password } = this.state;
      const validEmail = this.validEmail(email);
      const validPassword = this.validPassword(password);
      const validAll = this.validEmail(email) && this.validPassword(password);
      this.setState({
        isDisable: !validAll,
        emailValid: !validEmail,
        passwordValid: !validPassword,
        [id]: true,
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

  handleClickShowPassword = () => {
    const { passwordVisible } = this.state;
    this.setState({ passwordVisible: !passwordVisible });
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

    const {
      email,
      password,
      isDisable,
      emailValid,
      passwordValid,
      inputEmailFocus,
      inputPasswordFocus,
      passwordVisible } = this.state;
    return (
      <Box
        sx={ {
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

              <TitleLogo />

              <TextField
                sx={ {
                  width: '100%',
                } }
                required
                autoFocus={ inputEmailFocus }
                error={ emailValid }
                id="inputEmailFocus"
                label="Email"
                name="email"
                onChange={ (event) => this.handleChange(event) }
                value={ email }
              />

              <TextField
                sx={ {
                  width: '100%',
                } }
                required
                autoFocus={ inputPasswordFocus }
                error={ passwordValid }
                id="inputPasswordFocus"
                label="Senha"
                name="password"
                type={ passwordVisible ? 'text' : 'password' }
                value={ password }
                onChange={ this.handleChange }
                InputProps={ {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={ this.handleClickShowPassword }
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {passwordVisible ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                } }
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
