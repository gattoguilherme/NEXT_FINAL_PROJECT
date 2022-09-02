/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next/types';
import React, { useState } from 'react';

type FilterProps = {
    periodoDe: string,
    setPeriodoDe (s: string) : void,

    periodoAte: string,
    setPeriodoAte (s: string) : void,

    status: string,
    setstatus (s: string) : void,
}

export const Filter : NextPage<FilterProps> = ({
    periodoDe, periodoAte, status,
    setPeriodoDe, setPeriodoAte, setstatus
}) => {

    const [showFilters , setShowFilters] = useState(false);

    return (
        <div className='container-filtros'>
            <div className='title'>
                <span>Tarefas</span>
                <img src="/icons/filter.svg" alt="filtrar tarefas" onClick={e => setShowFilters(!showFilters)} />
                <div className='form'>
                    <div>
                        <label>Data prevista de conclusão: </label>
                        <input type="date" value={periodoDe} onChange={e => setPeriodoDe(e.target.value)}/>
                    </div>
                    <div>
                        <label>Até: </label>
                        <input type="date" value={periodoAte} onChange={e => setPeriodoAte(e.target.value)}/>
                    </div>
                    <div className='line'></div>
                    <div>
                        <label>Status: </label>
                        <select value={status} onChange={e => setstatus(e.target.value)}>
                            <option value="0">Todas</option>
                            <option value="1">Ativas</option>
                            <option value="2">Concluídas</option>
                        </select>
                    </div>
                </div>
            </div>

            {
            showFilters &&
            <div className='filtrosMobile'>
                <div>
                    <label>Data prevista de conclusão: </label>
                    <input type="date"  value={periodoDe} onChange={e => setPeriodoDe(e.target.value)}/>
                </div>
                <div>
                    <label>Até: </label>
                    <input type="date" value={periodoAte} onChange={e => setPeriodoAte(e.target.value)}/>
                </div>
                <div className='line'></div>
                <div>
                    <label>Status: </label>
                    <select value={status} onChange={e => setstatus(e.target.value)}>
                        <option value="0">Todas</option>
                        <option value="1">Ativas</option>
                        <option value="2">Concluídas</option>
                    </select>
                </div>
            </div>
                }
            
        </div>
    )
}