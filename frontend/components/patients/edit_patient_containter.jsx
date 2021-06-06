import React from 'react';
import { connect } from 'react-redux';
import { updatePatient, fetchPatient } from '../../actions/patient_actions';
import PatientForm from './patient_form';
 

const mSTP = (state, ownProps) => {
    const patientId = ownProps.match.params.patientId;
    const patient = state.entities.patient[patientId];
    if (patient){
        const name = patient.name.split(', ')
        return {
            patient: {
                id: patient.id,
                lastname: name[0],
                firstname: name[1],
                birthdate: patient.birthdate,
                insurance_id: patient.insurance_id
            },
            currentUser: state.session.currentUser,
            errors: state.errors.patientErrorsReducer,
            formType: "Save",
            title: "Patient Information",
        }
    } else {
        return {
            patient
        }
    }
}

const mDTP = dispatch => {
    return {
        fetchPatient: patientId => dispatch(fetchPatient(patientId)),
        action: (formData, patientId) => dispatch(updatePatient(formData, patientId))
    }
}

class EditPatientForm extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        const patientId = this.props.match.params.patientId;
        this.props.fetchPatient(patientId);
    }

    render(){
        if (!this.props.patient) return null;
        const {
            action, 
            errors,
            patient,
            currentUser,
            formType,
            title
        } = this.props;

        return(
            <div className="">
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

export default connect(mSTP, mDTP)(EditPatientForm)