/* eslint-disable @next/next/no-img-element */
import React, {useState, MouseEvent} from 'react';
import { NextPage } from 'next';
import { AccessTokenProps } from '../types/AccessTokenProps';
import { executeRequest } from '../services/apiServices';

export const Login:NextPage<AccessTokenProps> = ({setAccessToken}) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const doLogin = async(evento: MouseEvent) => {
        evento.preventDefault()
        try{
            setError('');
            if(!login || !password){
                return setError('Favor Informar usuário e senha');
            }

            console.log('teste1');
            const body = {login, password};
            const result = await executeRequest('login', 'POST', body);
            if(!result && !result.data){
                return setError('Ocorreu um ao processar login.');
            }

            const {name, email, token} = result.data;
            localStorage.setItem('accessToken', token);
            localStorage.setItem('userName', name);
            localStorage.setItem('userMail', email);
            setAccessToken(token)
        }catch(e: any){
            if(e?.response?.data?.error){
                return setError(e?.response?.data?.error);
            }else{
                return setError('Ocorreu um ao processar login.');
            }
        }
    }

    return (
        <div className="container-login">
            <img src="/icons/logo.svg" alt="Logo Fiap" className="logo"/>
            <form>
                <p className="error">{error}</p>
                <div className="input">
                    <img src="/icons/mail.svg" alt="Informe seu login" />
                    <input type="text" 
                        value={login}
                        onChange={event => setLogin(event.target.value)} placeholder="Login"
                    />
                </div>
                <div className="input">
                    <img src="/icons/lock.svg" alt="Informe sua senha" />
                    <input type="password" 
                        placeholder="Senha"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </div>
                <button onClick={doLogin}>Login</button>
            </form>
        </div>
    );
}