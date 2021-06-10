export const fetchIcds = () => {
    return $.ajax({
        url: `/api/icds`
    })
}

export const fetchIcd = icdId => {    
    return $.ajax({
        url: `/api/icds/${icdId}`
    })
}

export const createIcd = icd => {
    return $.ajax({
        method: 'POST',
        url: '/api/icds',
        data: {
            icd
        },
    })
}

