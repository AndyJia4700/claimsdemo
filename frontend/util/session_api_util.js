export const postSession = user => (
    $.ajax({
        method: 'POST',
        url:'/api/session',
        data:{
            user
        }
    })
)

export const deleteSession = () => {
    return $.ajax({
        method: 'DELETE',
        url: '/api/session'
    })
}

export const postUser = user => (
    $.ajax({
        method: 'POST',
        url: 'api/users',
        data:{
            user
        }
    })
)