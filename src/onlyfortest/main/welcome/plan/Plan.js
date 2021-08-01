function Plan(props){  
    return (
        <div  className="plans_box">
            <div className="title">
                {props.planName}
            </div>
            <div className="body">
                <p>Price : {props.planPrice}</p>
                <hr></hr>
                <p>Number of Course : {props.planNumberofcourses}</p>
            </div>
            <div className="footer">
                <input type="radio" name="subscribe_radio" onClick={() => {
                    console.log(props.planId)
                    props.showSubscribe(props.planId);
                }} />
            </div>
       </div>   
    )
}

export default Plan;