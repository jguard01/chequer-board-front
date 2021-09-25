import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Slices/UserSlice'
import postReducer from './Slices/PostSlice'
export const store = configureStore({
    reducer: {
        user: userReducer,
        post: postReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch