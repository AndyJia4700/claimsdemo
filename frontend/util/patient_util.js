export const fetchPatients = () => (
    $.ajax({
        url: "/api/patients"
    })
)

export const fetchPatient = patientId => {    
    return $.ajax({
        url: `/api/patients/${patientId}`
    })
}

export const createPatient = formData => (
    $.ajax({
        method: 'POST',
        url: '/api/patients',
        data: formData,
        contentType: false,
        processData: false,
        dataType: 'json'
    })
)

export const updatePatient = (formData, patientId)=> {
    return $.ajax({
        method: 'PATCH',
        url: `/api/patients/${patientId}`,
        data: formData,
        contentType: false,
        processData: false,
        dataType: 'json'
    })
}

export const deletePatient = patientId => (
    $.ajax({
        method: 'DELETE',
        url: `/api/patients/${patientId}`
    })
)

