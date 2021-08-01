import {BrowserRouter} from 'react-router-dom';

import './appstyles.css';
import Header  from './header/Header';
import Main  from './main/Main';

import {LoginContextProvicer} from './main/store/login-context'

function App(){
    return (
        <div className="wrapper">
            <LoginContextProvicer>
                <BrowserRouter>
                    <Header></Header>
                    <Main></Main>
                </BrowserRouter>

            </LoginContextProvicer>
            
        </div>
    )
}

export default App;