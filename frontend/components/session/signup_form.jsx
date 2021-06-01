import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createNewUser } from '../../actions/session_actions';

const mSTP = ({errors}) => ({
    errors: errors,
    formType: 'Create Account',
    navLink: 'Log in'
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
        this.redirectLink = this.redirectLink.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }

    update(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.createNewUser(Object.assign({}, this.state))
            .then(()=>window.location.reload());
    }

    redirectLink(e){
        e.preventDefault();
        window.location.replace("#/login")
    }

    renderErrors(){
        return(
            <ul className="signup-login-div-errors-ul">
                {Object.values(this.props.errors)}
            </ul>
        )
    }

    render(){
        return (
            <form className="signup-login-form" onSubmit={this.handleSubmit}>
                <div className="signup-login-div-1">
                    <h1 className="signup-login-div-1-title">Create Your Account</h1>
                    <div className="signup-login-div-errors">
                        <h1>{this.renderErrors()}</h1>
                    </div>
                    <span className="signup-login-div-1-subtitle">Email address</span>
                    <input 
                        type="email"
                        placeholder="Enter email address"
                        value={this.state.email}
                        onChange={this.update("email")}
                        className="signup-login-input"
                    />

                    <span className="signup-login-div-1-subtitle">Password</span>
                    <input 
                        type="password"
                        placeholder="Enter password"
                        value={this.state.password}
                        onChange={this.update("password")}
                        className="signup-login-input"
                        minLength={6}
                    />

                    <div className="signup-login-empty-div"></div>
                    
                    <input 
                        type="submit"
                        value={this.props.formType}
                        className="signup-login-input signup-login-input-span"
                    />
                </div>

                <div className="signup-login-div-2">
                    <p className="signup-login-input-title">Have an account? Click below to login.</p>
                    <span className="signup-login-input signup-login-input-signupbutton" onClick={this.redirectLink}>
                        {this.props.navLink}
                    </span>
                </div>
            </form>
        )
    }
}

export default connect(mSTP, mDTP)(SignUpForm)