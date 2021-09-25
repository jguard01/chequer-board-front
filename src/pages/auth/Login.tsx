import React from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'
import api from '../../common/api';
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../stores/Slices/UserSlice'
import { RootState } from '../../stores/MainStore'
import { AxiosError } from 'axios';


export default function Login() {
    const history = useHistory();
    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user);

    const onClickRegister = React.useCallback(async () => {
        history.push('/register');
    }, [history]);

    const onClickLogin = React.useCallback(async () => {
        try {
            const response = await api.post('/auth/login', {
                username,
                password,
            });

            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token.accessToken}`;
            dispatch(setUser(response.data.user));
            history.push('/board');
        } catch (error) {
            const e = error as AxiosError
            console.log(Object.entries(error as any));
            alert(e.response?.data.error);

        }

    }, [username, password, dispatch, history]);

    const onChangeUsername: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((e) => {
        setUsername(e.currentTarget.value);
    }, []);

    const onChangePassword: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((e) => {
        setPassword(e.currentTarget.value);
    }, []);



    React.useEffect(() => {
    }, [user])

    return (
        <Container>
            <h1>Login</h1>
            <LoginInput type="text" placeholder="Enter Username" value={username} onChange={onChangeUsername} />
            <LoginInput type="password" placeholder="Enter Password" value={password} onChange={onChangePassword} />
            <LoginButton onClick={onClickLogin} hasMargin >Login</LoginButton>
            <LoginButton onClick={onClickRegister} >Register</LoginButton>
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


const LoginInput = styled.input`
    height:50px;
    width:400px;
`
const LoginButton = styled.button<{ hasMargin?: boolean }>`
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