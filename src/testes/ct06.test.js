const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

test('CT06 - Dashboard sem ocorrências', async () => {
    const arquivo = path.join(__dirname, '../js/app.js');
    const codigo = fs.readFileSync(arquivo, 'utf8');

    const inicio = codigo.indexOf(
        'function carregarDashboard()'
    );

    assert.ok(
        inicio >= 0,
        'Não foi possível localizar carregarDashboard'
    );

    const elementos = {
        kpiOcorrencias: { textContent: '' },
        kpiFocos: { textContent: '' },
        kpiBairros: { textContent: '' },
        graficoRelatorio: { getContext: () => ({}) },
        corpoTabela: { innerHTML: '' },
        galeriaVergonha: { innerHTML: '' }
    };

    let configuracao;
    let erro = null;

    const ambiente = {
        dicBairros: {},
        graficoRelatorio: null,

        document: {
            getElementById: id => elementos[id]
        },

        fetch: () => Promise.resolve({
            json: () => Promise.resolve([])
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

    console.log('Ocorrências:', ocorrencias);
    console.log('Total de focos:', focos);
    console.log('Bairros afetados:', bairros);

    assert.equal(ocorrencias, 0);
    assert.equal(focos, 0);
    assert.equal(bairros, 0);

    assert.deepEqual(
        Array.from(configuracao.data.labels),
        []
    );

    assert.deepEqual(
        Array.from(configuracao.data.datasets[0].data),
        []
    );

    assert.ok(
        elementos.corpoTabela.innerHTML.includes(
            'Nenhuma ocorrência registrada ainda.'
        )
    );
});