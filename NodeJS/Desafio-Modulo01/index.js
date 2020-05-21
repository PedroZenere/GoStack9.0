const express = require('express');

const server = express();

server.use(express.json())

const projects = [];
var count = 0;

server.use((req, res, next) => {
    count += 1;
    console.log("Contagem: ", count);

    next();
    
})

const checkProjectExists = (req, res, next) => {
    const { id } = req.params;

    if(projects.find((item) => {
        if(item.id == id)
            return true
    })){
        next();
    }

    return res.status(400).json({error: "Id not found"});
    
}

server.post('/projects', (req, res) => {
    const { id, title } = req.body;

    const projectsObject = {
        id,
        title,
        tasks: []
    };
    projects.push(projectsObject);

    return res.json(projects);
});

server.get('/projects', (req, res) => {
    return res.send(JSON.stringify(projects));
});

server.put('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    projects.find((item) => {
        if(item.id == id){
            item.title = title;
        }
    });

    return res.send(JSON.stringify(projects));
});

server.delete('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;

    const index = projects.find((item) => {
        if(item.id == id){
            return projects.indexOf(item)
        }
    });

    projects.splice(index, 1);

    return res.send(JSON.stringify(projects));
});

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    projects.find((item) => {
        if(item.id == id){
            item.tasks.push(title)
        }
    });

    return res.send(JSON.stringify(projects));
});


server.listen(3000);