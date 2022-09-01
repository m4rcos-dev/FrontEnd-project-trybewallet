import { Box, Paper } from '@mui/material';
import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import Image from '../images/backgroundPages.jpg';

class Wallet extends React.Component {
  render() {
    return (
      <Box
        sx={ {
          backgroundImage: `url(${Image})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100vh',
        } }
      >
        <Paper
          sx={ {
            widht: '80%',
            boxShadow: '-4px 9px 13px ',
            borderRadius: '0.625rem',
          } }
        >
          <Header />
          <WalletForm />
        </Paper>
        <Table />
      </Box>
    );
  }
}

export default Wallet;
