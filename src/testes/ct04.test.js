const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

test('CT04 - Limitar gráfico a cinco bairros', () => {
    const arquivo = path.join(__dirname, '../js/app.js');
    const codigo = fs.readFileSync(arquivo, 'utf8');

    const inicio = codigo.indexOf('function desenharGrafico(');
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

    const ranking = [
        { id: 'A', focos: 10 },
        { id: 'B', focos: 9 },
        { id: 'C', focos: 8 },
        { id: 'D', focos: 7 },
        { id: 'E', focos: 6 },
        { id: 'F', focos: 5 },
        { id: 'G', focos: 4 }
    ];

    ambiente.desenharGrafico(49, ranking);

    const nomes = Array.from(configuracao.data.labels);
    const valores = Array.from(
        configuracao.data.datasets[0].data
    );

    console.log('Bairros recebidos:', ranking.length);
    console.log('Bairros enviados ao gráfico:', nomes.length);
    console.log('Nomes dos bairros:', nomes);
    console.log('Quantidades de focos:', valores);

    assert.equal(nomes.length, 5);

    assert.deepEqual(nomes, [
        'ID A', 'ID B', 'ID C', 'ID D', 'ID E'
    ]);

    assert.deepEqual(valores, [10, 9, 8, 7, 6]);

    assert.ok(
        elementos.estatisticas.innerHTML.includes(
            '49 ocorrências ativas'
        )
    );
});