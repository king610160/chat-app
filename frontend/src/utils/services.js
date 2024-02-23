export const baseUrl = 'http://localhost:5000/api/v1'

export const postRequest = async (url, body) => {
    const response = await fetch(url, {
        method: "POST",
        headers:{
            "content-type": "application/json"
        },
        body,
    })

    const data = await response.json()

    if (!response.ok) {
        let message

        if(data?.message) {
            // the data may have message
            message = data.message
        } else {
            // but if database error, it might not set the message
            message = data
        }
        return {error: true, message}
    }

    return data
}

export const getRequest = async (url) => {
    const response = await fetch(url)

    const data = await response.json()

    if (!response.ok) {
        let message

        if (data?.message) message = data.message
        else message = data
        
        return { error: true, message }
    }

    return data
}