import React, { Component } from 'react';
import { Box } from '@mui/material';
import TitleLogo from './TitleLogo';
import TotalExpenses from './TotalExpenses';
import EmailUser from './EmailUser';

class Header extends Component {
  render() {
    return (
      <Box
        sx={ {
          display: 'flex',
          justifyContent: 'space-around',
          height: '15vh',
        } }
      >
        <TitleLogo />
        <TotalExpenses />
        <EmailUser />
      </Box>
    );
  }
}

export default (Header);
