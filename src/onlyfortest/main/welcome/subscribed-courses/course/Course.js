
function Course(props){     
    
    const defaultClass="course_details"; //this is the default class for the ACCODIAN  from css  
    const dynamicClass = "course_details show";  //this is the EXPAND classes from css  
    function clicked(){  
            
        props.expandThis(props.id); //PROP.ID will be used in parent to check which child is clicked
    }    

    return(
        <div className="course_block">
            <div className="course_title" onClick={clicked}>
             {props.courseTitle}
            </div>
            <div className={props.id === props.expandId  ? dynamicClass : defaultClass}>
                <div className="contents">{props.children} </div>
            </div>
        </div>
    )
}

export default Course;