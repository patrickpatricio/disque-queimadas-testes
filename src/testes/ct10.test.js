const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

test('CT10 - Ordenar e limitar ranking a oito bairros', async () => {
    const arquivo = path.join(__dirname, '../js/app.js');
    const codigo = fs.readFileSync(arquivo, 'utf8');

    const inicio = codigo.indexOf(
        'function formatarDataHora('
    );

    assert.ok(
        inicio >= 0 && codigo.includes('function carregarDashboard()'),
        'Não foi possível localizar as funções do Dashboard'
    );

    const elementos = {
        kpiOcorrencias: { textContent: '' },
        kpiFocos: { textContent: '' },
        kpiBairros: { textContent: '' },
        graficoRelatorio: { getContext: () => ({}) },
        corpoTabela: { innerHTML: '' },
        galeriaVergonha: { innerHTML: '' }
    };

    const ocorrenciasSimuladas = [];

    for (let i = 1; i <= 10; i++) {
        ocorrenciasSimuladas.push({
            cd_setor: String(i),
            quantidade: i,
            endereco: 'Teste bairro ' + i,
            imagem: null
        });
    }

    const copiaAntes = JSON.stringify(ocorrenciasSimuladas);

    let configuracao;
    let erro = null;

    const ambiente = {
        dicBairros: {},
        graficoRelatorio: null,

        document: {
            getElementById: id => elementos[id]
        },

        fetch: () => Promise.resolve({
            json: () => Promise.resolve(ocorrenciasSimuladas)
        }),

        Chart: function (tela, opcoes) {
            configuracao = opcoes;
        },

        console: {
            error: (...mensagens) => {
                erro = mensagens;
            }
        }
    };

    vm.runInNewContext(codigo.slice(inicio), ambiente);
    ambiente.carregarDashboard();

    await new Promise(resolve => setImmediate(resolve));

    assert.equal(erro, null, 'A função apresentou um erro');

    assert.ok(
        configuracao,
        'O gráfico não recebeu configuração'
    );

    const ocorrencias = Number(
        elementos.kpiOcorrencias.textContent
    );

    const focos = Number(
        elementos.kpiFocos.textContent
    );

    const bairros = Number(
        elementos.kpiBairros.textContent
    );

    const nomes = Array.from(configuracao.data.labels);

    const valores = Array.from(
        configuracao.data.datasets[0].data
    );

    const dadosPreservados =
        JSON.stringify(ocorrenciasSimuladas) === copiaAntes;

    console.log('Ocorrências:', ocorrencias);
    console.log('Total de focos:', focos);
    console.log('Bairros afetados:', bairros);
    console.log('Bairros enviados ao gráfico:', nomes.length);
    console.log('Ordem dos bairros:', nomes);
    console.log('Focos por bairro:', valores);
    console.log('Dados originais preservados:', dadosPreservados);

    assert.equal(ocorrencias, 10);
    assert.equal(focos, 55);
    assert.equal(bairros, 10);
    assert.equal(nomes.length, 8);

    assert.deepEqual(nomes, [
        'Região 10',
        'Região 9',
        'Região 8',
        'Região 7',
        'Região 6',
        'Região 5',
        'Região 4',
        'Região 3'
    ]);

    assert.deepEqual(valores, [10, 9, 8, 7, 6, 5, 4, 3]);
    assert.equal(dadosPreservados, true);
});