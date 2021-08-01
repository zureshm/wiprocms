import {useState, useContext} from 'react';

import LoginContext from '../../store/login-context';
import Popup from '../../../popup/Popup';


function SubscribePlan(props){

    const loginCtx = useContext(LoginContext);
    const authData = loginCtx.authData;

     

    const API_URL = process.env.REACT_APP_API_URL;
    const API_TOKEN = authData.token; 

    //this for getting form data
    const [username, setUser] = useState(authData.username);    
    const [email, setEmail] = useState(authData.email);
    const [phone, setPhone] = useState('');
    const [cardno, setCardno] = useState('');
    const [cvv, setCvv] = useState('');
    const [expirydate, setExpirydate] = useState('');
    const [amount, setAmount] = useState('');



    //just for shwoing popup
    const popupStatus = loginCtx.popupStatus; //current status of popup
    const setPopupStatus = loginCtx.setPopupStatus;   //just call setPopupstatus(true) 
    const [popupContent, setPopupContent] = useState('');
    
    

    //submitting form
    async function submitForm(e){        
        e.preventDefault();
        const subscribeData = {
            username : username,
            email : email,
            phone : phone,
            cardno : cardno,
            cvv : cvv,
            expirydate:expirydate,
            amount:amount
        }
       let subscribeDataPlus = {
            "userid": authData.id,
            "learnerid": "",
            "plan": {
                "planId": props.plan.id,
                "name":  props.plan.name,
                "price":  props.plan.price
            },
            "payment": subscribeData
        }

        let apiResult = await   fetch(
            API_URL+'api/content/subscribe-plan',
              {
                method:'POST',
                body : JSON.stringify(subscribeDataPlus),
                headers : {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer '+API_TOKEN
                }
              }
            
            ); 
        let textResult= await apiResult.text();  
        console.log(textResult);
        
        apiResult =  apiResult.status; 
        console.log("Service response: ",apiResult);
        
        if(apiResult ===200){ //show popup when 200, and the content
            setPopupContent(textResult);
            setPopupStatus(true);
        }
    }
    return(
        <>
            {popupStatus && <Popup
             popupTitle="Plan Subscribed" 
             popupContent={popupContent}
             />}
            <div className="subscribe_form">

            <form onSubmit={submitForm}>
                
                <input type="text" disabled
                    className="input_style1" placeholder="Username"
                    onChange ={(e) =>setUser(e.target.value) } value={username}
                 />
                 
                <input type="email" className="input_style1" placeholder="Email" 
                onChange ={(e) =>setEmail(e.target.value) } value={email} required
                />
                <input type="text" className="input_style1" placeholder="Phone" 
                onChange ={(e) =>setPhone(e.target.value) } required
                />
                <input type="text" className="input_style1" placeholder="16 Digit Card Number" 
                onChange ={(e) =>setCardno(e.target.value) } maxLength="16" required
                />
                <input type="text" className="input_style1" placeholder="CVV" 
                onChange ={(e) =>setCvv(e.target.value) } maxLength ="3" minLength="3" required
                />
                <input type="text" className="input_style1" placeholder="Expiry Date in MM/YY format" 
                onChange ={(e) =>setExpirydate(e.target.value) } pattern="(?:0[1-9]|1[0-2])/[0-9]{2}"
                title="MM/YY format only" required 
                />
                <input type="text" disabled className="input_style1" placeholder="Amount" 
                onChange ={(e) =>setAmount(e.target.value) }  value={props.plan.price}
                />

                
                <button className="button_style1">Subscribe for {props.plan.name} Plan</button>

                
            </form>

            </div>

        </>
    )
}

export default SubscribePlan;