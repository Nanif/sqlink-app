import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import IPersonalDetails from "../../../types/personal-details.type";

export interface UserState {
    personalDetails: {
        id:string,
        Team: string,
        avatar: string,
        joinedAt: string,
        name: string,
    }
    isLoggedIn: boolean
}

const initialState: UserState = {
    personalDetails: {
        id: "",
        Team: "",
        avatar: "",
        joinedAt: "",
        name: "",
    },
    isLoggedIn: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setPersonalDetailsData: (state, action: PayloadAction<IPersonalDetails>) => {
            state.personalDetails.Team = action.payload.Team
            state.personalDetails.id = action.payload.id
            state.personalDetails.avatar = action.payload.avatar
            state.personalDetails.joinedAt = action.payload.joinedAt
            state.personalDetails.name = action.payload.name
        },
        loggedIn: (state, action: PayloadAction<any>) => {
            state.isLoggedIn = action.payload
        },
    },
})

export const {setPersonalDetailsData, loggedIn} = userSlice.actions

export default userSlice.reducer