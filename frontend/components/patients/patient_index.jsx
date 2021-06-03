import React from 'react';
import { connect } from 'react-redux';
import { fetchPatients } from '../../actions/patient_actions';


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
        return patientsList.map(patient => 
            (possiblePatients[patient.name]) ?
            <li key={patient.id} className="" onClick={() => window.location.replace(`#/patients/${patient.id}`)}>
                <span className="">
                    {patient.name}
                </span>

                <span className="">
                    {patient.birthdate}
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
            <div className="">
                <input 
                    type="text"
                    placeholder="Lastname, Firstname"
                    onChange={this.update()}
                    value={this.state.search}
                />
            </div>
        )

        let searchKey = this.state.search
        const containedPatients = this.searchMultiPatient(searchKey, Object.values(this.props.patients))

        return(
            <div className="patient-index-div">
                <h1 className="patient-index-title">Patient Lists</h1>
                {patientSearch}
                <ul className="">
                    {containedPatients}
                </ul>
            </div>  
        )
    }
}

export default connect(mSTP, mDTP)(PatientIndex);
