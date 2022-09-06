/* eslint-disable max-lines */
/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  Typography } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteExpense, editExpense } from '../redux/actions';

class TableExpenses extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      openDelete: false,
      openDeleteSucess: false,
    };
  }

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
    this.setState({ openDelete: false }, () => {
      const { expenses, dispatch } = this.props;
      const currentExpenses = expenses
        .filter((currentExpense) => currentExpense.id !== expense.id);
      dispatch(deleteExpense(currentExpenses));
      this.setState({ openDeleteSucess: true });
    });
    // this.handleDeleteAlert();
  };

  editExpense = (expense) => {
    const { dispatch } = this.props;
    dispatch(editExpense(expense.id, true, expense));
  };

  handleDetailsAlert = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  handleDeleteAlert = () => {
    const { openDelete } = this.state;
    this.setState({ openDelete: !openDelete });
  };

  handleDeleteSucess = () => {
    this.setState({ openDeleteSucess: false });
  };

  render() {
    const { open, openDelete, openDeleteSucess } = this.state;
    // =============BreakPoints==========================
    const StyledTableCellBk = styled(TableCell)(({ theme }) => ({
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 20,
      },
    }));

    const StyledTableCellDetails = styled(TableCell)(({ theme }) => ({
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 20,
      },
    }));

    const TableCellBk = styled(TableCell)(({ theme }) => ({
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    }));

    const TableCellBkDetails = styled(TableCell)(({ theme }) => ({
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    }));

    const TableCustomBk = styled(Table)(({ theme }) => ({
      [theme.breakpoints.down('md')]: {
        minWidth: '0rem',
        maxWidth: '0rerm',
      },
    }));

    // ===============Style================================
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
      '&:last-child td': {
        border: 0,
        color: theme.palette.secondary.main,
      },
    }));

    const { expenses } = this.props;
    return (
      <TableCustomBk
        sx={ {
          minWidth: '70rem',
          maxWidth: '70rem',
        } }
        aria-label="expenses table"
        size="small"
      >
        <TableHead sx={ {} }>
          <StyledTableRow>
            <StyledTableCell>Descrição</StyledTableCell>
            <StyledTableCellBk>Tag</StyledTableCellBk>
            <StyledTableCellBk>Método de pagamento</StyledTableCellBk>
            <StyledTableCell>Valor</StyledTableCell>
            <StyledTableCellBk>Moeda</StyledTableCellBk>
            <StyledTableCellBk>Câmbio utilizado</StyledTableCellBk>
            <StyledTableCellBk>Valor convertido</StyledTableCellBk>
            <StyledTableCellDetails>Detalhes</StyledTableCellDetails>
            <StyledTableCell>Editar/Excluir</StyledTableCell>
          </StyledTableRow>
          <Snackbar
            open={ openDeleteSucess }
            autoHideDuration={ 6000 }
            onClose={ this.handleDeleteSucess }
          >
            <Alert
              severity="error"
              sx={ { width: '100%' } }
            >
              Despesa deletada!
            </Alert>
          </Snackbar>
        </TableHead>
        {expenses.map((expense) => (
          <TableBody key={ expense.id }>
            <StyledTableRow>
              <TableCell>{expense.description}</TableCell>
              <TableCellBk>{expense.tag}</TableCellBk>
              <TableCellBk>{expense.method}</TableCellBk>
              <TableCell>{Number(expense.value).toFixed(2)}</TableCell>
              <TableCellBk>{this.currentCurrency(expense)}</TableCellBk>
              <TableCellBk>{this.currentAsk(expense)}</TableCellBk>
              <TableCellBk>{this.sumValue(expense)}</TableCellBk>
              <TableCellBkDetails>
                <Button
                  color="secondary"
                  onClick={ this.handleDetailsAlert }
                >
                  Detalhes
                </Button>
                <Dialog
                  open={ open }
                  onClose={ this.handleDetailsAlert }
                  aria-labelledby="detalhes da despesa"
                  aria-describedby="detalhes da despesa"
                >
                  <DialogTitle id="alert-dialog-title">
                    {expense.description}
                  </DialogTitle>
                  <DialogContent>
                    <Box
                      sx={ {
                        display: 'flex',
                        alignItems: 'center',
                      } }
                    >
                      <Typography
                        sx={ { fontWeight: 'bolder',
                          fontSize: '1rem' } }
                      >
                        Tag:
                      </Typography>
                      <Typography
                        sx={ { ml: '0.5rem', fontSize: '1rem' } }
                      >
                        {expense.tag}
                      </Typography>
                    </Box>
                    <Box
                      sx={ {
                        display: 'flex',
                        alignItems: 'center',
                      } }
                    >
                      <Typography
                        sx={ { fontWeight: 'bolder',
                          fontSize: '1rem' } }
                      >
                        Método de pagamento:
                      </Typography>
                      <Typography
                        sx={ { ml: '0.5rem', fontSize: '1rem' } }
                      >
                        {expense.method}
                      </Typography>
                    </Box>
                    <Box
                      sx={ {
                        display: 'flex',
                        alignItems: 'center',
                      } }
                    >
                      <Typography
                        sx={ { fontWeight: 'bolder',
                          fontSize: '1rem' } }
                      >
                        Moeda:
                      </Typography>
                      <Typography
                        sx={ { ml: '0.5rem', fontSize: '1rem' } }
                      >
                        {this.currentCurrency(expense)}
                      </Typography>
                    </Box>
                    <Box
                      sx={ {
                        display: 'flex',
                        alignItems: 'center',
                      } }
                    >
                      <Typography
                        sx={ { fontWeight: 'bolder',
                          fontSize: '1rem' } }
                      >
                        Câmbio utilizado:
                      </Typography>
                      <Typography
                        sx={ { ml: '0.5rem', fontSize: '1rem' } }
                      >
                        {this.currentAsk(expense)}
                      </Typography>
                    </Box>
                    <Box
                      sx={ {
                        display: 'flex',
                        alignItems: 'center',
                      } }
                    >
                      <Typography
                        sx={ { fontWeight: 'bolder',
                          fontSize: 'rerm' } }
                      >
                        Valor convertido:
                      </Typography>
                      <Typography
                        sx={ { ml: '0.5rem', fontSize: '1rem' } }
                      >
                        {this.sumValue(expense)}
                      </Typography>
                    </Box>
                    <DialogActions>
                      <Button
                        onClick={ this.handleDetailsAlert }
                      >
                        Fechar
                      </Button>
                    </DialogActions>
                  </DialogContent>
                </Dialog>
              </TableCellBkDetails>
              <TableCell>
                <IconButton
                  aria-label="editar"
                  onClick={ () => this.editExpense(expense) }
                >
                  <BorderColorIcon />
                </IconButton>
                <IconButton
                  color="error"
                  aria-label="excluir"
                  // onClick={ () => this.removeExpense(expense) }
                  onClick={ this.handleDeleteAlert }
                >
                  <DeleteForeverIcon />
                </IconButton>
                <Dialog
                  open={ openDelete }
                  onClose={ this.handleDeleteAlert }
                  aria-labelledby="alerta excluir despesa"
                  aria-describedby="alerta excluir despesa"
                >
                  <DialogTitle id="alert-delete-title">
                    Atenção
                  </DialogTitle>
                  <DialogContent>
                    {`Deseja ralmente exlcuir: "${expense.description}"`}
                    <DialogActions>
                      <Button
                        onClick={ this.handleDeleteAlert }
                      >
                        Não
                      </Button>
                      <Button
                        onClick={ () => this.removeExpense(expense) }
                      >
                        Sim
                      </Button>
                    </DialogActions>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </StyledTableRow>
          </TableBody>
        ))}
      </TableCustomBk>
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
