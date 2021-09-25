import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
    id?: string
    username?: string
    fullname?: string
    email?: string
    phone?: string
}

const initialState: UserState = {};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            Object.assign(state, action.payload);
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer