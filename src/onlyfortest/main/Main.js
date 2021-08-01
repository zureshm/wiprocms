import { useContext} from 'react';
import { Route, Switch, Redirect, useHistory} from 'react-router-dom';

import Signup from'./signup/Signup';
import Login from'./login/Login';
import Welcome from './welcome/Welcome';
import LoginContext from './store/login-context';

function Main(){
    const loginCtx = useContext(LoginContext);
    const history = useHistory();

    function alreadyLoggedin(){
        setTimeout(function(){
            history.push("/welcome");
        },1000);        
    }
    loginCtx.loginStatus && alreadyLoggedin();// if login session present, redirect to welcome

    return (
        <div className="main">            
                <Switch>
                    <Route exact path="/">
                        <Signup></Signup>
                    </Route>
                    <Route  path="/login">
                        <Login></Login>
                    </Route>
                    {loginCtx.loginStatus && 
                    <Route  path="/welcome">
                        <Welcome></Welcome>
                    </Route>
                    }
                    <Route  path="*">
                        <Redirect to="/login" />
                    </Route>
                </Switch>
        </div>
    )
}

export default Main;