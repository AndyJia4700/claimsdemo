export const fetchClaims = () => (
    $.ajax({
        url: "/api/claims"
    })
)

export const fetchClaim = claimId => {    
    return $.ajax({
        url: `/api/claims/${claimId}`
    })
}

export const createClaim = claim => {
    return $.ajax({
        method: 'POST',
        url: '/api/claims',
        data: {
            claim
        },
    })
}

