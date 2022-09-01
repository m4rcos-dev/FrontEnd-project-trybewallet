import { Box, styled, Typography } from '@mui/material';
import React, { Component } from 'react';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

class TitleLogo extends Component {
  render() {
    // =============BreakPoints==========================
    const TypographyCustom = styled(Typography)(({ theme }) => ({
      [theme.breakpoints.down('sm')]: {
        fontSize: '2rem',
      },
    }));

    return (
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
        <TypographyCustom
          variant="h3"
          color="primary"
        >
          Trybe
        </TypographyCustom>
        <TypographyCustom
          variant="h3"
          color="secondary"
        >
          Wallet
        </TypographyCustom>
      </Box>
    );
  }
}

export default TitleLogo;
