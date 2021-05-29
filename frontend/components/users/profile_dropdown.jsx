import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { closeModal } from '../../actions/modal_actions';

const mSTP = state => {
    return {
        currentUser: state.session.currentUser
    }
}

const mDTP = dispatch => ({
    logout: () => dispatch(logout()),
    closeModal: () => dispatch(closeModal()),
})

class ProfileDropDown extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.preventDefault();
        this.props.logout().then(this.props.closeModal());
        window.location.replace("/")
    }

    render(){
        // const {currentUser} = this.props
        return (
            <div className="">
                <button className="" onClick={this.handleClick}>logout</button>
            </div>
        )
    }
}

export default connect(mSTP, mDTP)(ProfileDropDown);