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

export const updateClaim = (claimId, formData)=> {
    // debugger
    return $.ajax({
        method: 'PATCH',
        url: `/api/claims/${claimId}`,
        data: formData,
        contentType: false,
        processData: false,
        dataType: "json",
    })
}

export const deleteClaim = (claimId) => {
    return $.ajax({
        method: 'DELETE',
        url: `/api/claims/${claimId}`
    })
}

