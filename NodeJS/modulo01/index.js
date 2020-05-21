const express = require('express');

const server = express();

server.use(express.json());

const users = ['Diego', 'Pedro', 'Vitor'];

const checkExistsId = (req, res, next) => {
    const { id } = req.params;
    const { index } = req.query;

    if(!users[id] && !users[index]){
        return res.send("Usuário com id inválido")
    }

    next();
}

const checkExistUser = (req, res, next) => {
    const { name } = req.body;

    if(!name){
        return res.status(400).json({error: "User does not required"})
    }

    next();
}



server.get('/users/:id', checkExistsId, (req, res) => {
    const { id } = req.params;

    return res.send(users[id]);
});

server.get('/users', (req, res) => {
    return res.send(users)
});

server.post('/users', checkExistUser, (req, res) => {
    const { name } = req.body

    users.push(name);

    return res.send(users)
});

server.put('/users?', checkExistUser, checkExistsId, (req, res) => {
    const { index } = req.query;
    const { name } = req.body;

    users[index] = name;

    return res.send(users);
})

server.delete('/users?', checkExistsId, (req, res) => {
    const { index } = req.query;

    users.splice(index, 1);

    return res.send(users);
})

server.listen(3000);