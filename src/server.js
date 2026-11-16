// ===================================================================
// Disque Denúncia Queimadas - Betim
// Servidor Node.js (Express) + banco Turso (SQLite na nuvem)
//
// As fotos são guardadas DENTRO do banco Turso (não em pasta local),
// para que o site funcione em hospedagens serverless como o Vercel.
//
// Para rodar localmente:  npm install   e depois   npm start
// Acesse:                http://localhost:3000
// ===================================================================

// Carrega as variáveis do arquivo .env (credenciais do Turso).
// Em hospedagens (Vercel) as variáveis vêm do painel, então o .env não existe.
if (typeof process.loadEnvFile === 'function') {
    try {
        process.loadEnvFile();
    } catch {
        // sem arquivo .env -> usa variáveis de ambiente da hospedagem
    }
}

const express = require('express');
const multer = require('multer');
const { db, pronto } = require('./db');

const app = express();
const PORTA = process.env.PORT || 3000;

// --- Arquivos estáticos (index.html, css, js, data, assets) ---
app.use(express.static(__dirname));

// =====================================================================
// CONFIGURAÇÃO DO UPLOAD DE IMAGENS (multer)
// A imagem fica na memória e depois é gravada no banco (não em disco).
// =====================================================================
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 2 * 1024 * 1024 }, // máximo 2 MB por foto
    fileFilter: (req, file, cb) => {
        if (/^image\/(jpeg|png|webp)$/.test(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('O arquivo enviado não é uma imagem válida (use JPG, PNG ou WEBP).'));
        }
    }
});

// ============================================================
// ROTA 1 - DADOS AGREGADOS (alimenta o mapa de calor)
// Retorna { codigo_da_regiao: total_de_focos, ... }
// ============================================================
app.get('/api/focos', async (req, res) => {
    try {
        await pronto;
        const resultado = await db.execute(
            'SELECT cd_setor, SUM(quantidade) AS quantidade FROM ocorrencias_regiao GROUP BY cd_setor'
        );

        const dados = {};
        resultado.rows.forEach(l => { dados[l.cd_setor] = Number(l.quantidade); });
        res.json(dados);
    } catch (erro) {
        console.error('Erro em /api/focos:', erro);
        res.status(500).json({ erro: 'Falha ao consultar o banco de dados.' });
    }
});

// =======================================================================
// ROTA 2 - LISTA DETALHADA (alimenta o dashboard e o quadro da vergonha)
// A foto não vem na lista; vem só o link para a Rota 4.
// =======================================================================
app.get('/api/ocorrencias', async (req, res) => {
    try {
        await pronto;
        const resultado = await db.execute(
            'SELECT id, cd_setor, quantidade, endereco, imagem, data_hora ' +
            'FROM ocorrencias_regiao ORDER BY data_hora DESC'
        );

        const dados = resultado.rows.map(l => ({
            id: Number(l.id),
            cd_setor: l.cd_setor,
            quantidade: Number(l.quantidade),
            endereco: l.endereco,
            // Se tiver foto, devolve o link para baixá-la (Rota 4)
            imagem: l.imagem ? '/api/imagem/' + Number(l.id) : null,
            data_hora: l.data_hora
        }));
        res.json(dados);
    } catch (erro) {
        console.error('Erro em /api/ocorrencias:', erro);
        res.status(500).json({ erro: 'Falha ao consultar o banco de dados.' });
    }
});

// ============================================================
// ROTA 3 - REGISTRAR UMA NOVA OCORRÊNCIA (com foto opcional)
// ============================================================
app.post('/api/ocorrencias', (req, res) => {
    upload.single('imagem')(req, res, async (erroUpload) => {
        if (erroUpload) {
            return res.send('ERRO: ' + erroUpload.message);
        }

        const codigo = (req.body.codigo_regiao || '').trim();
        const quantidade = parseInt(req.body.quantidade, 10);
        const endereco = (req.body.endereco || '').trim();

        // Converte a foto (se houver) em texto base64 para guardar no banco
        let imagemData = null;
        if (req.file) {
            imagemData = 'data:' + req.file.mimetype + ';base64,' +
                req.file.buffer.toString('base64');
        }

        if (!codigo || !quantidade || quantidade < 1) {
            return res.send('ERRO: Selecione um bairro e informe uma quantidade válida de focos.');
        }

        try {
            await pronto;
            // Inserção segura (parâmetros evitam SQL injection)
            await db.execute({
                sql: 'INSERT INTO ocorrencias_regiao (cd_setor, quantidade, endereco, imagem) ' +
                     'VALUES (?, ?, ?, ?)',
                args: [codigo, quantidade, endereco || null, imagemData]
            });

            res.send('sucesso');
        } catch (erro) {
            console.error('Erro ao gravar ocorrência:', erro);
            res.send('ERRO_BANCO: ' + erro.message);
        }
    });
});

// ============================================================
// ROTA 4 - ENTREGA A FOTO DE UMA OCORRÊNCIA
// O <img> do dashboard aponta para /api/imagem/:id
// ============================================================
app.get('/api/imagem/:id', async (req, res) => {
    try {
        await pronto;
        const resultado = await db.execute({
            sql: 'SELECT imagem FROM ocorrencias_regiao WHERE id = ?',
            args: [parseInt(req.params.id, 10)]
        });

        const linha = resultado.rows[0];
        if (!linha || !linha.imagem) {
            return res.status(404).send('Imagem não encontrada.');
        }

        // Separa o tipo (ex: image/jpeg) do conteúdo base64
        const partes = /^data:(.+?);base64,(.*)$/s.exec(linha.imagem);
        if (!partes) {
            return res.status(500).send('Imagem em formato inválido.');
        }

        res.set('Content-Type', partes[1]);
        res.send(Buffer.from(partes[2], 'base64'));
    } catch (erro) {
        console.error('Erro em /api/imagem:', erro);
        res.status(500).send('Falha ao carregar a imagem.');
    }
});

// ======================================================================
// INICIA O SERVIDOR (apenas quando rodado localmente)
// Na Vercel, o app é usado como função serverless e não chama listen().
// ======================================================================
if (require.main === module) {
    app.listen(PORTA, () => {
        console.log('============================================');
        console.log('  Disque Denúncia Queimadas - servidor no ar');
        console.log('  Acesse: http://localhost:' + PORTA);
        console.log('  (para parar o servidor, aperte Ctrl + C)');
        console.log('============================================');
    });
}
module.exports = app;
