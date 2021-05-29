import { fromPairs } from 'lodash';
import React from 'react';
import { AuthRoute, ProtRoute } from '../util/route_utils';
import { Route } from "react-router-dom";

import LogInForm from '../components/session/login_form';
import Modal from './modal/modal';
import SessionShow from './home/session_show';
import SignUpForm from '../components/session/signup_form';

class App extends React.Component{
    render(){
        
        return (
            <div>
                <p>This is main page</p>
                <Modal/>
                <SessionShow/>
                <Route exact path="/"/>
                <AuthRoute path="/signup" component={SignUpForm}/>
                <AuthRoute path="/login" component={LogInForm}/>
            </div>
        )
    }
}

export default App;