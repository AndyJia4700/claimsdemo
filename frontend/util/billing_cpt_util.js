export const fetchBillingCpts = () => {
    return $.ajax({
        url: "/api/billing_cpts",
    })
}

export const fetchBillingCpt = billingCptId => {    
    return $.ajax({
        url: `/api/billing_cpts/${billingCptId}`
    })
}

export const createBillingCpt = billingCpt => {
    return $.ajax({
        method: 'POST',
        url: '/api/billing_cpts',
        data: {
            billingCpt
        },
    })
}

