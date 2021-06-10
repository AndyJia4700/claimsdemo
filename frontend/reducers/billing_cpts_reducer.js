import {
    RECEIVE_ALL_BILLING_CPTS,
    RECEIVE_BILLING_CPT
} from '../actions/billing_cpt_actions';
import { merge } from 'lodash';

const BillingCptReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    switch(action.type){
        case RECEIVE_ALL_BILLING_CPTS:
            return merge({}, oldState, action.billingCpts);
        case RECEIVE_BILLING_CPT:
            if (action.billingCpt){
                return merge({}, oldState, {
                    [action.billingCpt.id]: action.billingCpt
                })
            }
        default:
            return oldState;
    }
};

export default BillingCptReducer;