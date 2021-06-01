import React from 'react';

class PatientForm extends React.Component{
    constructor(props){
        super(props);
        this.state = this.props.patient;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
        // this.renderErrors = this.renderErrors.bind(this);
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
        const fullname = last + ", " + first;

        const insuranceId = this.state.insurance_id.toUpperCase();
        formData.append("patient[id]", this.state.id);
        formData.append("patient[name]", fullname);
        formData.append("patient[birthdate]", this.state.birthdate);
        formData.append("patient[insurance_id]", insuranceId);
        if (confirm("Save Changes?")){
            this.props.action(formData);
        }
    }

    renderErrors(){
    //    const errors = (
    //         <ul className="">
    //             {Object.values(this.props.errors).map(id => (
    //                 <li key={id} className="">
    //                     {this.props.errors[id]}
    //                 </li>
    //             ))}
    //         </ul>
    //     )
    //     return errors

        return(Object.values(this.props.errors))
    }

    update(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    render(){

        return(
            <form onSubmit={this.handleSubmit} className="">
                <div className="">
                    <h1 className="">Create New Patient</h1>
                </div>
                
                <input 
                    type="text" 
                    value={this.state.lastname} 
                    onChange={this.update("lastname")}
                    placeholder="Lastname"
                    className=""
                />

                <input 
                    type="text" 
                    value={this.state.firstname} 
                    onChange={this.update("firstname")}
                    placeholder="firstname"
                    className=""
                />

                <input 
                    type="date" 
                    value={this.state.birthdate} 
                    onChange={this.update("birthdate")}
                    className=""
                />

                <input 
                    type="text" 
                    value={this.state.insurance_id} 
                    onChange={this.update("insurance_id")}
                    placeholder="insurance number"
                    className=""
                />

                <button>submit</button>

                <div className="">
                    {this.renderErrors()}
                </div>

            </form>
        )
    }
}

export default PatientForm;