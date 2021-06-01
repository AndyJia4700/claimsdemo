import React from 'react';

class PatientForm extends React.Component{
    constructor(props){
        super(props);
        this.state = this.props.patient;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount(){
        this.setState({
            user_id: this.props.currentUser.id,
        })
    }

    handleSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append("patient[id]", this.state.id);
        formData.append("patient[name]", this.state.name);
        formData.append("patient[birthdate]", this.state.birthdate);
        formData.append("patient[insurance_id]", this.state.insurance_id);
        if (confirm("Save Changes?")){
            this.props.action(formData);
        }
    }

    update(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    render(){
        return(
            <div>
                This is patient create form
            </div>
        )
    }
}

export default PatientForm;