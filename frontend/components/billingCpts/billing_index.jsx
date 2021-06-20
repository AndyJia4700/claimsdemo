import React from 'react';
import { connect } from 'react-redux';
import { fetchBillingCpts } from '../../actions/billing_cpt_actions';

const mSTP = (state, ownprops) => {
    const claimId = ownprops.match.params.claimId;
    const claim = state.entities.claim[claimId];  
    return {
        claim,
        cpts: state.entities.cpt,
        icds: state.entities.icd,
    }
}

const mDTP = dispatch => ({
    fetchCpts: () => dispatch(fetchCpts()),
    fetchIcds: () => dispatch(fetchIcds()),
    fetchClaim: claimId => dispatch(fetchClaim(claimId)),
    fetchBilling: () => dispatch(fetchBillingCpts()),
})

class BillingIndexForm extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        
        this.props.fetchCpts();
        this.props.fetchIcds();
        this.props.fetchClaim();
        this.props.fetchBilling();
    }

    render(){
        return(
            <div>
                this is billing index
            </div>
        )
    }
}

export default connect(mSTP, mDTP)(BillingIndexForm);