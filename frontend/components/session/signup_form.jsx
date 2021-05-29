import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createNewUser } from '../../actions/session_actions';

const mSTP = ({errors}) => ({
    errors: errors,
    formType: 'Create Account',
    navLink: <Link to="/login" className="" >Log in</Link>
});

const mDTP = dispatch => {
    return {
        createNewUser: formUser => dispatch(createNewUser(formUser))
    }
};

class SignUpForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
    }

    update(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.createNewUser(Object.assign({}, this.state))
    }

    render(){
        return (
            <form className="" onSubmit={this.handleSubmit}>
                <p>hello</p>
            </form>
        )
    }
}

export default connect(mSTP, mDTP)(SignUpForm)