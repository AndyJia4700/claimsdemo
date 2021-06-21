import React from 'react';
import { connect } from 'react-redux';
import { fetchPatient, deletePatient } from '../../actions/patient_actions';
import { fetchClaims } from '../../actions/claim_actions';
import {FaEdit, FaPlus, FaQuestion} from 'react-icons/fa';
import {FcProcess, FcApproval} from 'react-icons/fc';
import PatientIndex from './patient_index';
import { openModal, closeModal } from '../../actions/modal_actions';

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
        openModal: modal => dispatch(openModal(modal)),
        closeModal: () => dispatch(closeModal()),
        fetchClaims: (patientId) => dispatch(fetchClaims(patientId)),
        fetchPatient: (patientId) => dispatch(fetchPatient(patientId)),
        deletePatient: (patientId) => dispatch(deletePatient(patientId))
    }
}

class PatientShow extends React.Component{
    constructor(props){
        super(props);
        this.changeDateFormat = this.changeDateFormat.bind(this);
    }

    componentDidMount(){
        const patientId = this.props.match.params.patientId;
        this.props.fetchPatient(patientId);
    }

    componentDidUpdate(prevProps){
        if (prevProps.patient !== this.props.patient){
            if (!this.props.patient) return null;
            const updatePatientId = this.props.patient.id;
            this.props.fetchClaims(updatePatientId);
        }
    }

    changeDateFormat(date){
        const formatDate = date.split("-");
        return formatDate[1]+ "/" + formatDate[2] + "/" + formatDate[0]
    }
    
    render(){
        if (!this.props.patient) return null;

        const {
            patient
        } = this.props;

        const claimList = Object.values(this.props.claims).map( claim => 
            claim.patient_id == this.props.patient.id ?
            // <li key={claim.id} className="patient-claim-index-ul-li" onClick={() => {window.location.replace(`#/claims/${claim.id}`)}}>
            <li key={claim.id} className="patient-claim-index-ul-li" onClick={() => {window.location.replace(`#/patients/${patient.id}/claims/${claim.id}`)}}>
                <span className="patient-claim-index-ul-li-span1">
                    {this.changeDateFormat(claim.claim_date_of_service)}
                </span>

                <span className="patient-claim-index-ul-li-span2">
                    {claim.claim_number}
                </span>

                <span className="patient-claim-index-ul-li-span3">
                    {/* {claim.message == "pending" ? <FcProcess/> : <FcApproval/>} */}
                    {!claim.billing_list[0] ? <FaQuestion/> : <FcProcess/>}
                </span>
            </li> : null
        )
        
        return(
            <div className="patients-main-div">
                <PatientIndex/>

                <div className="patient-info-div">

                    <div className="patient-show-div">
                        <div className="patient-show-div-wrap">
                            <div className="patient-show-div-sub">
                                <label className="patient-show-element-title">Member: </label>
                                <p className="patient-show-element">
                                    {patient.name}
                                </p>
                            </div>
                            
                            <div className="patient-show-div-sub">
                                <label className="patient-show-element-title">DOB: </label>
                                <p className="patient-show-element">
                                    {this.changeDateFormat(patient.birthdate)} 
                                </p>
                            </div>

                            <div className="patient-show-div-sub">
                                <label className="patient-show-element-title">Insurance: </label>
                                <p className="patient-show-element">
                                    {patient.insurance_id} 
                                </p>
                            </div>
                        </div>

                        <span className="patient-show-element-edit" onClick={()=>window.location.replace(`#/patients/${patient.id}/edit`)}>
                            <FaEdit/>
                        </span>
                    </div>

                    <div className="patient-claim-index-div">
                        
                        <div className="">
                            Claim List
                            {/* <FaPlus className="" onClick={()=>window.location.replace(`#/patients/${patient.id}/claims/new`)}/> */}
                            <FaPlus className="" onClick={()=> {this.props.openModal("createNewClaim"), console.log("open modal create claim")}}/>
                        </div>

                        <ul className="patient-claim-index-ul-category">
                            <li className="patient-claim-index-ul-li-span1">DOS</li>
                            <li className="patient-claim-index-ul-li-span2">Claim</li>
                            <li className="patient-claim-index-ul-li-span3">Status</li>
                        </ul>

                        <ul className="patient-claim-index-ul">
                            {claimList}
                        </ul>
                    </div>

                </div>
                
            </div>
        )
    }
}

export default connect(mSTP, mDTP)(PatientShow)