// All codes are mergered to patient_show.jsx

// import React from 'react';
// import { connect } from 'react-redux';
// import { fetchClaims } from '../../actions/claim_actions';

// const mSTP = (state) => {
//     return {
//         claims: state.entities.claim,
//     }
// }

// const mDTP = dispatch => {
//     return {
//         fetchClaims: (patientId) => dispatch(fetchClaims(patientId))
//     }
// }

// class ClaimIndex extends React.Component{
//     constructor(props){
//         super(props);
//     }

//     componentDidMount(){
//         debugger
//         // const patientId = this.ownProps.match.params.patientId;
//         this.props.fetchClaims(6);
//     }

//     render(){
//         const claimList = Object.values(this.props.claims).map( claim =>
//             <li key={claim.id} className="">
//                 {claim.patient_id}
//                 {claim.claim_date_of_service}
//                 {claim.claim_number}
//                 {claim.message}
//             </li>
//         )

//         return(
//             <ul className="">
//                 {claimList}
//             </ul>
//         )
//     }
// } 

// export default connect(mSTP, mDTP)(ClaimIndex)