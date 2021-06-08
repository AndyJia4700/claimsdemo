import {
    RECEIVE_ALL_CPTS,
    RECEIVE_CPT,
} from '../actions/cpt_actions';
import { merge } from 'lodash';

const CptReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    switch(action.type){
        case RECEIVE_ALL_CPTS:
            return merge({}, oldState, action.cpts);
        case RECEIVE_CPT:
            if (action.cpt){
                return merge({}, oldState, {
                    [action.cpt.id]: action.cpt
                })
            }
        default:
            return oldState;
    }
};

export default CptReducer;