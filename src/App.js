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

// Mobile First /carteira

// Corrigir erros console ok
// Corrigir erro foco em todos inputs ok
// Corrir erro scroll no mobile ok
// Corrigir erro foco em todos inputs mobile
// Criar pagina detalhes ok

// Corrigir Erros Inputs tela de Login ok
// Cria aleta exluir despesa ok
// Criar snackbar de adiconado, editado e excluido com sucesso
// Criar Page NotFound
// Criar Loading Chamar API
// Validação Inputs Expenses ok
