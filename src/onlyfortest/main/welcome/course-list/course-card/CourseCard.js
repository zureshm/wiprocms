import {useState} from 'react';

function CourseCard(props){

    
    
    const [yes, setYes] = useState(false); //yes = checked state
    function lol(event){
        if(props.selectedCount < props.allowedCount){
            if(!yes){
                setYes(true);
                props.selectMe(props.courseId)
            }
        }else{
            if(!yes){                
                event.preventDefault();
                alert(`only ${props.allowedCount} courses are allowed `);                
            }
        }        
        if(yes){
            setYes(false);
            props.removeMe(props.courseId)
        }
        
        
        
    } 
    

    return(
        <div className="course_card">
            <input type="checkbox"  onClick={lol}   />        
            <h3>{props.courseTitle}</h3>
            <p>{props.data}</p>
            
        </div>
    )
}

export default CourseCard;