import React from 'react';
import { connect } from 'react-redux';
import { fetchPatients } from '../../actions/patient_actions';
import { FaSearch, FaPlus } from 'react-icons/fa';

const mSTP = state => {
    return {
        patients: state.entities.patient,
    }
}

const mDTP = dispatch => {
    return {
        fetchPatients: () => dispatch(fetchPatients())
    }
}

class PatientIndex extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            search: ""
        }
        this.update = this.update.bind(this);
        this.getLocalStorage = this.getLocalStorage.bind(this);
        this.searchMultiPatient = this.searchMultiPatient.bind(this);
        this.changeDateFormat = this.changeDateFormat.bind(this);
    }
    
    changeDateFormat(date){
        const formatDate = date.split("-");
        return formatDate[1]+ "/" + formatDate[2] + "/" + formatDate[0].slice(2)
    }
    
    componentDidMount(){
        this.props.fetchPatients();
        this.getLocalStorage();
    }

    getLocalStorage(){
        const localData = localStorage.getItem("search")
        return localData ?
            this.setState({
                search: localData
            }) :
        ""
    }

    searchMultiPatient(searchKey, patientsList){
        const AutoComplete = require('trie-autocomplete');
        const trie = new AutoComplete(); 
        for (const patient of patientsList){
            trie.add(patient.name);
        }

        const search = searchKey.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ")
        const possiblePatients = {};
        const results = trie.suggest(search);
        for (let i = 0; i< results.length; i++){
            possiblePatients[results[i]] = true
        }

        // const dateFormat = require("dateformat");        
        return patientsList.map(patient => 
            (possiblePatients[patient.name]) ?
            <li key={patient.id} className="patient-index-ul-li" onClick={() => {window.location.replace(`#/patients/${patient.id}`)}}>
                <span className="patient-index-ul-li-span-1">
                    {patient.name}
                </span>
                <span className="patient-index-ul-li-span-2">
                    {/* {dateFormat(patient.birthdate, 'mm/dd/yy')} */}
                    {this.changeDateFormat(patient.birthdate)}
                </span>
            </li> : null 
        )
    }

    update(){
        return e => {
            this.setState({
                search: e.currentTarget.value
            }),
            localStorage.setItem(
                "search", e.currentTarget.value
            )
        }
    }

    
    render(){   
        const patientSearch = (
            <input 
                className="patient-index-search-input"
                type="text"
                placeholder="Lastname, Firstname"
                onChange={this.update()}
                value={this.state.search}
            />
        )

        let searchKey = this.state.search
        const containedPatients = this.searchMultiPatient(searchKey, Object.values(this.props.patients))

        return(
            <div className="patient-index-div">
                <div className="patient-index-title">
                    <h1 className="">Patient Lists</h1>
                    <FaPlus className="patient-index-create-icon" onClick={()=>window.location.replace('#/patients/new')}/>
                </div>

                <div className="patient-index-div-search">
                    <FaSearch/>
                    {patientSearch}
                </div>

                <ul className="patient-index-ul">
                    {containedPatients}
                </ul>
            </div>
        )
    }
}

export default connect(mSTP, mDTP)(PatientIndex);
