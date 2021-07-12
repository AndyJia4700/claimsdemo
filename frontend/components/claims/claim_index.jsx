import React from 'react';
import { connect } from 'react-redux';
import { fetchClaims } from '../../actions/claim_actions';

const mSTP = (state) => {
    return {
        claims: state.entities.claim,
        currentUser: state.session.currentUser,
    }
}

const mDTP = dispatch => {
    return {
        fetchClaims: (providerId, patientId) => dispatch(fetchClaims(providerId, patientId))
    }
}

class ClaimIndex extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchClaims(this.props.currentUser.id, null);
    }

    render(){
        const claimList = Object.values(this.props.claims).map( claim =>
            <li 
                key={claim.id} 
                className="" 
                onClick={()=>window.location.replace(`#/patients/${claim.patient_id}/claims/${claim.id}`)}
            >
                {claim.patient_id}
                {claim.claim_date_of_service}
                {claim.claim_number}
                {claim.message}
            </li>
        )

        return(
            <ul className="">
                {claimList}
            </ul>
        )
    }
} 

export default connect(mSTP, mDTP)(ClaimIndex)