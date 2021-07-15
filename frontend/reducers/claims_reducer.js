import {
    RECEIVE_ALL_CLAIMS,
    RECEIVE_CLAIM,
    REMOVE_CLAIM,
} from '../actions/claim_actions';
import { merge } from 'lodash';

const ClaimReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    switch(action.type){
        case RECEIVE_ALL_CLAIMS:
            return merge({}, oldState, action.claims);
        case RECEIVE_CLAIM:
            if (action.claim){
                return merge({}, oldState, {
                    [action.claim.id]: action.claim
                })
            }
        case REMOVE_CLAIM:
            let nextState = Object.assign({}, oldState);
            delete nextState[action.claimId];
            return nextState;
        default:
            return oldState;
    }
};

export default ClaimReducer;