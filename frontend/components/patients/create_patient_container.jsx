import React from 'react';
import { connect } from 'react-redux';
import { createPatient } from '../../actions/patient_actions';
import PatientForm from './patient_form'


const mSTP = (state) => {
    // debugger;
    return {
        patient: {
            lastname: "",
            firstname:"",
            birthdate: "",
            insurance_id: "",
        },
        errors: state.errors.patientErrorsReducer,
        currentUser: state.session.currentUser,
        formType: "Save",
        title: "Create New Patient",
    }
};

const mDTP = dispatch => ({
    action: patient => dispatch(createPatient(patient)),
});

class CreatePatientForm extends React.Component{
    constructor(props){
        super(props)
    }
    
    render(){
        const {
            action, 
            errors,
            patient,
            currentUser,
            formType,
            title
        } = this.props;

        return(
            <div>
                <PatientForm
                    action={action}
                    errors={errors}
                    patient={patient}
                    currentUser={currentUser}
                    formType={formType}
                    title={title}
                />
            </div>
        )
    }
}

export default connect(mSTP, mDTP)(CreatePatientForm);