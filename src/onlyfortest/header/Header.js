import { useContext} from 'react';
import LoginContext from '../main/store/login-context';
import {Link} from 'react-router-dom';

function Header(){

    const loginCtx = useContext(LoginContext);
    const loginStatus = loginCtx.loginStatus;
    //const authData = loginCtx.authData; //getting data from Context

    /*only for loging out in Context*/    
    const setLoginStatus = loginCtx.setLoginStatus;  
    function runSetLoginStatus(){
      setLoginStatus(false);
    }
    /*only for loging out in Context ends*/ 

    return (
        <header>
            <div className="center"> Wipro Content Management System</div>
            <div className="right">
                {!loginStatus ?<></> :                
                <Link to="/login" onClick={runSetLoginStatus} >Logout</Link>} 
                
            </div>
        </header>
    )
}

export default Header;