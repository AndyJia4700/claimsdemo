import * as BillingIcdUtil from '../util/billing_icd_util'

export const RECEIVE_ALL_BILLING_ICDS = 'RECEIVE_ALL_BILLING_ICDS';
export const RECEIVE_BILLING_ICD = 'RECEIVE_BILLING_ICD';
export const RECEIVE_BILLING_ICD_ERRORS = 'RECEIVE_BILLING_ICD_ERRORS'

const receiveAllBillingIcds = billingIcds => ({
    type: RECEIVE_ALL_BILLING_ICDS,
    billingIcds
});

const receiveBillingIcd = billingIcd => ({
    type: RECEIVE_BILLING_ICD,
    billingIcd
});

const receiveBillingIcdErrors = errors => ({
    type: RECEIVE_BILLING_ICD_ERRORS,
    errors
})

export const fetchBillingIcds = () => dispatch => {
    return BillingIcdUtil.fetchBillingIcds()
        .then(billingIcds => dispatch(receiveAllBillingIcds(billingIcds)))
};

export const fetchBillingIcd = billingIcdId => dispatch => (
    BillingIcdUtil.fetchBillingIcd(billingIcdId)
        .then(
            billingIcd => dispatch(receiveBillingIcd(billingIcd))
        )
);

export const createBillingIcd = billingIcd => dispatch => (
    BillingIcdUtil.createBillingIcd(billingIcd)
        .then(
            billingIcd => dispatch(receiveBillingIcd(billingIcd)),
            error => dispatch(receiveBillingIcdErrors(error.responseJSON))
        )
);