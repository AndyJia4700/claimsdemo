export const fetchClaims = (providerId, patientId) => {
    if (providerId){
        return $.ajax({
            url: `/api/claims?provider=${providerId}`
        })
    } else {
        return $.ajax({
            url: `/api/claims?patient=${patientId}`
        })
    }
}

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

