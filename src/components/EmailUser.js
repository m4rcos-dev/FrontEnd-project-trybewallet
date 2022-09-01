import { Box, Typography } from '@mui/material';
import React, { Component } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class EmailUser extends Component {
  render() {
    const { email } = this.props;
    return (
      <Box
        sx={ {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        } }
      >
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
    );
  }
}

EmailUser.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

export default connect(mapStateToProps)(EmailUser);
