// import React from 'react';
// import { connect } from 'react-redux';
// import { createBillingCpt } from '../../actions/billing_cpt_actions';
// import { fetchCpts } from '../../actions/cpt_actions';
// import { fetchIcds } from '../../actions/icd_actions';
// import { fetchClaim } from '../../actions/claim_actions';

// const mSTP = (state, ownprops) => {
    
//     const claimId = ownprops.match.params.claimId;
//     const claim = state.entities.claim[claimId];
//     return {
//         claim,
//         cpts: state.entities.cpt,
//         icds: state.entities.icd,
//     }
// }

// const mDTP = dispatch => ({
//     fetchCpts: () => dispatch(fetchCpts()),
//     fetchIcds: () => dispatch(fetchIcds()),
//     createBilling: billingCpt => dispatch(createBillingCpt(billingCpt)),
//     fetchClaim: claimId => dispatch(fetchClaim(claimId)),
// })

// class BillingCreateForm extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             claim_id: this.props.match.params.claimId,
//             date_of_service: "",
//             cpt_id: "",
//             cpt_code: "",
//             modifier1: "",
//             modifier2: "",
//             units: 1,
//             icd_id1: "",
//             icd_code1: "",
//             icd_id2: "",
//             icd_code2: "",
//             icd_id3: "",
//             icd_code3: "",
//             icd_id4: "",
//             icd_code4: "",
//             amount: 0,
//             unit_amount: 0,
//             approved: false,
//             denied: false,
//             denied_reason: "",
//             searchCpt: "",
//             searchIcd: "",
//         };

//         this.addToIcdList = this.addToIcdList.bind(this);
//         this.calculateAmount = this.calculateAmount.bind(this);
//         this.changeDateFormat = this.changeDateFormat.bind(this);
//         this.deleteIcdValue = this.deleteIcdValue.bind(this);
//         this.findCode = this.findCode.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.updateBilling = this.updateBilling.bind(this);
//         this.updateSearch = this.updateSearch.bind(this);
//     }

//     addToIcdList(id, code){
//         const icd1 = document.getElementById('icd1-input');
//         const icd2 = document.getElementById('icd2-input');
//         const icd3 = document.getElementById('icd3-input');
//         const icd4 = document.getElementById('icd4-input');
//         const icdList = [icd1, icd2, icd3, icd4];
//         const valueCheck = [icd1.value, icd2.value, icd3.value, icd4.value];
//         if (valueCheck.includes(code)) return null;
//         for (let i = 0; i < icdList.length; i++){
//             if (!icdList[i].value){
//                 const icd_id = `icd_id${i+1}`
//                 const icd_code = `icd_code${i+1}`
//                 this.setState({
//                     [icd_id]: id,
//                     [icd_code]: code,
//                 });
//                 return icdList[i].value = code 
//             }
//         }
//     }

//     calculateAmount(cptId){
//         const cptAmount = this.props.cpts[cptId].billed_amount;
//         this.setState({
//             amount: cptAmount,
//             unit_amount: cptAmount,
//         });
//     }

//     calculateUpdateAmount(){
//         const currentUnitAmount = this.state.unit_amount;

//         return e => this.setState({
//             units: parseInt(e.currentTarget.value),
//             amount: e.currentTarget.value ? currentUnitAmount * parseInt(e.currentTarget.value) : currentUnitAmount
//         });
//     }

//     changeDateFormat(date){
//         const formatDate = date.split("-");
//         return formatDate[1]+ "/" + formatDate[2] + "/" + formatDate[0].slice(2)
//     }

//     componentDidMount(){
//         const claimId = this.props.match.params.claimId;
//         this.props.fetchClaim(claimId);
//         this.props.fetchCpts();
//         this.props.fetchIcds();
//     }

//     deleteIcdValue(i){
//         const icd_id = `icd_id${i}`
//         this.setState({
//             [icd_id]: ""
//         }); 
//     }

//     findCode(searchKey, codeList){
//         const search = searchKey.toUpperCase();
//         const AutoComplete = require('trie-autocomplete');
//         const trie = new AutoComplete(); 
//         const codes = Object.values(codeList);
//         for (const code of codes){
//             code.cpt_code ? trie.add(code.cpt_code.toString()) : trie.add(code.icd_code);
//         }

//         const codeResults = trie.suggest(search);
//         const codeFilter = {};
//         for (let i = 0; i < codeResults.length; i++){
//             codeFilter[codeResults[i]] = true
//         }

//         return codes.map(code => 
//             codeFilter[code.cpt_code] ? 
//             <li key={code.id} className="" onClick={()=>{this.setState({cpt_id: code.id, cpt_code: code.cpt_code, units: 1}), this.calculateAmount(code.id)}}> 
//                 {code.cpt_code}
//                 {/* {code.cpt_description} */}
//             </li> : codeFilter[code.icd_code] ?
//             <li key={code.id} className="" onClick={() => this.addToIcdList(code.id, code.icd_code)}> 
//                 {code.icd_code}
//                 {/* {code.icd_description} */}
//             </li> : null
//         )
//     }


//     handleSubmit(e){
//         e.preventDefault();
//         console.log(this.state);
//         const formData = new FormData();
//         formData.append("billing_cpt[id]", this.state.id);
//         formData.append("billing_cpt[date_of_service]", this.state.date_of_service);
//         formData.append("billing_cpt[cpt_id]", this.state.cpt_id);
//         formData.append("billing_cpt[modifier1]", this.state.modifier1);
//         formData.append("billing_cpt[modifier2]", this.state.modifier2);
//         formData.append("billing_cpt[units]", this.state.units);
//         formData.append("billing_cpt[amount]", this.state.amount);
//         formData.append("billing_cpt[icd_id1]", this.state.icd_id1);
//         formData.append("billing_cpt[icd_id2]", this.state.icd_id2);
//         formData.append("billing_cpt[icd_id3]", this.state.icd_id3);
//         formData.append("billing_cpt[icd_id4]", this.state.icd_id4);
//         formData.append("billing_cpt[denied_reason]", this.state.denied_reason);
//         formData.append("billing_cpt[denied]", this.state.denied);
//         formData.append("billing_cpt[approved]", this.state.approved);
//         formData.append("billing_cpt[claim_id]", this.state.claim_id);
        
//         this.props.createBilling(formData);
//     }

//     updateBilling(field){
//         return e => this.setState({
//             [field]: e.currentTarget.value
//         });
//     }

//     updateSearch(field){
//         return e => this.setState({
//             [field]: e.currentTarget.value,
//         });
//     }

//     render(){
//         const cptSearch = (
//             <input 
//                 className=""
//                 type="text" 
//                 placeholder="CPT Search"
//                 onChange={this.updateSearch("searchCpt")}
//                 value={this.state.searchCpt}
//             />
//         )
//         const cptFilter = this.findCode(this.state.searchCpt, this.props.cpts);

//         const icdSearch = (
//             <input 
//                 className=""
//                 type="text" 
//                 placeholder="ICD Search"
//                 onChange={this.updateSearch("searchIcd")}
//                 value={this.state.searchIcd}
//             />
//         )
//         const icdFilter = this.findCode(this.state.searchIcd, this.props.icds);


//         const tempIcd = (
//             <div>
//                 <div>
//                     <input type="text" id="icd1-input" placeholder="ICD 1" readOnly/>
//                     <span onClick={()=>{document.getElementById("icd1-input").value=null, this.deleteIcdValue(1)}}>&times;</span>
//                 </div>

//                 <div>
//                     <input type="text" id="icd2-input" placeholder="ICD 2" readOnly/>
//                     <span onClick={()=>{document.getElementById("icd2-input").value=null, this.deleteIcdValue(2)}}>&times;</span>
//                 </div>

//                 <div>
//                     <input type="text" id="icd3-input" placeholder="ICD 3" readOnly/>
//                     <span onClick={()=>{document.getElementById("icd3-input").value=null, this.deleteIcdValue(3)}}>&times;</span>
//                 </div>

//                 <div>
//                     <input type="text" id="icd4-input" placeholder="ICD 4" readOnly/>
//                     <span onClick={()=>{document.getElementById("icd4-input").value=null, this.deleteIcdValue(4)}}>&times;</span>
//                 </div>
//             </div>
//         )

//         const cpt = (
//             <div>
//                 <input 
//                     type="text" 
//                     id="cpt-input" 
//                     placeholder="CPT CODE" 
//                     value={this.state.cpt_code} 
//                     onChange={this.updateBilling("cpt_code")}
//                     readOnly
//                 />
//                 <span onClick={() => document.getElementById('cpt-input').value=null}>&times;</span>
//             </div>
//         )

//         return(
//             <form onSubmit={this.handleSubmit} className="">
//                 <div className="">
//                     <label className="">Date of Service: </label>
//                     <input 
//                         className=""
//                         type="date" 
//                         onChange={this.updateBilling("date_of_service")}
//                         value={this.state.date_of_service}                        
//                     />
//                 </div>

//                 <div className="">
//                     <label className="">ICD Code: </label>
//                     {tempIcd}
//                     {icdSearch}
//                     <ul className="">
//                         {icdFilter}
//                     </ul>
//                 </div>

//                 <div className="">
//                     <label className="">CPT Code: </label>
//                     {cpt}
//                     {cptSearch}
//                     <ul className="">
//                         {cptFilter}
//                     </ul>
//                 </div>

//                 <div>
//                     <input 
//                         type="text"
//                         className=""
//                         placeholder="Modifier 1"
//                         onChange={this.updateBilling("modifier1")}
//                         value={this.state.modifier1}
//                     />
//                     <input 
//                         type="text"
//                         className=""
//                         placeholder="Modifier 2"
//                         onChange={this.updateBilling("modifier2")}
//                         value={this.state.modifier2}
//                     />

//                     <input 
//                         type="number"
//                         className=""
//                         placeholder="unit"
//                         onChange={this.calculateUpdateAmount()}
//                         value={this.state.units}
//                     />
//                 </div>

            

//                 <button>Submit</button>
//             </form>
//         )
//     }
// }

// export default connect(mSTP, mDTP)(BillingCreateForm);