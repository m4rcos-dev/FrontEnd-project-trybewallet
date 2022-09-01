import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TitleLogo from './TitleLogo';
import TotalExpenses from './TotalExpenses';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <Box
        sx={ {
          display: 'flex',
        } }
      >
        <TitleLogo />
        <Box>
          <TotalExpenses />
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
      </Box>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

export default connect(mapStateToProps)(Header);
