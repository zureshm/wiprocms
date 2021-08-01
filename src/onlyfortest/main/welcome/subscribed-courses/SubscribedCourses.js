import {useState, useEffect} from 'react';

import Course from './course/Course';

let courseDataStructure={
    userId:'',
    learnerId:'',
    contents:[]
};



function SubscribedCourses(props){ 

    const [curseData, setCourseData] = useState(courseDataStructure);
    
    function retrieveData(){
        fetch(
            props.API_URL+'api/content/retrieve/'+props.userId,
            {
                method:'GET',
                headers : {
                    'Authorization': 'Bearer '+props.API_TOKEN
                }
            }
            ).then(data =>  { 
               return data.json();
            })
             .then(data => {   
                setCourseData(data);             
            });

    }

    useEffect(retrieveData,[props.API_URL,props.userId,props.API_TOKEN]);


    
    
    
    const [detailsVisibility, setDetailsVisibility] = useState('');
    function expandDetails(childId){  //getting CHILD ID from click on the child.     
        setDetailsVisibility(childId); //CHILD ID to compare with child's props.id to make that particular child visible
    }

    return(
        <div className="course_wrapper">
            { curseData.contents.length >= 1 ?
                curseData.contents.map( data => {
                    return  (
                        <Course key={data.id} id={data.id} 
                        courseTitle={data.title} 
                        expandThis={expandDetails} 
                        expandId={detailsVisibility}>
                            {data.data}
                        </Course>
                    )
                }) : <p>No courses subscribed!</p>
            }
        </div>
    )
}
export default SubscribedCourses;