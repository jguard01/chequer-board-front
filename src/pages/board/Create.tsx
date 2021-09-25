import { AxiosError } from 'axios';
import React from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../common/api';

export default function Create() {
    const [title, setTitle] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const history = useHistory();

    const onClickCreate = React.useCallback(async () => {
        try {
            const response = await api.post('/post/create', {
                title,
                description,
            });

            history.push('/board');
        } catch (error) {
            const e = error as AxiosError
            console.log(Object.entries(error as any));
            if (e.response?.data.statusCode == 401) {
                alert(e.response?.data.error)
            }
            history.push("/");
        }

    }, [title, description, history]);

    const oncChangeTitle: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((e) => {
        setTitle(e.currentTarget.value);
    }, []);

    const onChangeDescription: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((e) => {
        setDescription(e.currentTarget.value);
    }, []);

    return (
        <Container>
            <h1>ADD Board</h1>
            <TitleInput type="text" placeholder="Enter Title" value={title} onChange={oncChangeTitle} />
            <DescriptionInput type="text" placeholder="Enter Description" value={description} onChange={onChangeDescription} />
            <Button onClick={onClickCreate} hasMargin >CREATE</Button>
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
