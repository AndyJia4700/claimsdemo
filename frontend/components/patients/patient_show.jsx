import React from 'react';
import { connect } from 'react-redux';
import { fetchPatient, deletePatient, fetchPatients} from '../../actions/patient_actions';
import PatientIndex from './patient_index';

const mSTP = (state, ownProps) => {
    const patientId = ownProps.match.params.patientId;
    const patient = state.entities.patient[patientId];
    return {
        patient,
        currentUser: state.session.currentUser,
        patients: state.entities.patient
    }
}

const mDTP = dispatch => {
    return {
        fetchPatients: () => dispatch(fetchPatients()),
        fetchPatient: (patientId) => dispatch(fetchPatient(patientId)),
        deletePatient: (patientId) => dispatch(deletePatient(patientId))
    }
}

class PatientShow extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchPatients();
        const patientId = this.props.match.params.patientId;
        this.props.fetchPatient(patientId)
    }
    
    render(){
        // debugger;
        if (!this.props.patient) return null;
        const {patient} = this.props;
        return(
            <div className="">
                <PatientIndex/>

                <h1>=====================================</h1>
                <div>
                    <p>this is patient show</p>
                    {patient.name}
                    {patient.birthdate}
                    {patient.insuranceId}
                </div>
                
            </div>
        )
    }
}

export default connect(mSTP, mDTP)(PatientShow)