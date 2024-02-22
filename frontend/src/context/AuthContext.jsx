import { createContext, useCallback, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [registerError, setRegisterError] = useState(null)
    const [isRegisterLoading, setIsRegisterLoading] = useState(false)
    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info)
    }, []);

    // here set useCallback, since dependency is empty array, it will form at first render,
    // so inside value will be first registerUser, it need to change when registerInfo is changed
    // so we need to set dependency with registerInfo
    const registerUser = useCallback(async(e) => {
        e.preventDefault()
        setIsRegisterLoading(true)
        setRegisterError(null)
        const response = await postRequest(
            `${baseUrl}/user/register`,
            JSON.stringify(registerInfo)
        )
        setIsRegisterLoading(false)
        // set error message
        if (response.error) return setRegisterError(response)

        localStorage.setItem('User', JSON.stringify(response))
        setUser(response)
    }, [registerInfo])
    
    return (
        <AuthContext.Provider value={{
            user,
            registerInfo,
            updateRegisterInfo,
            registerUser,
            registerError,
            isRegisterLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
}