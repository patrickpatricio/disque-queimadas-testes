// ===========================================================
// Disque Denúncia Queimadas - Betim
// Lógica principal da aplicação (mapas, abas, dashboard)
// ===========================================================

// Dicionário CD_BAIRRO -> NM_BAIRRO, preenchido ao carregar os bairros
var dicBairros = {};

// ===========================================================
// 1. NAVEGAÇÃO ENTRE ABAS
// ===========================================================
function mudarAba(idAba, botaoClicado) {
    document.querySelectorAll('.conteudo-aba').forEach(aba => aba.classList.remove('ativa'));
    document.querySelectorAll('.btn-aba').forEach(btn => btn.classList.remove('ativa'));

    document.getElementById(idAba).classList.add('ativa');
    botaoClicado.classList.add('ativa');

    // Os mapas Leaflet precisam recalcular o tamanho ao serem exibidos
    setTimeout(() => {
        if (mapa) mapa.invalidateSize();
        if (mapaNasa) mapaNasa.invalidateSize();
    }, 120);

    // Ao abrir o dashboard, recarrega os dados detalhados
    if (idAba === 'aba-dashboard') {
        carregarDashboard();
    }
}

// ==========================================================
// 2. MAPA DA NASA FIRMS (AO VIVO)
// ==========================================================
var limitesBetim = L.latLngBounds(
    [-20.25, -44.50],
    [-19.70, -43.90]
);

var mapaNasa = L.map('mapaNasa', {
    center: [-19.9678, -44.1983],
    zoom: 11,
    minZoom: 10,
    maxZoom: 15,
    maxBounds: limitesBetim,
    maxBoundsViscosity: 1.0
});

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri'
}).addTo(mapaNasa);

var urlNasaFIRMS = 'https://firms.modaps.eosdis.nasa.gov/mapserver/wms/fires/d62e98b6a969c4671a2bcc28e496a88c/';

L.tileLayer.wms(urlNasaFIRMS, {
    layers: 'fires_viirs_snpp_7,fires_modis_7',
    format: 'image/png',
    transparent: true,
    attribution: '&copy; NASA FIRMS'
}).addTo(mapaNasa);

fetch('data/municipio_betim.geojson').then(res => res.json()).then(dados => {
    L.geoJSON(dados, { style: { color: '#00ffff', weight: 3, fillColor: '#000000', fillOpacity: 0.1, dashArray: '6, 6' } }).addTo(mapaNasa);
});

fetch('data/bairros_betim.geojson').then(res => res.json()).then(dados => {
    L.geoJSON(dados, {
        style: { color: '#f1c40f', weight: 1, fillOpacity: 0 },
        onEachFeature: function (feature, layer) {
            layer.bindTooltip("<b>" + feature.properties.NM_BAIRRO + "</b>", { sticky: true, direction: 'auto' });
        }
    }).addTo(mapaNasa);
});

// ==========================================================
// 3. MAPA LOCAL E MINI DASHBOARD (ABA INÍCIO)
// ==========================================================
var mapaBase = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 });
var mapa = L.map('meuMapa', { center: [-19.9678, -44.1983], zoom: 12, layers: [mapaBase] });

var camadaMunicipio = L.layerGroup();
var camadaBairros = L.layerGroup().addTo(mapa);
var camadaSetores = L.layerGroup();

var controles = { "Visão Global": camadaMunicipio, "Visão Macro": camadaBairros, "Visão Micro": camadaSetores };
L.control.layers(null, controles, { collapsed: false }).addTo(mapa);

// Popula o <select> de bairros e monta o dicionário de nomes
fetch('data/bairros_betim.geojson')
    .then(res => res.json())
    .then(dados => {
        var select = document.getElementById('comboBairros');
        select.innerHTML = '<option value="">-- Selecione o Bairro --</option>';
        var bairros = dados.features.map(f => f.properties).sort((a, b) => a.NM_BAIRRO.localeCompare(b.NM_BAIRRO));
        bairros.forEach(b => {
            dicBairros[b.CD_BAIRRO] = b.NM_BAIRRO;
            select.innerHTML += `<option value="${b.CD_BAIRRO}">${b.NM_BAIRRO}</option>`;
        });
    })
    .catch(erro => console.error("Faltou o arquivo data/bairros_betim.geojson", erro));

let meuGrafico = null;

function atualizarMapaEDashboard() {
    camadaMunicipio.clearLayers();
    camadaBairros.clearLayers();
    camadaSetores.clearLayers();

    fetch('/api/focos')
        .then(r => r.json())
        .then(dadosDoBanco => {
            var total = 0;
            var ranking = [];

            for (var id in dadosDoBanco) {
                var q = parseInt(dadosDoBanco[id]);
                total += q;
                ranking.push({ id: id, focos: q });
            }
            ranking.sort((a, b) => b.focos - a.focos);

            function corGeral(q) { return q >= 500 ? '#d32f2f' : (q >= 150 ? '#f57c00' : (q > 0 ? '#388e3c' : '#cccccc')); }
            function corReg(q) { return q >= 40 ? '#d32f2f' : (q >= 15 ? '#f57c00' : (q > 0 ? '#388e3c' : '#cccccc')); }
            function estilo(cor) { return { fillColor: cor, weight: 2, color: '#333', dashArray: '4, 4', fillOpacity: 0.65 }; }

            fetch('data/municipio_betim.geojson').then(r => r.json()).then(d => {
                L.geoJSON(d, { style: estilo(corGeral(total)), onEachFeature: (f, l) => l.bindPopup("<b>Betim</b><br>Total: " + total) }).addTo(camadaMunicipio);
            }).catch(() => console.log("Arquivo data/municipio_betim.geojson não encontrado."));

            fetch('data/bairros_betim.geojson').then(r => r.json()).then(d => {
                L.geoJSON(d, {
                    style: f => estilo(corReg(dadosDoBanco[f.properties.CD_BAIRRO] || 0)),
                    onEachFeature: (f, l) => {
                        l.bindPopup(`<b>${f.properties.NM_BAIRRO}</b><br>Focos: ${dadosDoBanco[f.properties.CD_BAIRRO] || 0}`);
                    }
                }).addTo(camadaBairros);

                desenharGrafico(total, ranking);
            }).catch(() => console.log("Arquivo data/bairros_betim.geojson não encontrado."));

            fetch('data/betim.geojson').then(r => r.json()).then(d => {
                L.geoJSON(d, {
                    style: f => estilo(corReg(dadosDoBanco[f.properties.CD_SETOR] || 0)),
                    onEachFeature: (f, l) => l.bindPopup(`<b>Setor:</b> ${f.properties.CD_SETOR}<br>Focos: ${dadosDoBanco[f.properties.CD_SETOR] || 0}`)
                }).addTo(camadaSetores);
            }).catch(() => console.log("Arquivo data/betim.geojson não encontrado."));
        })
        .catch(erro => {
            console.error("ERRO CRÍTICO NA API: O arquivo não retornou JSON.", erro);
            document.getElementById('estatisticas').innerHTML = `<p style="color:red;">Falha de comunicação com o Banco de Dados.</p>`;
        });
}

function desenharGrafico(total, ranking) {
    document.getElementById('estatisticas').innerHTML =
        `<div class="card-total"><strong>Total de Focos</strong><span>${total} ocorrências ativas</span></div>`;

    var labels = [], dados = [], lim = ranking.length > 5 ? 5 : ranking.length;

    for (var i = 0; i < lim; i++) {
        labels.push(dicBairros[ranking[i].id] || "ID " + ranking[i].id);
        dados.push(ranking[i].focos);
    }

    if (meuGrafico) meuGrafico.destroy();

    meuGrafico = new Chart(document.getElementById('graficoBairros').getContext('2d'), {
        type: 'bar',
        data: { labels: labels, datasets: [{ label: 'Focos', data: dados, backgroundColor: '#d32f2f', borderRadius: 4 }] },
        options: { responsive: true, plugins: { legend: { display: false }, title: { display: true, text: 'Top 5 Bairros' } }, scales: { y: { beginAtZero: true } } }
    });
}

//Função Refatorada

// function desenharGrafico(total, ranking) {
//     document.getElementById('estatisticas').innerHTML =
//         `<div class="card-total"><strong>Total de Focos</strong><span>${total} ocorrências ativas</span></div>`;

//     var { labels, dados } = prepararDadosGrafico(ranking, dicBairros);

//     if (meuGrafico) meuGrafico.destroy();

//     meuGrafico = new Chart(
//         document.getElementById('graficoBairros').getContext('2d'),
//         {
//             type: 'bar',
//             data: {
//                 labels: labels,
//                 datasets: [{
//                     label: 'Focos',
//                     data: dados,
//                     backgroundColor: '#d32f2f',
//                     borderRadius: 4
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 plugins: {
//                     legend: { display: false },
//                     title: {
//                         display: true,
//                         text: 'Top 5 Bairros'
//                     }
//                 },
//                 scales: {
//                     y: { beginAtZero: true }
//                 }
//             }
//         }
//     );
// }

// function prepararDadosGrafico(ranking, bairros) {
//     var selecionados = ranking.slice(0, 5);

//     return {
//         labels: selecionados.map(
//             item => bairros[item.id] || "ID " + item.id
//         ),
//         dados: selecionados.map(item => item.focos)
//     };
// }

// Fim Função Refatorada

atualizarMapaEDashboard();

// ==========================================================
// 4. SALVAR DADOS VIA AJAX (com upload de imagem)
// ==========================================================
document.getElementById('formOcorrencias').addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = document.getElementById('btnSalvar');
    btn.disabled = true;
    btn.innerHTML = "Processando...";

    fetch('/api/ocorrencias', { method: 'POST', body: new FormData(this) })
        .then(r => r.text())
        .then(res => {
            if (res.trim() === "sucesso") {
                document.getElementById('formOcorrencias').reset();
                atualizarMapaEDashboard();
                alert("Ocorrência registrada e mapa atualizado!");
            } else {
                alert("ERRO AO GRAVAR:\n\n" + res);
            }
            btn.disabled = false;
            btn.innerHTML = "Registrar Ocorrência";
        })
        .catch(erro => {
            alert("Erro de conexão: " + erro);
            btn.disabled = false;
            btn.innerHTML = "Registrar Ocorrência";
        });
});

// ==========================================================
// 5. DASHBOARD DETALHADO (ABA DASHBOARD)
// ==========================================================
let graficoRelatorio = null;

function formatarDataHora(texto) {
    if (!texto) return "-";
    var d = new Date(texto.replace(' ', 'T'));
    if (isNaN(d)) return texto;
    return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function carregarDashboard() {
    fetch('/api/ocorrencias')
        .then(r => r.json())
        .then(lista => {
            if (!Array.isArray(lista)) lista = [];

           // --- KPIs ---
            var totalFocos = lista.reduce((s, o) => s + (o.quantidade || 0), 0);
            var bairrosAfetados = new Set(lista.map(o => o.cd_setor)).size;

            document.getElementById('kpiOcorrencias').textContent = lista.length;
            document.getElementById('kpiFocos').textContent = totalFocos;
            document.getElementById('kpiBairros').textContent = bairrosAfetados;

            // --- Gráfico de relatório: focos por bairro ---
            var porBairro = {};
            lista.forEach(o => {
                var nome = dicBairros[o.cd_setor] || ("Região " + o.cd_setor);
                porBairro[nome] = (porBairro[nome] || 0) + (o.quantidade || 0);
            });
            var pares = Object.entries(porBairro).sort((a, b) => b[1] - a[1]).slice(0, 8);

           // Função refatorada
           
            // var { totalOcorrencias, totalFocos, bairrosAfetados, pares } = calcularResumoDashboard(lista, dicBairros);

            // document.getElementById('kpiOcorrencias').textContent = totalOcorrencias;
            // document.getElementById('kpiFocos').textContent = totalFocos;
            // document.getElementById('kpiBairros').textContent = bairrosAfetados;

            // if (graficoRelatorio) graficoRelatorio.destroy();
            // graficoRelatorio = new Chart(document.getElementById('graficoRelatorio').getContext('2d'), {
            //     type: 'bar',
            //     data: {
            //         labels: pares.map(p => p[0]),
            //         datasets: [{ label: 'Focos registrados', data: pares.map(p => p[1]), backgroundColor: '#f57c00', borderRadius: 4 }]
            //     },
            //     options: {
            //         responsive: true,
            //         plugins: { legend: { display: false }, title: { display: true, text: 'Focos por bairro (Top 8)' } },
            //         scales: { y: { beginAtZero: true } }
            //     }
            // });

            // Fim Função refatorada

            // --- Tabela de ocorrências ---
            var corpo = document.getElementById('corpoTabela');
            if (lista.length === 0) {
                corpo.innerHTML = '<tr><td colspan="5" class="aviso-vazio">Nenhuma ocorrência registrada ainda.</td></tr>';
            } else {
                corpo.innerHTML = lista.map(o => `
                    <tr>
                        <td>${dicBairros[o.cd_setor] || ("Região " + o.cd_setor)}</td>
                        <td>${o.endereco ? o.endereco : '<span class="aviso-vazio">Não informado</span>'}</td>
                        <td><span class="tag-focos">${o.quantidade}</span></td>
                        <td>${formatarDataHora(o.data_hora)}</td>
                        <td>${o.imagem ? 'Sim' : 'Não'}</td>
                    </tr>
                `).join('');
            }

            // --- Quadro da vergonha (galeria de fotos) ---
            var galeria = document.getElementById('galeriaVergonha');
            var comFoto = lista.filter(o => o.imagem);
            if (comFoto.length === 0) {
                galeria.innerHTML = '<p class="aviso-vazio">Nenhuma foto enviada ainda. As imagens registradas pelos cidadãos aparecerão aqui.</p>';
            } else {
                galeria.innerHTML = comFoto.map(o => `
                    <div class="foto-card">
                        <img src="${o.imagem}" alt="Foco de queimada">
                        <div class="legenda">
                            <strong>${dicBairros[o.cd_setor] || ("Região " + o.cd_setor)}</strong>
                            ${o.endereco ? o.endereco + '<br>' : ''}
                            ${formatarDataHora(o.data_hora)}
                        </div>
                    </div>
                `).join('');
            }
        })
        .catch(erro => {
            console.error("Erro ao carregar o dashboard detalhado.", erro);
        });
}

// Função auxiliar da refatoração

// function calcularResumoDashboard(lista, bairros) {
//     var totalFocos = lista.reduce(
//         (soma, ocorrencia) => soma + (ocorrencia.quantidade || 0),
//         0
//     );

//     var bairrosAfetados = new Set(
//         lista.map(o => o.cd_setor)
//     ).size;

//     var porBairro = {};

//     lista.forEach(o => {
//         var nome = bairros[o.cd_setor] || ("Região " + o.cd_setor);

//         porBairro[nome] =
//             (porBairro[nome] || 0) + (o.quantidade || 0);
//     });

//     var pares = Object.entries(porBairro)
//         .sort((a, b) => b[1] - a[1])
//         .slice(0, 8);

//     return {
//         totalOcorrencias: lista.length,
//         totalFocos,
//         bairrosAfetados,
//         pares
//     };
// }
