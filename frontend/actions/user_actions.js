import * as UserUtil from '../util/user_util';

export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";
export const RECEIVE_USER = "RECEIVE_USER";

const receiveAllUsers = users => ({
    type: RECEIVE_ALL_USERS,
    users
});

const receiveUser = user => ({
    type: RECEIVE_USER,
    user
});

export const fetchUsers = () => dispatch => (
    UserUtil.fetchUsers().then( users => dispatch(receiveAllUsers(users)))
);

export const fetchUser = userId => dispatch => (
    UserUtil.fetchUser(userId).then( user => dispatch(receiveUser(user)))
);

export const updateUser = (formData, userId) => dispatch => (
    UserUtil.updateUser(formData, userId).then(user => dispatch(receiveUser(user)))
);