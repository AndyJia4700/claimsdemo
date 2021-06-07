import React from 'react';
import { connect } from 'react-redux';
import { createClaim, fetchClaims } from '../../actions/claim_actions';

const mSTP = (state, ownProps) => {
    const patientId = ownProps.match.params.patientId;
    const patient = state.entities.patient[patientId];
    return {
        claim: {
            patient_id: "",
            claim_date_of_service: "",
            claim_number: "",
            message: "",
        },
        patient
    }
}

const mDTP = dispatch => ({
    // fetchClaims: () => dispatch(fetchClaims()),
    createClaim: claim => dispatch(createClaim(claim))
})

class CreateClaim extends React.Component{
    constructor(props){
        super(props);
        this.state = this.props.claim;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount(){
        // this.props.fetchClaims();
        this.setState({
            patient_id: this.props.match.params.patientId
        });
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.createClaim(this.state);
    }

    update(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit} className="">
                <div className="">
                    <label className="">Date of Service: </label>
                    <input 
                        type="date"
                        value={this.state.claim_date_of_service}
                        onChange={this.update("claim_date_of_service")}
                        className=""
                    />
                </div>
                
                <div className="">
                    <label className="">Claim Number: </label>
                    <input 
                        type="text"
                        value={this.state.claim_number}
                        onChange={this.update("claim_number")}
                        className=""
                    />
                </div>
                
                <div className="">
                    <label className="">Status: </label>
                    <input 
                        type="text"
                        value={this.state.message}
                        onChange={this.update("message")}
                        className=""
                    />
                </div>

                <button>Submit</button>
            </form>
        )
    }
}

export default connect(mSTP, mDTP)(CreateClaim);