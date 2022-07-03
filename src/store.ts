import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./features/user/userSlice";

const reducer = {
  user: userReducer,
}

const store = configureStore({
  reducer: reducer
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

