import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter} from 'react-router-dom';

const mSTP = state => ({
    loggedIn: Boolean(state.session.currentUser)
});

const Auth = ({loggedIn, path, component: Component}) => (
    <Route
        path = {path}
        render = {(props) => 
            loggedIn ? <Redirect to="/"/> : <Component {...props}/>
        }
    />
);

const Prot = ({component: Component, path, loggedIn, exact}) => (
    <Route
        path = {path}
        exact = {exact}
        render = {(props) =>
            loggedIn ? <Component {...props}/> : <Redirect to="/login" />
        }
    />
)

export const AuthRoute = withRouter(connect(mSTP)(Auth));
export const ProtRoute = withRouter(connect(mSTP)(Prot));