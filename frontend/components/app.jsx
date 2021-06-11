import React from 'react';
import { AuthRoute, ProtRoute } from '../util/route_utils';

import Modal from './modal/modal';

import PatientCreateContainer from './patients/create_patient_container';
import PatientEditContainer from './patients/edit_patient_containter';
import PatientIndex from './patients/patient_index';
import PatientShow from './patients/patient_show';

import LeftSideBar from './home/left_side_bar';
import LogInForm from '../components/session/login_form';
import SignUpForm from '../components/session/signup_form';

// import CreateClaim from './claims/claim_create';
import ClaimIndex from './claims/claim_index';

import CreateCptForm from './cpts/cpt_create_form';
import CptIndex from './cpts/cpt_index';

import CreateIcdForm from './icds/icd_create_form';
import IcdIndex from './icds/icd_index';

import CreateBillingForm from './billingCpts/create_billing_cpts_form';

class App extends React.Component{
    render(){
        return (
            <div className="main-div">
                <Modal/>
                <LeftSideBar/>
                
                <AuthRoute path="/signup" component={SignUpForm}/>
                <AuthRoute path="/login" component={LogInForm}/>                
                
                <ProtRoute exact path="/patients" component={PatientIndex}/>
                <ProtRoute exact path="/patients/new" component={PatientCreateContainer}/>
                <ProtRoute exact path="/patients/:patientId" component={PatientShow}/>
                <ProtRoute exact path="/patients/:patientId/edit" component={PatientEditContainer}/>
                {/* <ProtRoute exact path="/patients/:patientId/claims/new" component={CreateClaim}/> */}

                <ProtRoute exact path="/claims" component={ClaimIndex}/>
                
                <ProtRoute exact path="/cpts" component={CptIndex}/>
                <ProtRoute exact path="/cpts/new" component={CreateCptForm}/>

                <ProtRoute exact path="/icds" component={IcdIndex}/>
                <ProtRoute exact path="/icds/new" component={CreateIcdForm}/>

                <ProtRoute exact path="/billings/new" component={CreateBillingForm}/>

            </div>
        )
    }
}

export default App;