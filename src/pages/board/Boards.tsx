import React from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'
import api from '../../common/api';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../stores/MainStore'
import { setPost } from '../../stores/Slices/PostSlice';
import axios, { AxiosError } from 'axios';


export default function PostList() {
    const history = useHistory();
    const [page, setPage] = React.useState(1);
    const dispatch = useDispatch();
    const post = useSelector((state: RootState) => state.post);
    const pageCount = useSelector((state: RootState) => state.post.pageMetaData.pageCount);

    const onClickCreateBoard = React.useCallback(() => {
        history.push(`/board/create`);
    }, [history]);

    const onClickDetail = React.useCallback((postId: number) => {
        history.push(`/board/${postId}`);
    }, [history]);


    const getData = React.useCallback(async (page) => {
        try {
            const response = await api.get('/post/list', { params: { page: page } });
            dispatch(setPost({
                posts: response.data.list,
                pageMetaData: response.data.meta
            }))
        } catch (error) {
            const e = error as AxiosError
            console.log(Object.entries(error as any));
            if (e.response?.data.statusCode == 401) {
                alert("Pleas Login Again")
            }
            history.push("/");
        }
    }, [dispatch]);

    React.useEffect(() => {
        getData(page);
    }, [getData, page]);

    const onClickDecrease = (page: number): void => {
        if (page === 1) {
            setPage(1);
        } else {
            setPage(page - 1);
        }
    }

    const onClickIncrease = (page: number): void => {
        if (page === pageCount) {
            setPage(page);
        } else {
            setPage(page + 1);
        }
    }


    return (
        <Container>
            <Title>Board</Title>

            <Postable hasMarginTop >
                <CreateButton onClick={() => onClickCreateBoard()}>CREATE</CreateButton>
                <tbody>
                    <tr>
                        <Pth>POST ID</Pth>
                        <Pth>TITLE</Pth>
                        <Pth>USERNAME</Pth>
                        <Pth>VIEWS</Pth>
                    </tr>
                    {post.posts.map(({ postId, title, views, user: {
                        username
                    } }) => (
                        <tr key={postId} onClick={() => onClickDetail(postId)}>
                            <Ptd>{postId}</Ptd>
                            <Ptd>{title}</Ptd>
                            <Ptd>{username}</Ptd>
                            <Ptd>{views}</Ptd>
                        </tr>
                    ))}
                </tbody>
            </Postable>


            <PageButtondiv>
                <Button onClick={() => onClickDecrease(page)} hasMargin>PREV</Button>
                <p >{page}</p>
                <Button onClick={() => onClickIncrease(page)} hasMargin>NEXT </Button>
            </PageButtondiv>
        </Container>
    )
}
const Container = styled.div`
    display:flex;
    flex:1;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Title = styled.div`
    display:flex;
    position: absolute;
    top: 120px;
    font-size: 24px;
    font-weight: bold;
`;

const Postable = styled.table<{ hasMarginTop?: boolean }>`
    border: 2px solid black;
    height: 35px;
    width: 80%;
    ${props => {
        if (props.hasMarginTop)
            return `
                margin-top: 12px;
                margin-bottom:12px;
            `;

        return ``;
    }}
`

const Ptd = styled.td`
    border: 1px solid black;
    text-align: left;
    padding: 8px;
`
const Pth = styled.th`
    border: 1px solid black;
    text-align: left;
    padding: 8px;
`
const PageButtondiv = styled.div`
    display:flex;
    position: absolute;
    bottom: 60px;
    flex-direction: row;
`

const CreateButton = styled.button`
    display: flex;
    align-self: flex-end;
    justify-content: center;
    align-items: center;
    margin: 10px;
    height:30px;
    width:100px;
`
const Button = styled.button<{ hasMargin?: boolean }>`
    height:25px;
    width:100px;
    ${props => {
        if (props.hasMargin)
            return `
                margin-top: 12px;
                margin-left: 12px;
                margin-right: 12px;
            `;

        return ``;
    }}
`