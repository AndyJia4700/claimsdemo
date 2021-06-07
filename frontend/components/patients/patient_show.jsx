import React from 'react';
import { connect } from 'react-redux';
import { fetchPatient, deletePatient } from '../../actions/patient_actions';
import { fetchClaims } from '../../actions/claim_actions';

import PatientIndex from './patient_index';

const mSTP = (state, ownProps) => {
    const patientId = ownProps.match.params.patientId;
    const patient = state.entities.patient[patientId];
    return {
        patient,
        claims: state.entities.claim,
        currentUser: state.session.currentUser,
    }
}

const mDTP = dispatch => {
    return {
        fetchClaims: (patientId) => dispatch(fetchClaims(patientId)),
        fetchPatient: (patientId) => dispatch(fetchPatient(patientId)),
        deletePatient: (patientId) => dispatch(deletePatient(patientId))
    }
}

class PatientShow extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const patientId = this.props.match.params.patientId;
        this.props.fetchPatient(patientId);
    }

    componentDidUpdate(prevProps){
        if (prevProps.patient !== this.props.patient){
            const updatePatientId = this.props.patient.id;
            this.props.fetchClaims(updatePatientId);
        }
    }
    
    render(){
        if (!this.props.patient) return null;

        const {
            patient
        } = this.props;

        const claimList = Object.values(this.props.claims).map( claim => 
            claim.patient_id == this.props.patient.id ?
            <li key={claim.id} className="">
                {claim.patient_id}
                {claim.claim_date_of_service}
                {claim.claim_number}
                {claim.message}
            </li> : null
        )
        
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

                <ul className="">
                    {claimList}
                </ul>
                
            </div>
        )
    }
}

export default connect(mSTP, mDTP)(PatientShow)