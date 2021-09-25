import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Detail from './pages/board/Detail';
import Boards from './pages/board/Boards';
import Create from './pages/board/Create';
import Update from './pages/board/Update';

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/board/create">
          <Create />
        </Route>
        <Route path="/board/update/:pid">
          <Update />
        </Route>
        <Route path="/board/:id">
          <Detail />
        </Route>
        <Route path="/board">
          <Boards />
        </Route>
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>

  );
}

export default App;
