import React from 'react';
import { connect } from 'react-dom';
import { fetchPatient, deletePatient} from '../../actions/patient_actions';

const mSTP = (state, ownProps) => {
    const patientId = ownProps.match.params.patientId;
    const patient = state.entities.patients[patientId];
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
        const patientId = this.props.match.params.patientId;
        this.props.fetchPatient(patientId)
    }
    
    render(){
        const {patient} = this.props;
        return(
            <div className="">
                {patient.name}
            </div>
        )
    }
}