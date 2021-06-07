import React from 'react';
import { connect } from 'react-redux';
import { fetchClaims } from '../../actions/claim_actions';

const mSTP = state => {
    return {
        claims: state.entities.claim
    }
}

const mDTP = dispatch => {
    return {
        fetchClaims: () => dispatch(fetchClaims())
    }
}

class ClaimIndex extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchClaims();
    }

    render(){
        const claimList = Object.values(this.props.claims).map( claim =>
            <li key={claim.id} className="">
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