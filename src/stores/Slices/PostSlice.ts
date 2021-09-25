import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface PostListState {
    posts: Post[]
    pageMetaData: Meta
}

export interface Post {
    postId: number;
    title: string;
    createdBy: string;
    views: number;
    deleted: boolean;
    user: User;
}

export interface Meta {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNexPage: boolean;
}

export interface User {
    id: string
    username: string
    fullname: string
    email: string
    phone: string
}

const initialState: PostListState = {
    posts: [],
    pageMetaData: {
        page: 1,
        take: 10,
        itemCount: 2,
        pageCount: 1,
        hasPreviousPage: false,
        hasNexPage: false,
    },

};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPost: (state, action: PayloadAction<PostListState>) => {
            Object.assign(state, action.payload);
        },
    },
})

// Action creators are generated for each case reducer function
export const { setPost } = postSlice.actions

export default postSlice.reducer