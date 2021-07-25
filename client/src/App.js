import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import MenuBar from './components/NavBar';
import { Container } from 'semantic-ui-react';
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import Profile from './pages/profile/Profile'
import LogOut from './pages/logout/LogOut'
import Feed from './pages/feed/Feed'


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
