import React from 'react'
import styled from 'styled-components';
import api from '../../common/api';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../stores/Slices/UserSlice'
import { RootState } from '../../stores/MainStore'
import { AxiosError } from 'axios';

export default function Register() {
    const history = useHistory();
    const [fullname, setFullname] = React.useState<string>('');
    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [phone, setPhone] = React.useState<string>('');

    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user);

    const onClickRegister = React.useCallback(async () => {
        if (password !== passwordConfirm) {
            alert("Password and Password Confirm Not Same");
        }
        else {
            try {
                const response = await api.post('/auth/register', {
                    fullname,
                    username,
                    password,
                    email,
                    phone,

                });

                api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token.accessToken}`;
                dispatch(setUser(response.data.user));
                history.push('/board');
            } catch (error) {
                const e = error as AxiosError
                if (e.response?.data.statusCode === 500) {
                    alert("Username is duplicated")
                }
                else if (e.response?.data.statusCode === 422 && (password.length) >= 6) {
                    alert(e.response?.data.error + "Input Valid Email");
                }

                else if (e.response?.data.statusCode === 422 && (password.length) < 6) {
                    alert(e.response?.data.error + "Password Length must longer than 6");
                }


                console.log(Object.entries(error as any));
            }


        }
    }, [fullname, username, password, passwordConfirm, email, phone, dispatch, history]);

    const onChangeUsername: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((e) => {
        setUsername(e.currentTarget.value);
    }, []);

    const onChangePassword: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((e) => {
        setPassword(e.currentTarget.value);
    }, []);

    const onChangeFullname: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((e) => {
        setFullname(e.currentTarget.value);
    }, []);

    const onChangeEmail: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((e) => {
        setEmail(e.currentTarget.value);
    }, []);

    const onChangePhone: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((e) => {
        setPhone(e.currentTarget.value);
    }, []);

    const onChangePasswordConfirm: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((e) => {
        setPasswordConfirm(e.currentTarget.value);
    }, []);

    React.useEffect(() => {
    });

    React.useEffect(() => {
    }, [user])

    return (
        <Container>
            <h1>Register</h1>
            <LoginInput type="text" placeholder="Enter Fullname" value={fullname} onChange={onChangeFullname} />
            <LoginInput type="text" placeholder="Enter Username" value={username} onChange={onChangeUsername} />
            <LoginInput type="text" placeholder="Enter Email" value={email} onChange={onChangeEmail} />
            <LoginInput type="text" placeholder="Enter Phone Number" value={phone} onChange={onChangePhone} />
            <LoginInput type="password" placeholder="Enter Password" value={password} onChange={onChangePassword} />
            <LoginInput type="password" placeholder="Enter Password Confirm" value={passwordConfirm} onChange={onChangePasswordConfirm} />
            <LoginButton onClick={onClickRegister} hasMargin >Register</LoginButton>
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
    width: 400px;
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