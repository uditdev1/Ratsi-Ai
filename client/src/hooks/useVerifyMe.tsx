import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backend } from "../utils/backend";

interface AuthContextType {
    isAuthenticated: boolean;
    logout: () => void;
    verifyUser: () => Promise<void>;
    checkState : () => void;
    token : string ;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    logout: () => {},
    verifyUser: async () => {},
    checkState : () => {}, 
    token : "",
});

export const AuthProvider = ({ children } : any) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(localStorage.getItem("token") ? true : false);
    const navigate = useNavigate();
    const [ token , setToken ] = useState<string>("");

    const clearLocalStorage = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setIsAuthenticated(false);
        navigate("/signin");
    }

    useEffect(() => {
        setToken(localStorage.getItem("token") ?? "");
    }, [isAuthenticated] );

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        console.log("logged out");
        navigate("/signin");
    }

    const checkState = () => {
        const token = localStorage.getItem("token");
        if (token) {
            verifyUser();
        }
    }

    const verifyUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
            return;
        }
        
        try {
            const response = await axios.post(backend + "/users/verify" , { token });
            if (response.data.success) {
                setIsAuthenticated(true);
            } else {
                clearLocalStorage();
            }
        } catch (error) {
            clearLocalStorage();
        }
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated , logout, verifyUser , checkState , token
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useVerifyMe = () => useContext(AuthContext);
