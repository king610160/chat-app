import { useState, useEffect } from 'react'
import { baseUrl, getRequest } from '../utils/services'

export const useFetchRecipientUser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null)
    const [error, setError] = useState(null)

    // chat will had members, need to find the member not self, return others
    const recipientId = chat?.members.find((id) => id !== user?.id)
    useEffect(() => {
        const getUser = async() => {
            // if no id, return null (the talk user might be deleted, so need to check)
            if(!recipientId) return null
            const response = await getRequest(`${baseUrl}/user/${recipientId}`)
            if(response.error) return setError(error)
            // set other user's info into recipientUser, and return
            setRecipientUser(response)
        }
        getUser()
    }, [recipientId])
    return {recipientUser}
}