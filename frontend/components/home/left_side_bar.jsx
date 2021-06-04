import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/session_actions';

const mSTP = state =>({
    currentUser: state.session.currentUser
})

const mDTP = dispatch => ({
    logout: () => dispatch(logout())
})
class leftSideBar extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.preventDefault();
        this.props.logout();
    }

    render(){
        // const { currentUser } = this.props;
        return(
            <nav className="left-side-bar-nav">
                <div className="">
                    <h1>Dr. doctor</h1>
                </div>

                <ul className="left-side-bar-ul">
                    <li><Link to="/patients">Patient</Link></li>
                    <li><Link to="">Claim</Link></li>
                    <li><Link to="">CPT Code</Link></li>
                    <li><Link to="">ICD Code</Link></li>
                </ul>

                <div className="">
                    <button className="" onClick={this.handleClick}>logout</button>
                </div>
            </nav>
        )
    }
}

export default connect(mSTP, mDTP)(leftSideBar);