export const fetchUsers = () => (
    $.ajax({
        url: 'api/users'
    })
)

export const fetchUser = (userId) => (
    $.ajax({
        url: `api/users/${userId}`
    })
)

export const updateUser = (userId) => (
    $.ajax({
        method: 'PATCH',
        url: `/api/users/${userId}`,
        data: FormData,
        contentType: false,
        processData: false,
        dataType: 'json'
    })
)