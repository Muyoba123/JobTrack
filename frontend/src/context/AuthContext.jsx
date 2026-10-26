import {
    createContext,
    useContext,
    useState,
} from "react";

import api, { setAuthToken } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);

    // Store the authenticated user and token in React state.
    function saveAuthentication(data) {
        setUser(data.user);
        setToken(data.token);
        setAuthToken(data.token);
    }

    // Register a new account.
    async function register(formData) {
        setLoading(true);

        try {
            const response = await api.post("/register", formData);

            saveAuthentication(response.data);

            return response.data;
        } finally {
            setLoading(false);
        }
    }

    // Log in an existing user.
    async function login(credentials) {
        setLoading(true);

        try {
            const response = await api.post("/login", credentials);

            saveAuthentication(response.data);

            return response.data;
        } finally {
            setLoading(false);
        }
    }

    // Retrieve the authenticated user's profile.
    async function fetchUser() {
        if (!token) {
            return null;
        }

        const response = await api.get("/user");

        setUser(response.data.user);

        return response.data.user;
    }

    // Log out the current user.
    async function logout() {
        try {
            if (token) {
                await api.post("/logout");
            }
        } finally {
            setUser(null);
            setToken(null);
            setAuthToken(null);
        }
    }

    const value = {
        user,
        token,
        loading,
        register,
        login,
        logout,
        fetchUser,
        isAuthenticated: Boolean(token && user),
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook for accessing authentication state.
export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used within an AuthProvider"
        );
    }

    return context;
}