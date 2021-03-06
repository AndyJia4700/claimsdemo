import * as ClaimUtil from '../util/claim_util'

export const RECEIVE_ALL_CLAIMS = 'RECEIVE_ALL_CLAIMS';
export const RECEIVE_CLAIM = 'RECEIVE_CLAIM';
export const RECEIVE_CLAIM_ERRORS = 'RECEIVE_CLAIM_ERRORS'

const receiveAllClaims = claims => ({
    type: RECEIVE_ALL_CLAIMS,
    claims
});

const receiveClaim = claim => ({
    type: RECEIVE_CLAIM,
    claim
});

const receiveClaimErrors = errors => ({
    type: RECEIVE_CLAIM_ERRORS,
    errors
})

export const fetchClaims = (providerId, patientId) => dispatch => (
    ClaimUtil.fetchClaims(providerId, patientId)
        .then(claims => dispatch(receiveAllClaims(claims)))
);

export const fetchClaim = claimId => dispatch => (
    ClaimUtil.fetchClaim(claimId)
        .then(
            claim => dispatch(receiveClaim(claim))
        )
);

export const createClaim = claim => dispatch => (
    ClaimUtil.createClaim(claim)
        .then(
            claim => dispatch(receiveClaim(claim)),
            error => dispatch(receiveClaimErrors(error.responseJSON))
        )
);