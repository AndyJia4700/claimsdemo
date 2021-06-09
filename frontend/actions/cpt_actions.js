import * as CptUtil from '../util/cpt_util'

export const RECEIVE_ALL_CPTS = 'RECEIVE_ALL_CPTS';
export const RECEIVE_CPT = 'RECEIVE_CPT';
export const RECEIVE_CPT_ERRORS = 'RECEIVE_CPT_ERRORS'

const receiveAllCpts = cpts => ({
    type: RECEIVE_ALL_CPTS,
    cpts
});

const receiveCpt = cpt => ({
    type: RECEIVE_CPT,
    cpt
});

const receiveCptErrors = errors => ({
    type: RECEIVE_CPT_ERRORS,
    errors
})

export const fetchCpts = () => dispatch => {
    return CptUtil.fetchCpts()
        .then(cpts => dispatch(receiveAllCpts(cpts)))
};

export const fetchCpt = cptId => dispatch => (
    CptUtil.fetchCpt(cptId)
        .then(
            cpt => dispatch(receiveCpt(cpt))
        )
);

export const createCpt = cpt => dispatch => (
    CptUtil.createCpt(cpt)
        .then(
            cpt => dispatch(receiveCpt(cpt)),
            error => dispatch(receiveCptErrors(error.responseJSON))
        )
);