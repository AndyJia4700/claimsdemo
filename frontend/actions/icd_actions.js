import * as IcdUtil from '../util/icd_util'

export const RECEIVE_ALL_ICDS = 'RECEIVE_ALL_ICDS';
export const RECEIVE_ICD = 'RECEIVE_ICD';
export const RECEIVE_ICD_ERRORS = 'RECEIVE_ICD_ERRORS'

const receiveAllIcds = icds => ({
    type: RECEIVE_ALL_ICDS,
    icds
});

const receiveIcd = icd => ({
    type: RECEIVE_ICD,
    icd
});

const receiveIcdErrors = errors => ({
    type: RECEIVE_ICD_ERRORS,
    errors
})

export const fetchIcds = () => dispatch => (
    IcdUtil.fetchIcds()
        .then(icds => dispatch(receiveAllIcds(icds)))
);

export const fetchIcd = icdId => dispatch => (
    IcdUtil.fetchIcd(icdId)
        .then(
            icd => dispatch(receiveIcd(icd))
        )
);

export const createIcd = icd => dispatch => (
    IcdUtil.createIcd(icd)
        .then(
            icd => dispatch(receiveIcd(icd)),
            error => dispatch(receiveIcdErrors(error.responseJSON))
        )
);