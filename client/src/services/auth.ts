import api from "./api";

export const TOKEN_KEY = "jwt";

export async function isAuthenticated(): Promise<boolean> {
    
    if(localStorage.getItem(TOKEN_KEY) === null) return false
    
    try {
        const response = await api.get('/check-jwt')
        if(response.data) return true
    } catch(err) {
        return false
    }

    return false
}

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
}