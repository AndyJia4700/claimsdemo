import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import ClaimCreate from '../claims/claim_create';

const mSTP = (state) => {
    return {
        modal: state.ui.modal,
        patients: state.entities.patient,
    }
};

const mDTP = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()),
    }
};

function Modal({modal, closeModal, patients}){
    const currentId = window.location.href.split("/").slice(-1).pop();
    const patientId = patients[currentId] ? currentId : null;

    let component;
    switch(modal){
        case 'createNewClaim':
            component = <ClaimCreate patientId={patientId} closeModal={closeModal}/>
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

// class Modal extends React.Component{
//     constructor(props){
//         super(props)
//     }

//     render(){
//         let component;
//         switch(this.props.modal){
//             case 'createNewClaim':
//                 component = <ClaimCreate/>
//                 break;
//             default:
//                 return null;
//         }

//         return(
//             <div className="" onClick={this.props.closeModal()}>
//                 <div className="" onClick={e => e.stopPropagation()}>
//                     {component}
//                 </div>
//             </div>
//         )
//     }
// }

export default connect(mSTP, mDTP)(Modal)