import { token } from "../constant";

export const getLocalStorage = (key) => {
    return localStorage.getItem(key);
}

export const setLocalStorage = (key, value) => {
    return localStorage.setItem(key, value);
}

export const clearLocalStorage = (key) => {
    return localStorage.removeItem(key);
}
export const isAuthenticated = () => {
    return getLocalStorage(token) ? true : false
}