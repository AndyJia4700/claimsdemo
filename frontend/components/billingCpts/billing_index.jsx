import React from 'react';
import { connect } from 'react-redux';
import { fetchPatient } from '../../actions/patient_actions';
import { fetchClaim,  } from '../../actions/claim_actions';
import { fetchCpts } from '../../actions/cpt_actions';
import { fetchIcds } from '../../actions/icd_actions';
import { fetchBillingCpts, createBillingCpt, deleteBillingCpt } from '../../actions/billing_cpt_actions';
import {FaBackspace} from 'react-icons/fa';

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
    createBilling: billingCpt => dispatch(createBillingCpt(billingCpt)),
    deleteBilling: billingCptId => dispatch(deleteBillingCpt(billingCptId)),
})

class BillingIndexForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            claim_id: this.props.match.params.claimId,
            date_of_service: "",
            cpt_id: "",
            cpt_code: "",
            modifier1: "",
            modifier2: "",
            units: 1,
            icd_id1: "",
            icd_code1: "",
            icd_id2: "",
            icd_code2: "",
            icd_id3: "",
            icd_code3: "",
            icd_id4: "",
            icd_code4: "",
            amount: 0,
            unit_amount: 0,
            approved: false,
            denied: false,
            denied_reason: "",
            searchCpt: "",
            searchCptIndex: "",
            searchIcd: "",
            Icd1: "",
            Icd2: "",
            Icd3: "",
            Icd4: "",
            patientId: "",
        };

        this.addToIcdList = this.addToIcdList.bind(this);
        this.calculateAmount = this.calculateAmount.bind(this);
        this.changeDateFormat = this.changeDateFormat.bind(this);
        this.deleteIcdValue = this.deleteIcdValue.bind(this);
        this.findCode = this.findCode.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateBilling = this.updateBilling.bind(this);
        this.updateBillingCptId = this.updateBillingCptId.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
    }

    addToIcdList(id, code){
        const icd1 = document.getElementById('icd1-input');
        const icd2 = document.getElementById('icd2-input');
        const icd3 = document.getElementById('icd3-input');
        const icd4 = document.getElementById('icd4-input');
        const icdList = [icd1, icd2, icd3, icd4];
        const valueCheck = [icd1.value, icd2.value, icd3.value, icd4.value];
        if (valueCheck.includes(code)) return null;
        for (let i = 0; i < icdList.length; i++){
            if (!icdList[i].value){
                const icd_id = `icd_id${i+1}`
                const icd_code = `icd_code${i+1}`
                this.setState({
                    [icd_id]: id,
                    [icd_code]: code,
                });
                return icdList[i].value = code 
            }
        }
    }

    // convertIcdId(code){
    //     const icdList = Object.values(this.props.icds);
    //     for (let i = 0; i < icdList.length; i++){
    //         const icd = icdList[i];
    //         if (icd.icd_code == this.state.Icd1){
    //             this.state.icd_id1 = icd.id
    //         }
    //     }
    // }

    calculateAmount(cptId){
        const cptAmount = this.props.cpts[cptId].billed_amount;
        this.setState({
            amount: cptAmount,
            unit_amount: cptAmount,
        });
    }

    calculateUpdateAmount(){
        const currentUnitAmount = this.state.unit_amount;

        return e => this.setState({
            units: parseInt(e.currentTarget.value),
            amount: e.currentTarget.value ? currentUnitAmount * parseInt(e.currentTarget.value) : currentUnitAmount
        });
    }

    changeDateFormat(date){
        const formatDate = date.split("-");
        return formatDate[1]+ "/" + formatDate[2] + "/" + formatDate[0].slice(2)
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

    deleteIcdValue(i){
        const icd_id = `icd_id${i}`
        this.setState({
            [icd_id]: ""
        }); 
    }

    findCode(searchKey, codeList){
        const search = searchKey.toUpperCase();
        const AutoComplete = require('trie-autocomplete');
        const trie = new AutoComplete(); 
        const codes = Object.values(codeList);
        for (const code of codes){
            code.cpt_code ? trie.add(code.cpt_code.toString()) : trie.add(code.icd_code);
        }

        const codeResults = trie.suggest(search);
        const codeFilter = {};
        for (let i = 0; i < codeResults.length; i++){
            codeFilter[codeResults[i]] = true
        }

        return codes.map(code => 
            codeFilter[code.cpt_code] ? 
            <li key={code.id} 
                className="" 
                onClick={()=>{
                    this.setState({
                        cpt_id: code.id, 
                        cpt_code: code.cpt_code, 
                        searchCpt: code.cpt_code.toString(), 
                        units: 1
                    }), 
                    this.calculateAmount(code.id)
                }}
            > 
                {code.cpt_code}
                {code.cpt_description}
            </li> : codeFilter[code.icd_code] ?
            <li key={code.id} 
                className="" 
                onClick={() => this.addToIcdList(code.id, code.icd_code)}
            > 
                {code.icd_code}
                {code.icd_description}
            </li> : null
        )
    }


    handleSubmit(e){
        e.preventDefault();
        const cptList = Object.values(this.props.cpts);
        for (let i = 0; i < cptList.length; i++){
            const cpt = cptList[i];
            if (cpt.cpt_code == this.state.searchCpt){
                this.state.cpt_id = cpt.id;
                this.state.amount = cpt.billed_amount * this.state.units;
            }
        }
        if (!this.state.cpt_id) return null;

        const formData = new FormData();
        formData.append("billing_cpt[id]", this.state.id);
        formData.append("billing_cpt[date_of_service]", this.state.date_of_service);
        formData.append("billing_cpt[cpt_id]", this.state.cpt_id);
        this.state.cpt_id = null;
        formData.append("billing_cpt[modifier1]", this.state.modifier1);
        formData.append("billing_cpt[modifier2]", this.state.modifier2);
        formData.append("billing_cpt[units]", this.state.units);
        formData.append("billing_cpt[amount]", this.state.amount);
        this.state.amount = null;

        const icdList = Object.values(this.props.icds);
        for (let i = 0; i < icdList.length; i++){
            const icd = icdList[i];
            if (icd.icd_code == this.state.Icd1.toUpperCase()){
                this.state.icd_id1 = icd.id
            }
            if (icd.icd_code == this.state.Icd2.toUpperCase()){
                this.state.icd_id2 = icd.id
            }
            if (icd.icd_code == this.state.Icd3.toUpperCase()){
                this.state.icd_id3 = icd.id
            }
            if (icd.icd_code == this.state.Icd4.toUpperCase()){
                this.state.icd_id4 = icd.id
            }
        }

        formData.append("billing_cpt[icd_id1]", this.state.icd_id1);
        formData.append("billing_cpt[icd_id2]", this.state.icd_id2);
        formData.append("billing_cpt[icd_id3]", this.state.icd_id3);
        formData.append("billing_cpt[icd_id4]", this.state.icd_id4);
        formData.append("billing_cpt[denied_reason]", this.state.denied_reason);
        formData.append("billing_cpt[denied]", this.state.denied);
        formData.append("billing_cpt[approved]", this.state.approved);
        formData.append("billing_cpt[claim_id]", this.state.claim_id);
        
        console.log(this.state);
        this.props.createBilling(formData);
    }

    updateBilling(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    updateBillingCptId(){
        Object.values(this.props.cpts).map(cpt => 
            cpt.cpt_code.toString() == this.state.searchCpt ? this.setState({
                cpt_id: cpt.id
            }) : null
        )
    }

    updateSearch(field){
        return e => this.setState({
            [field]: e.currentTarget.value,
        });
    }

    render(){
        if (!Object.values(this.props.cpts)[0]) return null;
        if (!Object.values(this.props.icds)[0]) return null;
        if (!this.props.patient) return null;

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
                    <td className="billing-categories-table-td">{billing.approved ? "approved" : "processing"}</td>
                    <td onClick={() => this.props.deleteBilling(billing.id)}>Delete</td>
                </tr> 
            : null
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

        const claim = this.props.claim;
        const claimInfo = (
            <div>
                Date of Create: {claim.claim_date_of_service}
                Claim Number: {claim.claim_number}
            </div>
        )

        const cpt = (
            <div>
                <input 
                    className=""
                    type="text" 
                    placeholder="CPT Search"
                    onChange={this.updateSearch("searchCpt")}
                    value={this.state.searchCpt}
                />
                <span onClick={() => this.setState({searchCpt: ""})}>&times;</span>
            </div>
        )

        const cptFilter = this.findCode(this.state.searchCptIndex, this.props.cpts);


        const icd1 = (
            <div>
                <input 
                    id="icd1-input"
                    className=""
                    type="text" 
                    placeholder="ICD 1" 
                    onChange={this.updateSearch("Icd1")}
                    value={this.state.Icd1}
                />
            </div>
        )

        const icd2 = (
            <div>
                <input 
                    id="icd2-input"
                    className=""
                    type="text" 
                    placeholder="ICD 2" 
                    onChange={this.updateSearch("Icd2")}
                    value={this.state.Icd2}
                />
            </div>
        )

        const icd3 = (
            <div>
                <input 
                    id="icd3-input"
                    className=""
                    type="text" 
                    placeholder="ICD 3" 
                    onChange={this.updateSearch("Icd3")}
                    value={this.state.Icd3}
                />
            </div>
        )

        const icd4 = (
            <div>
                <input 
                    id="icd4-input"
                    className=""
                    type="text" 
                    placeholder="ICD 4" 
                    onChange={this.updateSearch("Icd4")}
                    value={this.state.Icd4}
                />
            </div>
        )

        const createBillingForm = (
            <tr className="billing-categories-table-tr-3">
                <td className="billing-categories-table-td">
                    <input 
                        className="billing-create-input"
                        type="date" 
                        onChange={this.updateBilling("date_of_service")}
                        value={this.state.date_of_service}                        
                    />
                </td>

                <td className="billing-categories-table-td">
                    {cpt}
                </td>
                        
                <td className="billing-categories-table-td">
                    <input 
                        type="text"
                        className=""
                        placeholder="Modifier 1"
                        onChange={this.updateBilling("modifier1")}
                        value={this.state.modifier1}
                    />
                </td>

                <td className="billing-categories-table-td">
                    <input 
                        type="text"
                        className=""
                        placeholder="Modifier 2"
                        onChange={this.updateBilling("modifier2")}
                        value={this.state.modifier2}
                    />
                </td>

                <td className="billing-categories-table-td">
                    <input 
                        type="number"
                        className=""
                        placeholder="unit"
                        onChange={this.calculateUpdateAmount()}
                        value={this.state.units}
                    />
                </td>

                <td className="billing-categories-table-td">{icd1}</td>
                <td className="billing-categories-table-td">{icd2}</td>
                <td className="billing-categories-table-td">{icd3}</td>
                <td className="billing-categories-table-td">{icd4}</td>
                <td className="billing-categories-table-td" onClick={this.handleSubmit}>click Submit</td>
            </tr>

        )  

        const icdFilter = this.findCode(this.state.searchIcd, this.props.icds);
        
        const icdSearch = (
            <input 
                className=""
                type="text" 
                placeholder="ICD Search"
                onChange={this.updateSearch("searchIcd")}
                value={this.state.searchIcd}
            />
        )

        const patient = this.props.patient
        const patientInfo = (
            <div>
                Name: {patient.name}
                DOB: {patient.birthdate}
                Insurance: {patient.insurance_id}
            </div>
        )
        
        const search = (
            <div>
                <div className="">
                    <input 
                        className=""
                        type="text" 
                        placeholder="CPT Search"
                        onChange={this.updateSearch("searchCptIndex")}
                        value={this.state.searchCptIndex}
                    />

                    <ul className="">
                        {cptFilter}
                    </ul>
                </div>

                <div className="">
                    {icdSearch}
                    <ul className="">
                        {icdFilter}
                    </ul>
                </div>   
            </div>
        )
        
        return(
            <div className="billing-index-main-div">
                <div className="">
                    <h1>Tool</h1>
                    {search}
                </div>

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
                        {createBillingForm}
                    </tbody>
                </table>

            </div>
        )
    }
}

export default connect(mSTP, mDTP)(BillingIndexForm);