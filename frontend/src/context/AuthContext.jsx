import { createContext, useCallback, useState, useEffect } from "react";
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

    const [loginError, setLoginError] = useState(null)
    const [isLoginLoading, setIsLoginLoading] = useState(false)
    const [loginInfo, setLoginInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    useEffect(() => {
        const user = localStorage.getItem('User')
        setUser(JSON.parse(user))
    }, [])


    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info)
    }, []);

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info)
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

    const loginUser = useCallback(async(e) => {
        e.preventDefault()
        setIsLoginLoading(true)
        setLoginError(null)
        const response = await postRequest(
            `${baseUrl}/user/login`,
            JSON.stringify(loginInfo)
        )
        setIsLoginLoading(false)
        if (response.error) return setLoginError(response)
        localStorage.setItem('User', JSON.stringify(response))
        setUser(response)
    }, [loginInfo])

    const logout = useCallback(() => {
        localStorage.removeItem('User')
        setUser(null)
    }, [])
    
    return (
        <AuthContext.Provider value={{
            user,
            registerInfo,
            registerError,
            isRegisterLoading,
            registerUser,
            updateRegisterInfo,
            loginInfo,
            loginError,
            isLoginLoading,
            loginUser,
            updateLoginInfo,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}