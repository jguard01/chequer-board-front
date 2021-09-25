import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components';
import api from '../../common/api';
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/MainStore';
import { AxiosError } from 'axios';

export default function Detail() {
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [title, setTitle] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [createBy, setCreateBy] = React.useState<string>('');
    const [views, setViews] = React.useState<number>();

    const authUser = useSelector((state: RootState) => state.user.username);

    const onClickGoUpdateBoard = React.useCallback(() => {
        history.push(`/board/update/${id}`);
    }, [history]);

    const onClickDeleteBoard = React.useCallback(async (postId: string) => {
        const id = parseInt(postId);
        try {
            const response = await api.post(`/post/delete`, {
                id
            });
            history.push(`/board`);
        } catch (error) {
            const e = error as AxiosError
            if (e.response?.data.statusCode == 401) {
                alert(e.response?.data.error)
            }
            history.push("/");
        }

    }, [history]);

    React.useEffect(() => {
    }, [authUser]);

    const getData = React.useCallback(async () => {
        try {
            const response = await api.get(`/post/detail/${id}`);
            setTitle(response.data.title);
            setDescription(response.data.description);
            setCreateBy(response.data.user.username);
            setViews(response.data.views);
        } catch (error) {
            const e = error as AxiosError
            if (e.response?.data.statusCode == 401) {
                alert(e.response?.data.error)
            }
            history.push("/");
        }

    }, []);

    React.useEffect(() => {
        getData();
    }, [getData]);

    return (
        <Container>
            <h1>Post</h1>

            <Postable hasMarginTop >
                <Ptr >TITLE:  {title}</Ptr>
                <Ptr>AUTHOR:  {createBy}</Ptr>
                <Ptr>VIEWS:  {views}</Ptr>
                <Ptr>DESCRIPTION : {description}</Ptr>
            </Postable>

            {authUser === createBy ? (
                <ButtonDiv>
                    <Button onClick={() => onClickGoUpdateBoard()}>UPDATE</Button>
                    <Button onClick={() => onClickDeleteBoard(id)}>DELETE</Button>
                </ButtonDiv>
            ) : null}

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
const ButtonDiv = styled.tr`
    display: flex;
    flex-direction: row;
`

const Ptr = styled.tr`
    display: flex;
    text-align: left;
    padding: 8px;
    margin-bottom: 30px;
`
const Button = styled.button<{ hasMargin?: boolean }>`
    height:50px;
    width:150px;
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