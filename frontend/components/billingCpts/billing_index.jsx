import React from 'react';
import { connect } from 'react-redux';
import { fetchPatient } from '../../actions/patient_actions';
import { fetchClaim } from '../../actions/claim_actions';
import { fetchCpts } from '../../actions/cpt_actions';
import { fetchIcds } from '../../actions/icd_actions';
import { fetchBillingCpts } from '../../actions/billing_cpt_actions';
import {FaBackspace} from 'react-icons/fa'

const mSTP = (state, ownprops) => {
    const patientId = ownprops.match.params.patientId;
    const patient = state.entities.patient[patientId];
    const claimId = ownprops.match.params.claimId;
    const claim = state.entities.claim[claimId];
    const billings = state.entities.billingCpt;

    return {
        claim,
        patient,
        cpts: state.entities.cpt,
        icds: state.entities.icd,
        billings,
    }
}

const mDTP = dispatch => ({
    fetchPatient: (patientId) => dispatch(fetchPatient(patientId)),
    fetchClaim: claimId => dispatch(fetchClaim(claimId)),
    fetchCpts: () => dispatch(fetchCpts()),
    fetchIcds: () => dispatch(fetchIcds()),
    fetchBilling: claimId => dispatch(fetchBillingCpts(claimId)),
})

class BillingIndexForm extends React.Component{
    constructor(props){
        super(props)
        this.changeDateFormat = this.changeDateFormat.bind(this);
    }

    componentDidMount(){
        const patientId = this.props.match.params.patientId;
        this.props.fetchPatient(patientId);
        const claimId = this.props.match.params.claimId;
        this.props.fetchClaim(claimId);
        this.props.fetchCpts();
        this.props.fetchIcds();
        this.props.fetchBilling(claimId);
    }

    // componentDidUpdate(prevProps){
    //     if (prevProps.billings !== this.props.billings){
    //         const claimId = this.props.match.params.claimId;
    //         this.props.fetchBilling(claimId);
    //     }
    // }

    changeDateFormat(date){
        const formatDate = date.split("-");
        return formatDate[1]+ "/" + formatDate[2] + "/" + formatDate[0].slice(2)
    }

    render(){
        if (!Object.values(this.props.cpts)[0]) return null;
        if (!Object.values(this.props.icds)[0]) return null;
        if (!this.props.patient) return null;

        const patient = this.props.patient
        const patientInfo = (
            <div>
                Name: {patient.name}
                DOB: {patient.birthdate}
                Insurance: {patient.insurance_id}
            </div>
        )
        
        const claim = this.props.claim;
        const claimInfo = (
            <div>
                Date of Create: {claim.claim_date_of_service}
                Claim Number: {claim.claim_number}
            </div>
        )

        const categories = (
            <tr className="billing-categories-table-tr-1"> 
                <th className="billing-categories-table-th">DOS</th>
                <th className="billing-categories-table-th">CPT</th>
                <th className="billing-categories-table-th">M1</th>
                <th className="billing-categories-table-th">M2</th>
                <th className="billing-categories-table-th">Unit</th>
                <th className="billing-categories-table-th">ICD 1</th>
                <th className="billing-categories-table-th">ICD 2</th>
                <th className="billing-categories-table-th">ICD 3</th>
                <th className="billing-categories-table-th">ICD 4</th>
                <th className="billing-categories-table-th">Amount</th>
                <th className="billing-categories-table-th">Status</th>
            </tr>
        )

        const billingList = Object.values(this.props.billings).map( billing =>
            billing.claim_id == this.props.match.params.claimId ?
                <tr key={billing.id} className="billing-categories-table-tr-2">
                    <td className="billing-categories-table-td">{this.changeDateFormat(billing.date_of_service)}</td>
                    <td className="billing-categories-table-td">{this.props.cpts[billing.cpt_id].cpt_code}</td>
                    <td className="billing-categories-table-td">{billing.modifier1}</td>
                    <td className="billing-categories-table-td">{billing.modifier2}</td>
                    <td className="billing-categories-table-td">{billing.units}</td>
                    <td className="billing-categories-table-td">{this.props.icds[billing.icd_id1].icd_code}</td>
                    <td className="billing-categories-table-td">{billing.icd_id2 ? this.props.icds[billing.icd_id2].icd_code : ""}</td>
                    <td className="billing-categories-table-td">{billing.icd_id3 ? this.props.icds[billing.icd_id3].icd_code : ""}</td>
                    <td className="billing-categories-table-td">{billing.icd_id4 ? this.props.icds[billing.icd_id4].icd_code : ""}</td>
                    <td className="billing-categories-table-td">{billing.amount}</td>
                </tr> 
            : null
        )
        
        return(
            <div className="billing-index-main-div">
                <div className="">
                    <FaBackspace onClick={() => {window.location.replace(`#/patients/${this.props.match.params.patientId}`)}}/>
                    <h1>claim detail</h1>
                </div>

                <div className="">
                    {patientInfo}
                </div>

                <div className="">
                    {claimInfo}
                </div>

                <table className="billing-categories-table" >
                    <tbody>
                        {categories}
                        {billingList}
                    </tbody>
                </table>

            </div>
        )
    }
}

export default connect(mSTP, mDTP)(BillingIndexForm);