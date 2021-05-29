import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../actions/session_actions';

const mSTP = ({errors}) => ({
    errors: errors,
    formType: 'Log In',
    navLink: <Link to="/signup" className="" >Sign Up</Link>
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
    }

    handleClick(e){
        e.preventDefault();
        this.setState(
            {
                email: "test@123.com",
                password: "123456"
            },
            () => this.props.login(Object.assign({}, this.state))
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
            <form className="" onSubmit={this.handleSubmit}>
                <input 
                    type="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.update("email")}
                    className=""
                />

                <input 
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.update("password")}
                    className=""
                    minLength={6}
                />
                
                <input 
                    type="submit"
                    value={this.props.formType}
                    className=""
                />

                <div className="">
                    {this.renderErrors()}
                </div>

                <div className="">
                    <p>New Here?</p>
                    <span className="">
                        {this.props.navLink}
                    </span>
                </div>

                <button className="" onClick={this.handleClick}>
                    Provider Demo User
                </button>

            </form>
        )
    }
}

export default connect(mSTP, mDTP)(LogInForm)