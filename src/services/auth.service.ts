import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const login = (username: string, password: string) => {
    return axios
        .post(API_URL + "authenticate", {
            username,
            password,
        })
        .then((response) => {
            return response.data && response.data[0];
        })
};

export const logout = () => {
    localStorage.removeItem("token");
};

export function authHeader() {
    const userStr = localStorage.getItem("token");
    let user = null;
    if (userStr)
        user = JSON.parse(userStr);

    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token   };
    } else {
        return { Authorization: '' };
    }
}