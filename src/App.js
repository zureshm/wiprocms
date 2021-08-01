
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Signup from './signup/Signup';
import Login from './login/Login';
import './App.css';


import { Typography, AppBar, CssBaseline, Toolbar, Container} from '@material-ui/core';
import {AccountBox} from '@material-ui/icons';

function App() {
  return (
    <>
      <CssBaseline />
      <AppBar position='relative'>
        <Toolbar>
          <AccountBox></AccountBox>
          <Typography variant='h6'>Application React</Typography>
        </Toolbar>
      </AppBar>
      <main>
        <BrowserRouter>
        <div>
          <Container>
            <Switch>
              <Route exact path="/">
                <Signup></Signup>
              </Route>
              
              <Route path="/login">
                <Login></Login>
              </Route>
            </Switch>
          </Container>
        </div>
        </BrowserRouter>
      </main>

      
    </>
  );
}

export default App;
