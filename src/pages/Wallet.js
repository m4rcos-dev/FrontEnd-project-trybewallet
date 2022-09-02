import { Box, Paper } from '@mui/material';
import React from 'react';
import Header from '../components/Header';
import TableExpense from '../components/TableExpenses';
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
            minWidht: '80%',
            position: 'fixed',
            boxShadow: '-4px 9px 13px ',
            borderRadius: '0.625rem',
          } }
        >
          <Header />
          <WalletForm />
        </Paper>

        <Paper
          sx={ {
            display: 'flex',
            justifyContent: 'center',
            minwidht: '80%',
            width: '75rem',
            mt: '30vh',
            pt: '7vh',
            boxShadow: '-4px 9px 13px ',
            borderRadius: '0.625rem',
            backgroundColor: 'primary.main',
          } }
        >
          <TableExpense />
        </Paper>

      </Box>
    );
  }
}

export default Wallet;
