<?php
// Registra uma nova ocorrência de queimada
// Recebe os dados via POST (multipart/form-data) e a foto opcional do local
header('Content-Type: text/plain; charset=utf-8');

require __DIR__ . '/conexao.php';

if ($conexao->connect_error) {
    die("Erro Crítico de Conexão: " . $conexao->connect_error);
}

// --- Leitura e validação dos campos do formulário ---
$codigo     = trim($_POST['codigo_regiao'] ?? '');
$quantidade = (int) ($_POST['quantidade'] ?? 0);
$endereco   = trim($_POST['endereco'] ?? '');

if ($codigo === '' || $quantidade < 1) {
    die("ERRO: Selecione um bairro e informe uma quantidade válida de focos.");
}

// --- Upload da imagem (opcional) ---
$nomeImagem = null;

if (isset($_FILES['imagem']) && $_FILES['imagem']['error'] === UPLOAD_ERR_OK) {
    $arquivo = $_FILES['imagem'];

    // Limite de tamanho: 5 MB
    if ($arquivo['size'] > 5 * 1024 * 1024) {
        die("ERRO: A imagem é muito grande (máximo 5 MB).");
    }

    // Valida que o arquivo é realmente uma imagem
    $tiposPermitidos = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'];
    $infoImagem = getimagesize($arquivo['tmp_name']);

    if ($infoImagem === false || !isset($tiposPermitidos[$infoImagem['mime']])) {
        die("ERRO: O arquivo enviado não é uma imagem válida (use JPG, PNG ou WEBP).");
    }

    $extensao = $tiposPermitidos[$infoImagem['mime']];
    // Nome único para evitar sobrescrever arquivos
    $nomeImagem = 'foco_' . date('YmdHis') . '_' . uniqid() . '.' . $extensao;

    $pastaDestino = __DIR__ . '/../uploads/';
    if (!move_uploaded_file($arquivo['tmp_name'], $pastaDestino . $nomeImagem)) {
        die("ERRO: Não foi possível salvar a imagem no servidor.");
    }
}

// --- Inserção segura no banco (prepared statement evita SQL injection) ---
$sql = "INSERT INTO ocorrencias_regiao (cd_setor, quantidade, endereco, imagem)
        VALUES (?, ?, ?, ?)";
$stmt = $conexao->prepare($sql);

if ($stmt === false) {
    die("ERRO_MYSQL: " . $conexao->error);
}

// Endereço vazio é gravado como NULL
$enderecoFinal = $endereco !== '' ? $endereco : null;
$stmt->bind_param("siss", $codigo, $quantidade, $enderecoFinal, $nomeImagem);

if ($stmt->execute()) {
    echo "sucesso";
} else {
    echo "ERRO_MYSQL: " . $stmt->error;
}

$stmt->close();
$conexao->close();
?>
