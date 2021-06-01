import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../actions/session_actions';

const mSTP = ({errors}) => ({
    errors: errors,
    formType: 'Log In',
    navLink: <Link to="/signup" className="" >Create an account</Link>
});

const mDTP = dispatch => {
    return {
        login: formUser => dispatch(login(formUser))
    }
};

class LogInForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.update = this.update.bind(this);
        this.renderErrors = this.renderErrors.bind(this)
    }

    update(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.login(Object.assign({}, this.state))
            .then(()=>window.location.reload());
    }

    handleClick(e){
        e.preventDefault();
        this.setState(
            {
                email: "test@123.com",
                password: "123456"
            },
            // () => this.props.login(Object.assign({}, this.state))
        );
    }

    renderErrors(){
        return(
            <ul>
                {Object.values(this.props.errors)}
            </ul>
        )
    }

    render(){
        return (
            <form className="signup-login-form" onSubmit={this.handleSubmit}>
                <div className="signup-login-div-1">
                    <h1 className="signup-login-div-1-title">Provider Login</h1>
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


                    <div className="signup-login-empty-div"></div>
                    

                    <button className="signup-login-input signup-login-input-span" onClick={this.handleClick}>
                        Provider Demo User
                    </button>
                </div>

                <div className="signup-login-div-2">
                    {/* <div className=""> */}
                        <p className="signup-login-input-title">New member? Create your account.</p>
                        <span className="signup-login-input signup-login-input-signupbutton">
                            {this.props.navLink}
                        </span>
                    {/* </div> */}
                </div>

            </form>
        )
    }
}

export default connect(mSTP, mDTP)(LogInForm)