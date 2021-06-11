import {
    RECEIVE_ALL_BILLING_ICDS,
    RECEIVE_BILLING_ICD
} from '../actions/billing_icd_actions';
import { merge } from 'lodash';

const BillingIcdReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    switch(action.type){
        case RECEIVE_ALL_BILLING_ICDS:
            return merge({}, oldState, action.billingIcds);
        case RECEIVE_BILLING_ICD:
            if (action.billingIcd){
                return merge({}, oldState, {
                    [action.billingIcd.id]: action.billingIcd
                })
            }
        default:
            return oldState;
    }
};

export default BillingIcdReducer;