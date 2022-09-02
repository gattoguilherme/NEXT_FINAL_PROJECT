/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';

export const Filter = () => {

    const [showFilters , setShowFilters] = useState(false);

    return (
        <div className='container-filtros'>
            <div className='title'>
                <span>Tarefas</span>
                <img src="/icons/filter.svg" alt="filtrar tarefas" onClick={e => setShowFilters(!showFilters)} />
                <div className='form'>
                    <div>
                        <label>Data prevista de conclusão: </label>
                        <input type="date" />
                    </div>
                    <div>
                        <label>Até: </label>
                        <input type="date" />
                    </div>
                    <div className='line'></div>
                    <div>
                        <label>Status: </label>
                        <select>
                            <option value="">Todas</option>
                            <option value="">Ativas</option>
                            <option value="">Concluídas</option>
                        </select>
                    </div>
                </div>
            </div>

            {
            showFilters &&
            <div className='filtrosMobile'>
                <div>
                    <label>Data prevista de conclusão: </label>
                    <input type="date" />
                </div>
                <div>
                    <label>Até: </label>
                    <input type="date" />
                </div>
                <div className='line'></div>
                <div>
                    <label>Status: </label>
                    <select>
                        <option value="">Todas</option>
                        <option value="">Ativas</option>
                        <option value="">Concluídas</option>
                    </select>
                </div>
            </div>
                }
            
        </div>
    )
}