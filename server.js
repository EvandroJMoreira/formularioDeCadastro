const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const DB_FILE = 'database.json';

app.use(cors());
app.use(bodyParser.json());

// Garante que o arquivo exista
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2));
}

// Função para carregar usuários do JSON
function carregarUsuarios() {
    try {
        const data = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('❌ Erro ao ler database.json:', error);
        return [];
    }
}

// Função para salvar usuários
function salvarUsuarios(usuarios) {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(usuarios, null, 2));
        console.log('✅ Usuário salvo com sucesso em database.json!');
    } catch (error) {
        console.error('❌ Erro ao salvar database.json:', error);
    }
}

// Rota para cadastrar usuário
app.post('/cadastro', (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        console.log('⚠️ Dados incompletos recebidos');
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios!' });
    }

    let usuarios = carregarUsuarios();

    // Verifica se o email já está cadastrado
    if (usuarios.some(user => user.email === email)) {
        console.log('⚠️ Tentativa de cadastro com email já existente:', email);
        return res.status(400).json({ erro: 'E-mail já cadastrado!' });
    }

    usuarios.push({ nome, email, senha });
    salvarUsuarios(usuarios);

    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
});

// Rota para listar usuários cadastrados
app.get('/usuarios', (req, res) => {
    res.json(carregarUsuarios());
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
