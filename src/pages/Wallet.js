import { Box, Paper, styled } from '@mui/material';
import React from 'react';
import Header from '../components/Header';
import TableExpense from '../components/TableExpenses';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    // =============BreakPoints==========================
    const PaperCustomTableBk = styled(Paper)(({ theme }) => ({
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    }));

    const PaperCustomWalletFormBk = styled(Paper)(({ theme }) => ({
      [theme.breakpoints.down('md')]: {
        position: 'absolute',
      },
    }));

    return (
      <Box
        sx={ {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        } }
      >
        <PaperCustomWalletFormBk
          sx={ {
            minWidht: '80%',
            position: 'fixed',
            boxShadow: '-4px 9px 13px ',
            borderRadius: '0.625rem',
            zIndex: 'modal',
          } }
        >
          <Header />
          <WalletForm />
        </PaperCustomWalletFormBk>

        <PaperCustomTableBk
          sx={ {
            display: 'flex',
            justifyContent: 'center',
            position: 'sticky',
            top: '0',
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
        </PaperCustomTableBk>
      </Box>
    );
  }
}

export default Wallet;
