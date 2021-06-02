import React from 'react';
import { connect } from 'react-redux';
import { fetchPatients } from '../../actions/patient_actions';
import PatientForm from './patient_form';

const mSTP = state => {
    // debugger;
    return {
        patients: state.entities.patient
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
        this.updateHistory = this.updateHistory.bind(this);
    }

    componentDidMount(){
        this.props.fetchPatients();
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
        // window.location.reload();
    }

    render(){
        // debugger;
        // if (!Object.values(this.props.patients)[0])return null;
        const mainSearch = (
            <div className="">
                <input 
                    type="text" 
                    id="main-search"
                    placeholder="Lastname, Firstname"
                />
                <span onClick={this.updateHistory} className="">
                    search icon
                </span>
            </div>
        )
        const {patients} = this.props;
        return(
            <div className="">
                {mainSearch}
                {/* <ul className="">
                    {patientsList}
                </ul> */}
            </div>   
        )
    }
}

export default connect(mSTP, mDTP)(PatientIndex);