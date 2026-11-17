const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

test('CT03 - Código de bairro sem nome conhecido', () => {
    const arquivo = path.join(__dirname, '../js/app.js');
    const codigo = fs.readFileSync(arquivo, 'utf8');

    const inicio = codigo.search(/^function desenharGrafico\(/m);
    const fim = codigo.indexOf(
        '\natualizarMapaEDashboard();',
        inicio
    );

    assert.ok(
        inicio >= 0 && fim > inicio,
        'Não foi possível localizar desenharGrafico no app.js'
    );

    const elementos = {
        estatisticas: { innerHTML: '' },
        graficoBairros: { getContext: () => ({}) }
    };

    let configuracao;

    const ambiente = {
        dicBairros: {},
        meuGrafico: null,

        document: {
            getElementById: id => elementos[id]
        },

        Chart: function (tela, opcoes) {
            configuracao = opcoes;
        }
    };

    vm.runInNewContext(
        codigo.slice(inicio, fim),
        ambiente
    );

    ambiente.desenharGrafico(
        2,
        [{ id: 'Z', focos: 2 }]
    );

    const nomes = Array.from(configuracao.data.labels);
    const valores = Array.from(
        configuracao.data.datasets[0].data
    );

    console.log('Nomes dos bairros:', nomes);
    console.log('Quantidades de focos:', valores);

    assert.deepEqual(nomes, ['ID Z']);
    assert.deepEqual(valores, [2]);

    assert.ok(
        elementos.estatisticas.innerHTML.includes(
            '2 ocorrências ativas'
        )
    );
});