/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { NextPage } from 'next';

type HeadeProps = {
    sair(): void
}

export const Header:NextPage<HeadeProps> = ({sair}) => {

    const fullName = localStorage.getItem("userName");
    const userName = fullName?.split(' ')[0] || '...';

    return (
        <div className="container-header">
            <img src="/icons/logo.svg" alt="logo fiap" className="logo" />
            <button><span>+</span>Adicionar Tarefa</button>

            <div className='mobile'>
                <span>Olá, {userName}</span>
                <img src="/icons/exit-mobile.svg" onClick={sair} alt="sair" />
            </div>

            <div className='desktop'>
                <span>Olá, {userName}</span>
                <img src="/icons/exit-desktop.svg" onClick={sair} alt="sair" />
            </div>
        </div>
    )
}