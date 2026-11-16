<?php
// Conexão compartilhada com o banco de dados MySQL (XAMPP)
// Incluída por api.php, api_detalhe.php e salvar.php

$conexao = new mysqli('localhost', 'root', '', 'trabalho_sustentabilidade');

// Garante que os dados sejam tratados em UTF-8 (acentuação correta)
$conexao->set_charset('utf8mb4');
?>
