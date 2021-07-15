import * as BillingCptUtil from '../util/billing_cpt_util';

export const RECEIVE_ALL_BILLING_CPTS = 'RECEIVE_ALL_BILLING_CPTS';
export const RECEIVE_BILLING_CPT = 'RECEIVE_BILLING_CPT';
export const RECEIVE_BILLING_CPT_ERRORS = 'RECEIVE_BILLING_CPT_ERRORS';
export const REMOVE_BILLING = 'REMOVE_BILLING';

const receiveAllBillingCpts = billingCpts => ({
    type: RECEIVE_ALL_BILLING_CPTS,
    billingCpts
});

const receiveBillingCpt = billingCpt => ({
    type: RECEIVE_BILLING_CPT,
    billingCpt
});

const receiveBillingCptErrors = errors => ({
    type: RECEIVE_BILLING_CPT_ERRORS,
    errors
});

const removeBilling = billingCptId => ({
    type: REMOVE_BILLING,
    billingCptId
});

export const fetchBillingCpts = (claimId) => dispatch => {
    return BillingCptUtil.fetchBillingCpts(claimId)
        .then(billingCpts => dispatch(receiveAllBillingCpts(billingCpts)))
};

export const fetchBillingCpt = billingCptId => dispatch => (
    BillingCptUtil.fetchBillingCpt(billingCptId)
        .then(
            billingCpt => dispatch(receiveBillingCpt(billingCpt))
        )
);

export const createBillingCpt = billingCpt => dispatch => (
    BillingCptUtil.createBillingCpt(billingCpt)
        .then(
            billingCpt => dispatch(receiveBillingCpt(billingCpt)),
            error => dispatch(receiveBillingCptErrors(error.responseJSON))
        )
);

export const deleteBillingCpt = billingCptId => dispatch => (
    BillingCptUtil.deleteBillingCpt(billingCptId)
        .then(()=>dispatch(removeBilling(billingCptId)))
)

