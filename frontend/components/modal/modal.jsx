import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import PatientShow from '../patients/patient_show';
import { createClaim } from '../../actions/claim_actions';

const mSTP = state => {
    return {
        modal: state.ui.modal
    }
};

const mDTP = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()),
        createClaim: claim => dispatch(createClaim(claim))
    }
};

function Modal({modal, closeModal}){
    let component;
    switch(modal){
        case 'createClaim':
            component = <PatientShow closeModal={closeModal}/>
            break;
        default:
            return null;
    }

    return(
        <div className="" onClick={closeModal}>
            <div className="" onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    )
}

export default connect(mSTP, mDTP)(Modal)