import express from "express";

const app = express();
app.use(express.json());

let usuarios = [
    {id:1, nome:"leonardo"},
    {id:2, nome:"daniel"},
    {id:3, nome:"robert"}
]

app.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.end("Olá Mundo")
})

app.get("/usuarios", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.json(usuarios);
})

app.get("/usuarios/:id", (req, res) => {
    let {id} = req.params;
    let usuario = usuarios.find(usuario => usuario.id == id);
    if (usuario) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(usuario);
    } else {
        res.setHeader("Content-Type", "text/html; encoding=UTF8");
        res.status(404).end("<h1>Usuário não encontrado");
    }
})

app.delete("/usuarios/:id", (req, res) => {
    let {id} = req.params;
    let usuario = usuarios.find(usuario => usuario.id == id);
    if (usuario) {
        let usuario = usuarios.find(usuario => usuario.id != id);
        res.setHeader("Content-Type", "text/html");
        res.status(204).end();
    } else {
        res.setHeader("Content-Type", "text/html; encoding=UTF8");
        res.status(404).end("<h1>Usuário não encontrado<h1>");
    }
})

app.put("/usuarios/:id", (req, res) => {
    let {id} = req.params;
    let {nome} = req.body;
    let usuario = usuarios.find(usuario => usuario.id == id);
    if (usuario) {
        usuario.nome = nome;
        res.setHeader("Content-Type", "application/json");
        res.status(204).end();
    } else {
        res.setHeader("Content-Type", "text/html; encoding=UTF8");
        res.status(404).end("<h1>Usuário não encontrado<h1>");
    }
})

app.post("/usuarios", (req, res) => {
    let {nome} = req.body;
    let id = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1: 1;
    let novoUsuario = {id, nome};
    usuarios.push(novoUsuario);
    res.setHeader("Content-Type", "application/json");
    res.status(201).json(novoUsuario);
})

app.listen(3000, () => {
    console.log("Servidor executando!")
})

