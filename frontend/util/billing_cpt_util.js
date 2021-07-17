export const fetchBillingCpts = (claimId) => {
    return $.ajax({
        url: `/api/billing_cpts?claim=${claimId}`,
    })
}

export const fetchBillingCpt = billingCptId => {    
    return $.ajax({
        url: `/api/billing_cpts/${billingCptId}`
    })
}

export const createBillingCpt = formData => {
    return $.ajax({
        method: 'POST',
        url: '/api/billing_cpts',
        data: formData,
        contentType: false,
        processData: false,
        dataType: "json",
    })
}

export const updateBillingCpt = billingCpt => {
    return $.ajax({
        method: 'PATCH',
        url: `/api/billing_cpts/${billingCpt.id}`,
        data: {
            billingCpt
        },
    })
}

export const deleteBillingCpt = billingCptId => {
    return $.ajax({
        method: 'DELETE',
        url: `/api/billing_cpts/${billingCptId}`
    })
}

