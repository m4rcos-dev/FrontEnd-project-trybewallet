import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/carteira" component={ Wallet } />
      </Switch>
    </div>
  );
}

export default App;

// iniciando projeto
// Mobile First /carteira
// Corrigir erro foco em todos inputs
// Corrir erro scroll no mobile first
// Criar pagina detalhes
// Criar Page NotFound
// Criar Loading Chamar API
// Corrigir Erros Inputs tela de Login
// Validação Inputs Expenses
