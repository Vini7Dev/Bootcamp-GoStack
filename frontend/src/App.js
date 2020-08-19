import React, { useState } from 'react';

import Header from './components/Header';

function App() {
    const [projects, setProjects] = useState(['App', 'Web']);

    function handleAddProject() {
        setProjects([...projects, `Novo projeto ${Date.now()}}`]);
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
                {projects.map(project => <li key={project}>{project}</li>)}
            </ul>

            <button type='button' onClick={handleAddProject}>Adicionar</button>
        </>
    );
}
export default App;