import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    let preloadedState = undefined;
    let store;
    if (window.currentUser){
        preloadedState = {
            entities: {
                user: {[window.currentUser.id]: window.currentUser},
            },
            session: {
                currentUser: window.currentUser
            }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore(preloadedState);
    }

    ReactDOM.render(<Root store={store}/>, root);
});