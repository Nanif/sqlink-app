import axios from "axios";
import * as AuthService from "./auth.service";
import IPersonalDetails from "../../types/personal-details.type";

const API_URL = process.env.REACT_APP_API_URL;

export const getPersonalDetailsByToken = (token: string): IPersonalDetails => {
    //TODO endpoint in server that get token and return personal details
    // For now it's mock data
    return {
        "id": "1",
        "name": "Test Test",
        "Team": "Developers",
        "joinedAt": "2018-10-01",
        "avatar": "https://avatarfiles.alphacoders.com/164/thumb-164632.jpg"
    }
}

export const getUserInfo = () => {
    return axios.get(API_URL + "info", {headers: AuthService.authHeader()});
};
