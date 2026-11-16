<?php
// API de dados agregados - alimenta o mapa de calor (heatmap)
// Retorna { codigo_da_regiao: total_de_focos, ... }
header('Content-Type: application/json');

require __DIR__ . '/conexao.php';

if ($conexao->connect_error) {
    die(json_encode(["erro" => "Falha na conexão com o banco"]));
}

// Soma a quantidade total de focos agrupada pelo código da região
$sql = "SELECT cd_setor, SUM(quantidade) AS quantidade FROM ocorrencias_regiao GROUP BY cd_setor";
$resultado = $conexao->query($sql);

$dados = array();

if ($resultado && $resultado->num_rows > 0) {
    while ($linha = $resultado->fetch_assoc()) {
        $dados[$linha["cd_setor"]] = (int) $linha["quantidade"];
    }
}

echo json_encode($dados);

$conexao->close();
?>
