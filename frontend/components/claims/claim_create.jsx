import React from 'react';
import { connect } from 'react-redux';
import { createClaim } from '../../actions/claim_actions';
import { closeModal } from '../../actions/modal_actions';

const mSTP = (state, ownProps) => {

    const patientId = ownProps.patientId;
    const patient = state.entities.patient[patientId];
    return {
        claim: {
            provider_id: state.session.currentUser.id,
            patient_id: "",
            claim_date_of_service: "",
            claim_number: "",
            message: "",
            total_amount: ""
        },
        patient,
    }
}

const mDTP = dispatch => ({
    createClaim: claim => dispatch(createClaim(claim)),
    closeModal: () => dispatch(closeModal()),
})

class CreateClaim extends React.Component{
    constructor(props){
        super(props);
        this.state = this.props.claim;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount(){
        this.setState({
            claim_number: Date.now,
            patient_id: this.props.patientId,
            message: "pending",
        });
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.createClaim(this.state).then(()=>this.props.closeModal())
    }

    update(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    render(){

        return(
            <form onSubmit={this.handleSubmit} className="claim-create-form">
                <div className="">
                    <div className="">
                        <h1>
                            {this.props.patient.name}
                        </h1>
                    </div>
                    <label className="">Date of Service: </label>
                    <input 
                        type="date"
                        value={this.state.claim_date_of_service}
                        onChange={this.update("claim_date_of_service")}
                        className=""
                    />
                </div>

                <button>Submit</button>
            </form>
        )
    }
}

export default connect(mSTP, mDTP)(CreateClaim);