const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

test('CT09 - Quantidades ausentes ou nulas', async () => {
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

    const ocorrenciasSimuladas = [
        {
            cd_setor: 'A',
            endereco: 'Teste sem quantidade',
            imagem: null
        },
        {
            cd_setor: 'A',
            quantidade: null,
            endereco: 'Teste quantidade nula',
            imagem: null
        }
    ];

    let configuracao;
    let erro = null;

    const ambiente = {
        dicBairros: { A: 'Centro' },
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

    console.log('Ocorrências:', ocorrencias);
    console.log('Total de focos:', focos);
    console.log('Bairros afetados:', bairros);
    console.log('Bairros no gráfico:', nomes);
    console.log('Focos por bairro:', valores);

    assert.equal(ocorrencias, 2);
    assert.equal(focos, 0);
    assert.equal(bairros, 1);

    assert.deepEqual(nomes, ['Centro']);
    assert.deepEqual(valores, [0]);
});