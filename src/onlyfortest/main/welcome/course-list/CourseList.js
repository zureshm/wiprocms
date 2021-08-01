import {useState, useEffect, useContext} from 'react';
import LoginContext from '../../store/login-context';
import CourseCard from './course-card/CourseCard';


let selectedCourses = []; //to avoid reload when rerendering

function CourseList(props){
    const loginCtx = useContext(LoginContext);
    const authData = loginCtx.authData;
    const API_URL = process.env.REACT_APP_API_URL;
    const API_TOKEN = authData.token; 

    let courseObj=[{
        creatorId:'0',
        data:'-',
        title:'No courses found',
        id:'0'
    }];
    

    
    const[apiResponse,setApiResponse] = useState("");// TEMPERORY fix because currently no ERROR from API
    const[courseList,setCourseList] = useState(courseObj);

    //getting all course contents
    function getAllContents(){
        fetch(
            API_URL+'api/admin/contents',
            {
                method:'GET',
                headers : {
                'Authorization': 'Bearer '+API_TOKEN
                }
            }
        )
        .then(apiResult => {
            setApiResponse(apiResult.status);//TEMPERORY for ERROR
            return apiResult.json();
        })
        .then(data => {            
            if (apiResponse === 200){//TEMPERORY for ERROR
                setCourseList(data);
            }            
        });

    }
    
    useEffect(getAllContents, [API_URL,API_TOKEN, apiResponse]);  
    
    
    const[selectedCount, setSelectedCount]=useState(0);//courses to subscribe array
    const[courseSelected, setCourseSelected]=useState([]);//courses to subscribe array
    function selectCourse(id){          
        selectedCourses.push(id);//adding course id       
        setCourseSelected(selectedCourses);//adding to state
          
        setSelectedCount(selectedCourses.length)
        console.log("coursesSelected", courseSelected);
        //console.log("selectedCount", selectedCount);
         
    }

    function removeCourse(id){  
        const index = selectedCourses.indexOf(id);        
        selectedCourses.splice(index, 1);//removing rgar course id
        setCourseSelected(selectedCourses);//adding to state 

        setSelectedCount(selectedCourses.length)
        console.log("coursesSelected", courseSelected);
        //console.log("selectedCount", selectedCount);           
    }

    
    
    async function subscribeCourses (){
        if(selectedCount <= 0){
            alert("Selet atleast one course, then submit");
            return;
        }
        const dataForSubscription={
            userid: authData.id,
            learnerid: props.learnerId,
            contentid: courseSelected
        }
        let apiResult = await fetch(
                API_URL+'api/content/subscribe-contents',
                {
                    method:'POST',
                    body : JSON.stringify(dataForSubscription),
                    headers : {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+API_TOKEN
                    }
                }
            )
            let textResult= await apiResult.text();  
            console.log(textResult);
        // console.log("courseSelected : ", courseSelected);
        // console.log("learner id : ", props.learnerId);
        // console.log("user id : ", authData.id);
    }

    return(
        <>
        <div className="all_courses_title">
            <h3>Other Courses for Learning (Remaining {props.allowedCount} Courses)</h3>
        </div>
        <div className="all_courses_container">
            {
                courseList.map(course => {
                   return (
                    <CourseCard 
                    key={course.id}  
                    courseId={course.id} 
                    courseTitle={course.title} 
                    data={course.data} 
                    selectMe={selectCourse} 
                    removeMe = {removeCourse}
                    allowedCount = {props.allowedCount}
                    selectedCount = {selectedCount}
                    />
                   )
                })
            }
            
        </div>
        <div className="all_courses_footer">
            <div className="cell">
                <div className="btns" onClick={subscribeCourses}>Submit</div>
            </div>
            <div className="cell">
                <div className="btns">Plan Upgrade</div>
            </div>
        </div>
        </>
    )
}

export default CourseList;