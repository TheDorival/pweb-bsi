// server.js — API da Escola de Cursos (Encontro 1: tudo em um arquivo, dados em memória).

import express from "express";
import { cursos } from "./cursos.js";

const app = express();
app.use(express.json());

// Cartão de visita da API.
app.get("/", (req, res) => {
    res.json({ mensagem: "API da Escola de Cursos no ar" });
});

// Lista todos os cursos.
app.get("/cursos", (req, res) => {
    res.json(cursos);
});

// Busca um curso pelo id (404 se não existir).
app.get("/cursos/:id", (req, res) => {
    const id = Number(req.params.id);
    const curso = cursos.find((c) => c.id === id);
    if (!curso) {
        return res.status(404).json({ erro: "Curso não encontrado" });
    }
    res.json(curso);
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Escola de Cursos rodando em http://localhost:${PORT}`);
});
