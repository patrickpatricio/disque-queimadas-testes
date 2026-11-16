-- ============================================================
-- Disque Denúncia Queimadas - Betim
-- Script de criação do banco de dados
-- Execute este arquivo no phpMyAdmin (XAMPP)
-- ============================================================

-- Cria o banco caso ainda não exista
CREATE DATABASE IF NOT EXISTS trabalho_sustentabilidade;

-- Define o banco como ativo para os próximos comandos
USE trabalho_sustentabilidade;

-- Recria a tabela do zero (projeto acadêmico, sem dados de produção)
DROP TABLE IF EXISTS ocorrencias_regiao;

-- Tabela de registro de focos de queimada/irregularidades
-- Agora cada linha representa UMA ocorrência registrada
CREATE TABLE ocorrencias_regiao (
    id         INT AUTO_INCREMENT PRIMARY KEY,        -- Identificador único
    cd_setor   VARCHAR(20)  NOT NULL,                 -- Código do bairro/setor (usado no mapa de calor)
    quantidade INT          DEFAULT 0,                -- Número de focos registrados nesta ocorrência
    endereco   VARCHAR(255) DEFAULT NULL,             -- Endereço/referência do local da queimada
    imagem     VARCHAR(255) DEFAULT NULL,             -- Caminho da foto enviada (pasta uploads/)
    data_hora  DATETIME     DEFAULT CURRENT_TIMESTAMP -- Data e hora do registro
);
