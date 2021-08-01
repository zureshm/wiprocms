import { useContext} from 'react';
import LoginContext from '../main/store/login-context';

function Popup(props){

    const loginCtx = useContext(LoginContext);

     //just for shwoing popup     
     const setPopupStatus = loginCtx.setPopupStatus;   //just call setPopupstatus(true) 
     function setPopupStatusNo(){
         setPopupStatus(false);
     }

    return (
        <div className="popup_wrapper">
            <div className="dark_overlay" onClick={setPopupStatusNo}></div>
            <div className="popup_window">
                <div className="title">{props.popupTitle}</div>
                <div className='body'>{props.popupContent}</div>
                <div className="footer">
                    <div className="btns"  onClick={setPopupStatusNo}>Close</div>
                </div>
            </div>

        </div>
        
    )
}
export default Popup;