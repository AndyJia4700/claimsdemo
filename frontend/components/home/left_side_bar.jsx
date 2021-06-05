import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/session_actions';
import { FaStethoscope, FaFileMedical, FaBriefcaseMedical, FaUserFriends } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { MdExpandMore } from 'react-icons/md'

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
        this.props.logout().then(
            ()=> window.location.replace('#/login')
        )

    }

    render(){        
        return this.props.currentUser ? (
            <nav className="left-side-bar-nav">
                <div className="left-side-bar-nav-provider-div">
                    <div className="left-side-bar-nav-provider-div-img">
                        <img src="" alt=""/>
                    </div>
                    <span className="left-side-bar-nav-provider-title">Dr.doctor</span>
                    <MdExpandMore className="left-side-bar-nav-provider-show"/>
                </div>

                <ul className="left-side-bar-ul">
                    <Link to="/patients" className=""><li className="left-side-bar-ul-li"><FaUserFriends className="left-side-bar-ul-li-icon"/>Patient</li></Link>
                    <Link to="" className=""><li className="left-side-bar-ul-li"><FaFileMedical className="left-side-bar-ul-li-icon"/>Claim</li></Link>
                    <Link to="" className=""><li className="left-side-bar-ul-li"><FaBriefcaseMedical className="left-side-bar-ul-li-icon"/>CPT Code</li></Link>
                    <Link to="" className=""><li className="left-side-bar-ul-li"><FaStethoscope className="left-side-bar-ul-li-icon"/>ICD Code</li></Link>
                </ul>

                <div className="">
                    <button className="left-side-bar-ul-li logout-button" onClick={this.handleClick}><FiLogOut className="left-side-bar-ul-li-icon"/>Log Out</button>
                </div>
            </nav>
        ) : (
            <nav className="left-side-bar-nav">
                <img src={window.claimsdemologoURL}/>
            </nav>
        )
    }
}

export default connect(mSTP, mDTP)(leftSideBar);