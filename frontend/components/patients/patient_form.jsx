import React from 'react';
import PatientIndex from './patient_index';
class PatientForm extends React.Component{
    constructor(props){
        super(props);
        this.state = this.props.patient;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    componentDidMount(){
        this.setState({
            user_id: this.props.currentUser.id,
        })
    }

    handleSubmit(e){
        e.preventDefault();
        const formData = new FormData();

        const last = this.state.lastname.charAt(0).toUpperCase() + this.state.lastname.slice(1).toLowerCase()
        const first = this.state.firstname.charAt(0).toUpperCase() + this.state.firstname.slice(1).toLowerCase()
        const fullname = (last == "" || first == "") ? null : last + ", " + first;
        if (fullname) formData.append("patient[name]", fullname);
        
        const insuranceId = this.state.insurance_id.toUpperCase();
        
        formData.append("patient[id]", this.state.id);
        formData.append("patient[birthdate]", this.state.birthdate);
        formData.append("patient[insurance_id]", insuranceId);
        if (confirm("Save?")){
            if (!this.state.id){
                this.props.action(formData);
                if (confirm("Information has been saved!")){
                    setInterval(window.location.replace('#/patients'), 3000);
                }
            } else {
                this.props.action(formData, this.state.id)
                if (confirm("Changes has been saved!")){
                    setInterval(window.location.replace('#/patients'), 3000);
                }
            }
            
        }
    }

    redirect(){
        if (this.state) {
            window.location.replace(`#/patients/${this.state.id}`);
        } else {
            window.location.replace(`#/patients`);
        }
    }

    renderErrors(){
        return(
            <ul className="">
                {
                    Object.values(this.props.errors).map((id) =>
                        <li key={id} className="">{id}</li>
                    )
                }
            </ul>
        )
    }

    update(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    render(){
        return(
            <div className="patients-main-div">
                <PatientIndex/>
                <form onSubmit={this.handleSubmit} className="patient-create-edit-form">
                    <div className="patient-create-edit-form-div">
                        <h1 className="">{this.props.title}</h1>
                    
                        <ul className="patient-create-edit-form-ul">
                            <li className="patient-create-edit-form-li">
                                <span className="patient-create-edit-form-li-span">Last Name:</span>
                                <input 
                                    type="text" 
                                    value={this.state.lastname} 
                                    onChange={this.update("lastname")}
                                    placeholder="Lastname"
                                    className="patient-create-edit-form-input"
                                /> 
                            </li>

                            <li className="patient-create-edit-form-li">
                                <span className="patient-create-edit-form-li-span">First Name:</span>
                                <input 
                                    type="text" 
                                    value={this.state.firstname} 
                                    onChange={this.update("firstname")}
                                    placeholder="firstname"
                                    className="patient-create-edit-form-input"
                                />
                            </li>

                            <li className="patient-create-edit-form-li">
                                <span className="patient-create-edit-form-li-span">DOB:</span>
                                <input 
                                    type="date" 
                                    value={this.state.birthdate} 
                                    onChange={this.update("birthdate")}
                                    className="patient-create-edit-form-input"
                                />
                            </li>

                            <li className="patient-create-edit-form-li">
                                <span className="patient-create-edit-form-li-span">Insurance Id:</span>
                                <input 
                                    type="text" 
                                    value={this.state.insurance_id} 
                                    onChange={this.update("insurance_id")}
                                    placeholder="insurance number"
                                    className="patient-create-edit-form-input"
                                />
                            </li>

                        </ul>
                    

                        <button onClick={this.redirect}>submit</button>

                        <div className="">
                            {this.renderErrors()}
                        </div>
                    </div>

                </form>
            </div>
        )
    }
}

export default PatientForm;