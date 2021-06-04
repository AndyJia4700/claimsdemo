import React from 'react';
import { AuthRoute, ProtRoute } from '../util/route_utils';
import { Route } from "react-router-dom";

import Modal from './modal/modal';

import PatientCreateContainer from './patients/create_patient_container';
import PatientEditContainer from './patients/edit_patient_containter';
import PatientIndex from './patients/patient_index';
import PatientShow from './patients/patient_show';

import LogInForm from '../components/session/login_form';
import SignUpForm from '../components/session/signup_form';
import SessionShow from './home/session_show';
import LeftSideBar from './home/left_side_bar';

class App extends React.Component{
    render(){
        const nav = (
            <nav className="nav-top">
                <div className="nav-top-div">
                    <button><h1>Claims Demo</h1></button>
                </div>

                <div className="nav-top-div">
                    <button><SessionShow/></button>
                </div>
            </nav>
        )
        
        return (
            <div className="main-div">
                {/* {nav} */}
                <Modal/>
                <LeftSideBar/>
                <AuthRoute path="/signup" component={SignUpForm}/>
                <AuthRoute path="/login" component={LogInForm}/>                
                
                <ProtRoute exact path="/patients/new" component={PatientCreateContainer}/>
                <ProtRoute exact path="/patients/:patientId" component={PatientShow}/>
                <ProtRoute exact path="/patients/:patientId/edit" component={PatientEditContainer}/>
                <ProtRoute exact path="/patients" component={PatientIndex}/>
            </div>
        )
    }
}

export default App;