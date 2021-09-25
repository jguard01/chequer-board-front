import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { RootState } from '../../stores/MainStore';
import api from '../../common/api';
import styled from 'styled-components';
import { AxiosError } from 'axios';

export default function Update() {
    const { pid } = useParams<{ pid: string }>();;
    const [title, setTitle] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');

    const history = useHistory();
    const authUser = useSelector((state: RootState) => state.user.username);

    const oncChangeTitle: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((e) => {
        setTitle(e.currentTarget.value);
    }, []);

    const onChangeDescription: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((e) => {
        setDescription(e.currentTarget.value);
    }, []);

    const onClickUpdate = React.useCallback(async (pid, title, description) => {
        const id = parseInt(pid);
        try {
            const response = await api.patch('/post/update', {
                id,
                title,
                description,
            });
            history.push('/board');
        }
        catch (error) {
            const e = error as AxiosError
            if (e.response?.data.statusCode == 401) {
                alert(e.response?.data.error)
            }
            history.push("/");
        }

    }, [history]);

    return (
        <Container>
            <h1>UPDATE Board</h1>
            <TitleInput type="text" placeholder="Enter Title" value={title} onChange={oncChangeTitle} />
            <DescriptionInput type="text" placeholder="Enter Description" value={description} onChange={onChangeDescription} />
            <Button onClick={() => onClickUpdate(pid, title, description)} hasMargin >UPDATE</Button>
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

const TitleInput = styled.input`
    height:75px;
    width:400px;
`

const DescriptionInput = styled.input`
    height:300px;
    width:400px;
`

const Button = styled.button<{ hasMargin?: boolean }>`
    height:40px;
    width:200px;
    ${props => {
        if (props.hasMargin)
            return `
                margin-top: 12px;
            `;

        return ``;
    }}
`
