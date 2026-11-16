<?php
// API detalhada - alimenta o dashboard e o "quadro da vergonha"
// Retorna a lista de ocorrências individuais, da mais recente para a mais antiga
header('Content-Type: application/json');

require __DIR__ . '/conexao.php';

if ($conexao->connect_error) {
    die(json_encode(["erro" => "Falha na conexão com o banco"]));
}

$sql = "SELECT id, cd_setor, quantidade, endereco, imagem, data_hora
        FROM ocorrencias_regiao
        ORDER BY data_hora DESC";
$resultado = $conexao->query($sql);

$dados = array();

if ($resultado && $resultado->num_rows > 0) {
    while ($linha = $resultado->fetch_assoc()) {
        $dados[] = [
            "id"         => (int) $linha["id"],
            "cd_setor"   => $linha["cd_setor"],
            "quantidade" => (int) $linha["quantidade"],
            "endereco"   => $linha["endereco"],
            // Caminho relativo da imagem para ser exibido no frontend
            "imagem"     => $linha["imagem"] ? "uploads/" . $linha["imagem"] : null,
            "data_hora"  => $linha["data_hora"]
        ];
    }
}

echo json_encode($dados);

$conexao->close();
?>
