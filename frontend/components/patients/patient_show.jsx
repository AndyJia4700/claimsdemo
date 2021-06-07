import React from 'react';
import { connect } from 'react-redux';
import { fetchPatient, deletePatient } from '../../actions/patient_actions';
import PatientIndex from './patient_index';
import ClaimIndex from '../claims/claim_index';

const mSTP = (state, ownProps) => {
    const patientId = ownProps.match.params.patientId;
    const patient = state.entities.patient[patientId];
    return {
        patient,
        currentUser: state.session.currentUser,
    }
}

const mDTP = dispatch => {
    return {
        fetchPatient: (patientId) => dispatch(fetchPatient(patientId)),
        deletePatient: (patientId) => dispatch(deletePatient(patientId))
    }
}

class PatientShow extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        // this.props.fetchPatients();
        const patientId = this.props.match.params.patientId;
        this.props.fetchPatient(patientId)
    }
    
    render(){
        if (!this.props.patient) return null;

        const {
            patient
        } = this.props;

        return(
            <div className="patients-main-div">
                <PatientIndex/>

                <div className="patient-show-div">
                    <p>this is patient show</p>
                    {patient.name}
                    {patient.birthdate}
                    {patient.insuranceId}
                    <span className="" onClick={()=>window.location.replace(`#/patients/${patient.id}/edit`)}>Edit</span>
                </div>

                <ClaimIndex/>
                
            </div>
        )
    }
}

export default connect(mSTP, mDTP)(PatientShow)