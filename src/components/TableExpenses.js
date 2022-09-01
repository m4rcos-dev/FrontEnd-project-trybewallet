/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Box,
  IconButton,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteExpense, editExpense } from '../redux/actions';

class TableExpenses extends Component {
  currentCurrency = (expense) => {
    const { currency, exchangeRates } = expense;
    const currentCurrency = exchangeRates[currency].name;
    return currentCurrency;
  };

  currentAsk = (expense) => {
    const { currency, exchangeRates } = expense;
    const currentAsk = exchangeRates[currency].ask;
    return parseFloat(currentAsk).toFixed(2);
  };

  sumValue = (expense) => {
    const { value, currency, exchangeRates } = expense;
    const currentAsk = exchangeRates[currency].ask;
    const sumValue = value * currentAsk;
    return parseFloat(sumValue).toFixed(2);
  };

  removeExpense = (expense) => {
    const { expenses, dispatch } = this.props;
    const currentExpenses = expenses
      .filter((currentExpense) => currentExpense.id !== expense.id);
    dispatch(deleteExpense(currentExpenses));
  };

  editExpense = (expense) => {
    const { dispatch } = this.props;
    dispatch(editExpense(expense.id, true));
  };

  render() {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 20,
      },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.primary.main,
      },
      // hide last border
      '&:last-child td': {
        border: 0,
        color: theme.palette.secondary.main,
      },
    }));

    const { expenses } = this.props;
    return (
      <Box>
        <TableContainer component={ Paper }>
          <Table
            sx={ { minWidth: '70rem', maxWidth: '70rem' } }
            aria-label="expenses table"
          >
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Descrição</StyledTableCell>
                <StyledTableCell>Tag</StyledTableCell>
                <StyledTableCell>Método de pagamento</StyledTableCell>
                <StyledTableCell>Valor</StyledTableCell>
                <StyledTableCell>Moeda</StyledTableCell>
                <StyledTableCell>Câmbio utilizado</StyledTableCell>
                <StyledTableCell>Valor convertido</StyledTableCell>
                <StyledTableCell>Moeda de conversão</StyledTableCell>
                <StyledTableCell>Editar/Excluir</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            {expenses.map((expense) => (
              <TableBody key={ expense.id }>
                <StyledTableRow>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.tag}</TableCell>
                  <TableCell>{expense.method}</TableCell>
                  <TableCell>{Number(expense.value).toFixed(2)}</TableCell>
                  <TableCell>{this.currentCurrency(expense)}</TableCell>
                  <TableCell>{this.currentAsk(expense)}</TableCell>
                  <TableCell>{this.sumValue(expense)}</TableCell>
                  <TableCell>Real</TableCell>
                  <TableCell>
                    <IconButton
                      // color="secondary"
                      aria-label="editar"
                      onClick={ () => this.editExpense(expense) }
                    >
                      <BorderColorIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      aria-label="excluir"
                      onClick={ () => this.removeExpense(expense) }
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              </TableBody>
            ))}
          </Table>
        </TableContainer>
      </Box>
    );
  }
}

TableExpenses.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    exchangeRates: PropTypes.objectOf(PropTypes.shape({
      code: PropTypes.string.isRequired,
      codein: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      high: PropTypes.string.isRequired,
      low: PropTypes.string.isRequired,
      varBid: PropTypes.string.isRequired,
      pctChange: PropTypes.string.isRequired,
      bid: PropTypes.string.isRequired,
      ask: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      create_date: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  ...state.wallet,
});

export default connect(mapStateToProps)(TableExpenses);
