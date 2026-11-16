// ============================================================
// Banco de dados (SQLite via @libsql/client)
//
// Funciona de dois jeitos, automaticamente:
//  - TURSO  : se o arquivo .env tiver as variáveis TURSO_DATABASE_URL e
//             TURSO_AUTH_TOKEN, usa o banco Turso na nuvem.
//  - LOCAL  : se não houver essas variáveis, cai para um arquivo local
//             (data/banco.db), bom para testar sem internet.
// ============================================================

const path = require('path');
const { createClient } = require('@libsql/client');

// Se as variáveis do Turso existirem, usa o banco na nuvem.
// Caso contrário, usa o arquivo local.
const url = process.env.TURSO_DATABASE_URL
    || 'file:' + path.join(__dirname, 'data', 'banco.db');
const authToken = process.env.TURSO_AUTH_TOKEN; // indefinido no modo local

const usandoTurso = Boolean(process.env.TURSO_DATABASE_URL);
console.log('Banco de dados: ' + (usandoTurso ? 'Turso (nuvem)' : 'arquivo local'));

const db = createClient({ url, authToken });

// Cria a tabela caso ainda não exista.
// "pronto" é uma Promise: as rotas aguardam ela antes de consultar o banco.
const pronto = db.execute(`
    CREATE TABLE IF NOT EXISTS ocorrencias_regiao (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        cd_setor   TEXT    NOT NULL,                            -- código do bairro (mapa de calor)
        quantidade INTEGER DEFAULT 0,                           -- número de focos registrados
        endereco   TEXT,                                        -- endereço/referência do local
        imagem     TEXT,                                        -- nome do arquivo da foto (pasta uploads/)
        data_hora  TEXT    DEFAULT (datetime('now','localtime'))-- data e hora do registro
    )
`);

module.exports = { db, pronto };
