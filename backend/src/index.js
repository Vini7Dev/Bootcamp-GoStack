const express = require('express');
const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(express.json());

const projects = [];

function logRequests(req, res, next) {
    const { method, url } = req;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.log(logLabel);

    return next();
}

function validateProjectId(req, res, next) {
    const { id } = req.params;

    const idValidate = isUuid(id);

    if(idValidate)
        return next();
    else
        return res.status(400).json({ eror: 'Invalid ID.' });
}

app.get('/projects', logRequests, (req, res) => {
    const { title } = req.query

    console.log(title);

    const filteredProjects = title ? projects.filter(
            project => project.title.includes(title)
        )
        : projects;
    
    return res.json(filteredProjects);
});

app.post('/projects', (req, res) => {
    const { title, owner } = req.body;

    const project = { id: uuid(),  title, owner };
    
    projects.push(project);

    return res.json(project);
});

app.put('/projects/:id', validateProjectId, (req, res) => {
    const { id } = req.params;
    const { title, owner } = req.body;

    const projectIndex = projects.findIndex(project => project.id === id);

    if(projectIndex === -1)
        return res.status(404).json({
            error: 'Project not found.'
        });

    const project = { id, title, owner }

    projects[projectIndex] = project;

    return res.json(project);
});

app.delete('/projects/:id', validateProjectId, (req, res) => {
    const { id } = req.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    if(projectIndex === -1)
        return res.status(404).json({ error: 'Project not found' });

    projects.splice(projectIndex, 1);

    return res.status(204).send();
});

app.listen(3333, () => {
    console.log('Back-end started.');
});