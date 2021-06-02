import React from 'react';
import { connect } from 'react-redux';
import { fetchPatients } from '../../actions/patient_actions';
import PatientForm from './patient_form';


const mSTP = state => {
    return {
        patients: state.entities.patient
    }
}

const mDTP = dispatch => {
    // debugger;
    return {
        fetchPatients: () => dispatch(fetchPatients())
    }
}

class Trie {
    constructor(){
        this.root = {};
        this.endSymbol = '*';
    }

    insert(string){
        let current = this.root;
        for (let i = 0; i < string.length; i++){
            if (!(string[i] in current)){
                current[string[i]] = {};
            }
            current = current[string[i]]
        }
        current[this.endSymbol] = string;
    }
}

class PatientIndex extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            search: ""
        }
        this.update = this.update.bind(this);
        this.updateHistory = this.updateHistory.bind(this);
        this.searchMultiPatient = this.searchMultiPatient.bind(this);
    }

    componentDidMount(){
        this.props.fetchPatients();
    }

    searchMultiPatient(searchKey, patientsList){
        const AutoComplete = require('trie-autocomplete');
        const trie = new AutoComplete(); 
        for (const patient of patientsList){
            trie.add(patient.name);
        }
        const possiblePatients = {};
        const results = trie.suggest(searchKey);
        for (let i = 0; i< results.length; i++){
            possiblePatients[results[i]] = true
        }
        return patientsList.map(patient => 
            (possiblePatients[patient.name]) ?
            <li key={patient.id} className="" onClick={() => console.log(`"selected"+${patient.id}`)}>{patient.name}</li> : null 
        )
    }

    update(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    updateHistory(){
        let changes = document.getElementById("main-search") ? document.getElementById("main-search") : "";
        this.props.history.push({
            search: `?${changes}`
        });
    }
    
    render(){   

        const patientSearch = (
            <div className="">
                <input 
                    type="text"
                    placeholder="Lastname, Firstname"
                    onChange={this.update("search")}
                />
            </div>
        )

        let searchKey = this.state.search
        const containedPatients = this.searchMultiPatient(searchKey, Object.values(this.props.patients))
        return(
            <div className="">
                {patientSearch}
                <ul className="">
                    {containedPatients}
                </ul>
            </div>   
        )
    }
}

export default connect(mSTP, mDTP)(PatientIndex);
