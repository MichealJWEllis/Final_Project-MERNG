import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import MenuBar from './components/NavBar';
import { Container } from 'semantic-ui-react';
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import LogOut from './pages/LogOut'
import Feed from './pages/Feed'


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/logout' component={LogOut} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={SignUp} />
        <div>
          <Container>
            <MenuBar />
            <Route exact path='/' component={Home} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/feed' component={Feed} />

          </Container>
        </div>
      </Switch>

    </Router>
  );
}

export default App;
