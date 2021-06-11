import React from 'react';
import { connect } from 'react-redux';
import { createBillingCpt } from '../../actions/billing_cpt_actions';
import { fetchCpts } from '../../actions/cpt_actions';
import { fetchIcds } from '../../actions/icd_actions';

const mSTP = (state) => {
    return {
        cpts: state.entities.cpt,
        icds: state.entities.icd,
    }
}

const mDTP = dispatch => ({
    fetchCpts: () => dispatch(fetchCpts()),
    fetchIcds: () => dispatch(fetchIcds()),
    createBillingCpt: billingCpt => dispatch(createBillingCpt(billingCpt))
})

class BillingCptCreateForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            billingCpt: {
                claim_id: "",
                date_of_service: "",
                cpt_id: "",
                modifier1: "",
                modifier2: "",
                units: "",
                icd_id1: null,
                icd_id2: null,
                icd_id3: null,
                icd_id4: null,
                amount: 0,
                approved: false,
                denied: false,
                denied_reason: "",
            },
            searchCpt: "",
            searchIcd: "",
        };
        this.changeDateFormat = this.changeDateFormat.bind(this);
        this.findCode = this.findCode.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateBilling = this.updateBilling.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
    }

    changeDateFormat(date){
        const formatDate = date.split("-");
        return formatDate[1]+ "/" + formatDate[2] + "/" + formatDate[0].slice(2)
    }

    componentDidMount(){
        this.props.fetchCpts();
        this.props.fetchIcds();
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
            <li key={code.id} className=""> 
                {code.cpt_code}
            </li> : codeFilter[code.icd_code] ?
            <li key={code.id} className=""> 
                {code.icd_code}
            </li> : null
        )
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.createCpt(this.state);
    }

    updateBilling(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    updateSearch(field){
        return e => this.setState({
            [field]: e.currentTarget.value,
        });
    }

    render(){

        //claim_id: "",
        // date_of_service: "",
        // cpt_id: "",
        // modifier1: "",
        // modifier2: "",
        // units: "",
        // icd_id1: null,
        // icd_id2: null,
        // icd_id3: null,
        // icd_id4: null,
        // amount: 0,
        // approved: false,
        // denied: false,
        // denied_reason: "",

        const cptSearch = (
            <input 
                className=""
                type="text" 
                placeholder="CPT Code"
                onChange={this.updateSearch("searchCpt")}
                value={this.state.searchCpt}
            />
        )
        const cptFilter = this.findCode(this.state.searchCpt, this.props.cpts);

        const icdSearch = (
            <input 
                className=""
                type="text" 
                placeholder="ICD Code"
                onChange={this.updateSearch("searchIcd")}
                value={this.state.searchIcd}
            />
        )
        const icdFilter = this.findCode(this.state.searchIcd, this.props.icds);

        return(
            <form onSubmit={this.handleSubmit} className="">
                <div className="">
                    <label className="">ICD Code: </label>
                    {icdSearch}
                    <ul className="">
                        {icdFilter}
                    </ul>
                </div>
                <br />
                <div className="">
                    <label className="">CPT Code: </label>
                    {cptSearch}
                    <ul className="">
                        {cptFilter}
                    </ul>
                </div>


                <button>Submit</button>
            </form>
        )
    }
}

export default connect(mSTP, mDTP)(BillingCptCreateForm);