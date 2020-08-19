import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';

import Header from './components/Header';

function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(res => {
            
            setProjects(res.data);

        }).catch(error => {
            console.log(error);
        });
    }, [])

    async function handleAddProject() {
        try {
            const res = await api.post('projects', {
                    title: `Projeto ${Date.now()}`,
                    owner: 'Vinissão'
            });

            const project = res.data;

            setProjects([...projects, project]);
        } catch(error) {
            console.log('Error');
        }
    }

    return (
        <>
            <Header title="Página Inicial">
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                </ul>
            </Header>
            <h1>
                Hello World!
            </h1>

            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>

            <button type='button' onClick={handleAddProject}>Adicionar</button>
        </>
    );
}
export default App;