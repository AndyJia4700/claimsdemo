import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';

const mSTP = state => ({
    currentUser: state.session.currentUser
});

const mDTP = dispatch => ({
    openModal: modal => dispatch(openModal(modal))
});

const sessionShow = ({ currentUser, openModal}) => {
    const sessionLinks = () => (
        <Link to="/login">Please Sign in</Link>
    )
    const greeting = () => (
        <a onClick={() => openModal('profileDropDown')}>
            hello
        </a>
    )
    return currentUser ? greeting() : sessionLinks();
}

export default connect(mSTP, mDTP)(sessionShow);