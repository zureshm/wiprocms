import {createContext, useState,useEffect} from 'react';


/*to login from local storage*/
let initialTokenData = {};
const localStorageData = localStorage.getItem('login-data');
let tokenPresent =false;
if(localStorageData){
    initialTokenData = JSON.parse(localStorageData);
    tokenPresent =true;
}
/*to login from local storage ends*/

const LoginContext = createContext({
    loginStatus : false,
    authData : {
        email:'',
        id:'',
        roles:[],
        token:'',
        type:'',
        username: ''
    },    
    setLoginStatus : (logStat) => {}, //this is just a placeholder for getting auto complete
    setLoginDetails : (logData) => {},    
    popupStatus : false,
    setPopupStatus : (logData) => {},
    userInfo : {
        learnerId:'',
        planDto:''
    }, //already user subscribe details
    setUserInfo : (logdata) => {},
});



export function LoginContextProvicer(props){  

    const [loginStatus, setLoginStatus]=useState(tokenPresent);// loggedIn or not
    const [loginData, setLoginData]=useState(false);
    const [userInfo, setUserInfo]=useState(false);

    useEffect(function() {
        setLoginData((prevLogStat2) => {
            return prevLogStat2 = initialTokenData;
        })
    }, []);

    function statusHandler(xStat){   // xxxHandler will be called in Z1 
        //console.log("the loggein status is", xStat)    
        setLoginStatus((prevXStat) => {
            return prevXStat = xStat;
        });
        if(xStat === false){
            localStorage.removeItem("login-data");
        }
    }


    function loginHandler(logData){ 
        setLoginData((prevLogStat2) => {
            return prevLogStat2 = logData;
        })
    }

    function userInfoHandler(logData){ 
        setUserInfo((prevLogStat2) => {
            return prevLogStat2 = logData;
        })
    }

    //for popup windows
    const [popupStatus, setPopupStatus]=useState(false);

    function popupHandler(popData){
        setPopupStatus(prevPopData => {
            return prevPopData =popData;
        })
    }
    

    const context = {
        loginStatus : loginStatus,
        authData : loginData,
        setLoginStatus : statusHandler, // xxxHandler calling in Z1. Now fakeStatus will be called in component Y1
        setLoginDetails : loginHandler,
        popupStatus : popupStatus,
        setPopupStatus : popupHandler,
        userInfo:userInfo,
        setUserInfo: userInfoHandler
    };

    return(
        <LoginContext.Provider value={context}>
            {props.children}
        </LoginContext.Provider>
    ) 
}

export default LoginContext;