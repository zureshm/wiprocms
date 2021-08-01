import {useState} from 'react';
import {Link as RouterLink, useHistory} from 'react-router-dom'; 

function Signup(){
    const API_URL = process.env.REACT_APP_API_URL;
    
    

    //this states for form submission
    const [username, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   


    //this is for form submission message
    const [formResult, setFormResult] =useState('');
    const [formResultColor, setFormResultColor] =useState();
    const [showSubStat, setShowSubStat] =useState(false); //form submition status
       
    const history = useHistory(); //to redirect after successful registration
    function toLoginPage(){
      setTimeout(function(){
        history.replace('/login');
      },2000)
      
    }

    async function submitForm(e){
        e.preventDefault();
        const signupData= {
            username : username,
            email : email,
            password : password
        }  
        
        let apiResult = await   fetch(
              API_URL+'api/auth/register',
                {
                  method:'POST',
                  body : JSON.stringify(signupData),
                  headers : {
                    'Content-Type': 'application/json'
                  }
                }
              
              );          
          let textResult= await apiResult.text(); //not apiResult.json() because here getting just a text result.
          setFormResult(textResult); //message for display purpose only
          setShowSubStat(true); //visibility of the message div
          
          apiResult =  apiResult.status; //to get the status. 200 means success.
          console.log(apiResult);
          if(apiResult === 200){
            setFormResultColor('green');
            console.log(textResult );
            toLoginPage();
          }else{
            setFormResultColor('red');
            console.log(textResult);
          }
    }

    return (
        <div className="signup">
            <div  style={{color:formResultColor}}  className="form_title">Signup</div>
            <form onSubmit={submitForm}>
                
                {showSubStat ? <div className="form_header" style={{color:formResultColor}} >
                    {formResult}
                    
                </div> : ""
                }
                <input type="text"
                    className="input_style1" placeholder="Username"
                    onChange ={(e) =>setUser(e.target.value) }
                 />
                 <input type="text"
                    className="input_style1" placeholder="Email"
                    onChange ={(e) =>setEmail(e.target.value) }
                 />
                <input type="password" className="input_style1" placeholder="Password" 
                onChange ={(e) =>setPassword(e.target.value) }
                />
                <button className="button_style1">Register</button>
                <div className="form_footer">
                    <RouterLink to="/login">Already have an account? Log in</RouterLink>
                </div>
            </form>
        </div>
    )
}

export default Signup;