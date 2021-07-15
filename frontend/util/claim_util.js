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

export const updateClaim = (claim)=> {
    return $.ajax({
        method: 'PATCH',
        url: `/api/claims/${claim.id}`,
        data: {
            claim
        }
    })
}

export const deleteClaim = (claimId) => {
    return $.ajax({
        method: 'DELETE',
        url: `/api/claims/${claimId}`
    })
}

