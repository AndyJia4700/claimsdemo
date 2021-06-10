export const fetchBillingIcds = () => {
    return $.ajax({
        url: "/api/billing_icds",
    })
}

export const fetchBillingIcd = billingIcdId => {    
    return $.ajax({
        url: `/api/billing_icds/${billingIcdId}`
    })
}

export const createBillingIcd = billingIcd => {
    return $.ajax({
        method: 'POST',
        url: '/api/billing_icds',
        data: {
            billingIcd
        },
    })
}

