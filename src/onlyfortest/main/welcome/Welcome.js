import {useState, useEffect, useContext} from 'react';
import { useHistory} from 'react-router-dom';
import LoginContext from '../store/login-context';
import '../main.css';
import SubscribePlan from './subscribe-plan/SubscribePlan';
import Plan from './plan/Plan';
import SubscribedCourses from './subscribed-courses/SubscribedCourses'
import CourseList from './course-list/CourseList';


function Welcome(){
    const loginCtx = useContext(LoginContext);
    const authData = loginCtx.authData;
    const setLoginStatus = loginCtx.setLoginStatus; 
    const history = useHistory();
    const API_URL = process.env.REACT_APP_API_URL;
    const API_TOKEN = authData.token; 
    

    //Plans data
    const [plansData, setPlansData] = useState("");


    let userInfoObj= {   //just to remember the structure and....     
        learnerId:null,
        planDto: {
            name: null,
            numberofcourses: null,
            planId: null,
            price: null,
            userid: null,
        }
    }
    //new or old user - different resposne
    const [userInfo, setUserInfo] = useState(userInfoObj); //only for this component. For other Context will be used
    const [subscribedUser, setSubscribedUser] = useState(false); //whether subscribed user or not

    //for plan SUBSCRIBE form
    const [planVisibility, setPlanVisibility] = useState(false);
    const [currentPlan, setCurrentPlan] = useState({});
    
    function showPlan(e){ // to show hide the PLAN SUBSCRIBE FORM and .....        
        setPlanVisibility(true);        
        const selectedPlan = plansData.filter(x => x.id===e); //filtering from the plans object array         
        setCurrentPlan(selectedPlan[0]); //single object, but is still in an array
    }

     

    function getUserType(){ //SUBSCRIBED user not
        if(!API_TOKEN){
            console.log("local storage token and GetUserType....")
        }else{
            const userLearnerId = userInfo.learnerId;
            if(userLearnerId === null ){
                setSubscribedUser(false);
                console.log("this is a new user")
            }else{
                setSubscribedUser(true);
                console.log("this is an old user");

                
                
            }
        }
    }

    useEffect(getUserType, [userInfo.learnerId,API_URL,API_TOKEN]);
    
    //for checking new user or old user
    function getUserInfo(){
        if(!API_TOKEN){
            console.log("getting token from local storage for USERINFO....")
        }else {
         fetch(
            API_URL+'api/user/'+authData.id,
              {
                method:'GET',
                headers : {
                  'Authorization': 'Bearer '+API_TOKEN
                }
              }
            
            ).then(data => {
                let status= data.status;
                if(status !==200){                    
                    setLoginStatus(false);                   
                    history.push("/login");
                    console.log("Please login again")
                    
                }
              return  data.json()
            }) 
            .then(data => {
                console.log(data);
                setUserInfo(data);                
            });
        }            
    }
    useEffect(getUserInfo, [API_URL,API_TOKEN, authData.id,history,setLoginStatus]);

    //for getting plans
    function getPlans(){    
           if(!API_TOKEN){
               console.log("getting token from local storage for PLANS....")
           }else{

            fetch(
                API_URL+'api/admin/getPlans',
                {
                    method:'GET',
                    headers : {
                        'Authorization': 'Bearer '+API_TOKEN
                    }
                }
                ).then(data =>  { 
                   return data.json();
                })
                 .then(data => {                    
                    
                    setPlansData(data);
                });
           }
        
    }    
    useEffect(getPlans, [API_URL,API_TOKEN]);

    return (
        !subscribedUser ? <>
        
        <div className="welcome_cover">
            <div className="left">
                <h1 className="welcome_txt">Welcome {authData.username} <span className="emo">:)</span></h1> 
                <h3>Please choose a plan from below and subscribe</h3>
            </div>
            <div className="left"></div>
        </div>
        
        
        <hr className="seperator"/>
        <div  className="plans_wrapper">
        {plansData.length > 0 ?         
        plansData.map((plans) => {
            return (                
                <Plan key={plans.id}
                    planId={plans.id}
                    planName={plans.name}
                    planPrice ={plans.price}
                    planNumberofcourses = {plans.numberofcourses}
                    showSubscribe = {showPlan} //will be fired from Plan component
                />                
            )
        })
         : <p>Fetching plans......</p>}
        </div>

        {
            planVisibility &&  <SubscribePlan plan={currentPlan}></SubscribePlan>        
        }
        </>
        
        :

        <>
        
        <div className="welcome_cover">
            <div className="left">
                <h1 className="welcome_txt">Hi {authData.username} <span className="emo">:)</span></h1> 
                <h3>Welcome back! Enjoy your learning!!!</h3>
            </div>
            <div className="right">
                <h3>{userInfo.planDto.name} Plan - {userInfo.planDto.numberofcourses}  Courses</h3>
                <h3>Currently Subscribed Courses - X</h3>
            </div>
        </div>
        
        <hr className="seperator"/>
        <div  className="plans_wrapper">
            <SubscribedCourses userId={authData.id} API_TOKEN={API_TOKEN} API_URL={API_URL} />
        </div>
        <hr className="seperator"/>
        <CourseList allowedCount={2} learnerId={userInfo.learnerId} />
        
        </>
        
    )
}

export default Welcome;