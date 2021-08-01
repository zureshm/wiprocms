import {useState, useContext} from 'react';
import LoginContext from '../store/login-context';
import {Link as RouterLink,useHistory} from 'react-router-dom'; 

function Login(props){
    const loginCtx = useContext(LoginContext);

    /*only for login status getting and setting*/
    const loginStatus = loginCtx.loginStatus;
    console.log("dummyStatus",loginStatus);
    const setLoginStatus = loginCtx.setLoginStatus;    //Y1 calling from context file
    function runSetLoginStatus(){
      setLoginStatus(true);
    }
    /*only for login status setting and getting ends*/

    //const authData = loginCtx.authData; //getting data from Context
    const lol2 = loginCtx.setLoginDetails; //set data to Context using this function
    function dataToStore(surdata){
      lol2(surdata)
    } 

    const API_URL = process.env.REACT_APP_API_URL 
    //this for getting form data
    const [username, setUser] = useState('');    
    const [password, setPassword] = useState('');


   
    //const [loginState, setLoginState] = useState(false);

    const history = useHistory(); //to redirect after successful login
    function toWelcomePage(){      
        history.replace('/welcome');          
    }
   

    async function submitForm(e){
        e.preventDefault();
        const loginData = {
            username : username,
            password : password
          }
          console.log("looolloo")
          let apiResult = await fetch(
            API_URL+'api/auth/login',
              {
                method:'POST',
                body : JSON.stringify(loginData),
                headers : {
                  'Content-Type': 'application/json'
                }
              }
            
            );
          let apiStatus =  apiResult.status;
          apiResult = await apiResult.json();
          
          if(apiStatus === 200){            
            //setLoginState(true);
            localStorage.setItem("login-data", JSON.stringify(apiResult));

            /*sending data to store*/
            dataToStore(apiResult);
            /*setting login status*/
            runSetLoginStatus();
            toWelcomePage();
            
          }else{  
            console.log("Some error happend:",apiStatus);
            localStorage.removeItem("login-data");
          }
    }

    return (
        <div className="signup">
            <div className="form_title">Login</div>
            <form onSubmit={submitForm}>
                
                <input type="text"
                    className="input_style1" placeholder="Username"
                    onChange ={(e) =>setUser(e.target.value) }
                 />
                 
                <input type="password" className="input_style1" placeholder="Password" 
                onChange ={(e) =>setPassword(e.target.value) }
                />
                <button className="button_style1">Login</button>

                <div className="form_footer">
                    <RouterLink to="/">No account? Please sign up</RouterLink>
                </div>
            </form>
            
        </div>
    )
}

export default Login;