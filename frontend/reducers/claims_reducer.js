import {
    RECEIVE_ALL_CLAIMS,
    RECEIVE_CLAIM,
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
        default:
            return oldState;
    }
};

export default ClaimReducer;