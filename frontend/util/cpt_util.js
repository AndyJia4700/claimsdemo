export const fetchCpts = () => {
    return $.ajax({
        url: "/api/cpts",
    })
}

export const fetchCpt = cptId => {    
    return $.ajax({
        url: `/api/cpts/${cptId}`
    })
}

export const createCpt = cpt => {
    return $.ajax({
        method: 'POST',
        url: '/api/cpts',
        data: {
            cpt
        },
    })
}

