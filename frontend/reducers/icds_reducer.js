import {
    RECEIVE_ALL_ICDS,
    RECEIVE_ICD,
} from '../actions/icd_actions';
import { merge } from 'lodash';

const IcdReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    switch(action.type){
        case RECEIVE_ALL_ICDS:
            return merge({}, oldState, action.icds);
        case RECEIVE_ICD:
            if (action.icd){
                return merge({}, oldState, {
                    [action.icd.id]: action.icd
                })
            }
        default:
            return oldState;
    }
};

export default IcdReducer;