import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { logout } from '../../actions/session_actions';
import ProfileDropDown from '../users/profile_dropdown';
const mSTP = state => {
    return {
        modal: state.ui.modal
    }
};

const mDTP = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()),
        logout: () => dispatch(logout())
    }
};

function Modal({modal, closeModal}){
    let component;
    switch(modal){
        case 'profileDropDown':
            component = <ProfileDropDown closeModal={closeModal}/>
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