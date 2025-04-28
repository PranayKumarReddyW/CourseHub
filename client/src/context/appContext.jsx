import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthService, loginService, registerService } from "@/services";
import React, { createContext, useEffect } from "react";
export const AppContext = createContext();
const AppProvider = ({ children }) => {
    const [signInFormData, setSignInFormData] = React.useState(initialSignInFormData);
    const [signUpFormData, setSignUpFormData] = React.useState(initialSignUpFormData);
    const [auth, setAuth] = React.useState({
        isAuthenticated: false,
        user: null,
    });
    async function handleRegisterUser(event) {
        event.preventDefault();
        const data = await registerService(signUpFormData);
        console.log(data)
    }
    async function handleLoginUser(event) {
        event.preventDefault();
        const data = await loginService(signInFormData);
        if (data.success) {
            sessionStorage.setItem("accessToken", JSON.stringify(data.accessToken));
            setAuth({
                isAuthenticated: true,
                user: {
                    userName: data.data.userName,
                    userEmail: data.data.userEmail,
                    role: data.data.role,
                },
            });
        }
        else {
            setAuth({
                isAuthenticated: false,
                user: null,
            })
        }
    }
    const value = {
        signInFormData, setSignInFormData, setSignUpFormData, signUpFormData, handleRegisterUser, handleLoginUser
    }

    async function checkAuth() {
        const data = await checkAuthService();
        if (data.success) {
            setAuth({
                isAuthenticated: true,
                user: {
                    userName: data.data.userName,
                    userEmail: data.data.userEmail,
                    role: data.data.role,
                },
            });
        } else {
            setAuth({
                isAuthenticated: false,
                user: null,
            })
        }
    }
    useEffect(() => {
        checkAuth();
    }, [])
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};


export default AppProvider;