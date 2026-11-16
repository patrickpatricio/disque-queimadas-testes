# Disque Denúncia Queimadas — Betim

Plataforma web de monitoramento de focos de queimada em Betim/MG.
Trabalho Interdisciplinar Extensionista — PUC Minas, Campus Betim.

## 🌐 Site no ar

**https://disquequeimadas.vercel.app**

- Hospedagem: **Vercel**
- Banco de dados: **Turso** (SQLite na nuvem)
- As fotos enviadas ficam guardadas dentro do próprio banco Turso.

Tudo é **permanente** — registros e fotos não se perdem.

---

## 1. Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Site (frontend) | HTML, CSS e JavaScript + Leaflet (mapas) e Chart.js (gráficos) |
| Servidor (backend) | Node.js + Express |
| Banco de dados | Turso (SQLite na nuvem) |
| Hospedagem | Vercel |

---

## 2. Estrutura das pastas

```
TRABALHO_SUSTENTABILIDADE/
├── index.html          → página principal
├── server.js           → servidor Node.js (Express) + rotas da API
├── db.js               → conexão com o banco (Turso ou local)
├── package.json        → dependências do projeto
├── vercel.json         → configuração do deploy na Vercel
├── .env                → credenciais do Turso (NÃO vai para o GitHub)
├── LEIA-ME.md          → este documento
├── css/style.css       → estilo visual
├── js/app.js           → lógica do frontend (mapas, abas, dashboard)
├── data/               → arquivos de mapa (.geojson)
├── assets/             → logos PUC e Betim
├── docs/               → PDF de apresentação e áudios
└── legado-php/         → versão antiga em PHP (backup, não é usada)
```

---

## 3. As 4 abas do sistema

| Aba | O que faz |
|-----|-----------|
| **Início** | Mapa de Betim com mapa de calor + formulário para registrar ocorrências. |
| **Sobre o Projeto** | Página acadêmica: problema, proposta, parceria com a prefeitura, logos. |
| **Dashboard** | Relatório detalhado: indicadores, gráfico por bairro, tabela de histórico e o "Quadro da Vergonha" com as fotos. |
| **Satélite NASA** | Mapa com dados térmicos da NASA FIRMS em tempo real. |

No registro de ocorrência (aba Início) há os campos: bairro, quantidade de
focos, **endereço** e **foto do local** (opcional, até 2 MB).

---

## 4. Rodar o projeto na sua máquina (opcional)

Útil para testar antes de publicar mudanças. Precisa ter o **Node.js**
instalado (<https://nodejs.org>).

No terminal, dentro da pasta do projeto:

```bash
npm install      # só na primeira vez — baixa as dependências
npm start        # liga o servidor
```

Depois acesse **http://localhost:3000**. Para parar, aperte `Ctrl + C`.

> O arquivo `.env` (com as credenciais do Turso) precisa existir na pasta.
> Ele conecta tanto a versão local quanto a online ao mesmo banco.

---

## 5. Como funciona o banco de dados

- O banco fica no **Turso** (nuvem). Não há nada para instalar.
- A conexão é feita pelo `db.js`, usando as credenciais do arquivo `.env`.
- A tabela é criada sozinha na primeira vez que o servidor roda.

Estrutura da tabela `ocorrencias_regiao`:

| Coluna | Conteúdo |
|--------|----------|
| `id` | número único da ocorrência |
| `cd_setor` | código do bairro (usado no mapa de calor) |
| `quantidade` | número de focos registrados |
| `endereco` | endereço/referência do local |
| `imagem` | a foto do local, guardada como texto (base64) |
| `data_hora` | data e hora do registro |

---

## 6. Rotas da API (server.js)

| Rota | Método | Função |
|------|--------|--------|
| `/api/focos` | GET | Total de focos por região (mapa de calor). |
| `/api/ocorrencias` | GET | Lista de ocorrências (Dashboard). |
| `/api/ocorrencias` | POST | Registra uma nova ocorrência + foto. |
| `/api/imagem/:id` | GET | Entrega a foto de uma ocorrência. |

---

## 7. Publicar uma atualização no site

Sempre que mudar algo no código e quiser atualizar o site no ar, rode no
terminal, dentro da pasta do projeto:

```bash
npx vercel deploy --prod
```

Em ~30 segundos o site **https://disquequeimadas.vercel.app** é atualizado.

> As credenciais do Turso já estão cadastradas na Vercel (variáveis
> `TURSO_DATABASE_URL` e `TURSO_AUTH_TOKEN`), então não precisa configurar
> nada de novo a cada deploy.

---

## 8. Avisos importantes

- **Nunca compartilhe o arquivo `.env`** nem o token do Turso — é a senha do
  banco. Ele já está no `.gitignore` para não ser enviado ao GitHub.
- As fotos têm limite de **2 MB** cada (para não pesar o banco).
- A pasta `legado-php/` é só um backup da versão antiga em PHP/MySQL — pode
  ser ignorada.

---

## 9. Problemas comuns

| Sintoma | Causa provável | Solução |
|---------|----------------|---------|
| `'node' não é reconhecido` | Node.js não instalado | Instalar o Node.js e reabrir o terminal. |
| Erro de banco ao rodar local | Falta o arquivo `.env` | Confirmar que o `.env` está na pasta do projeto. |
| Site no ar com erro de banco | Variáveis não cadastradas na Vercel | Conferir `TURSO_DATABASE_URL` e `TURSO_AUTH_TOKEN` no painel da Vercel. |
| Foto não envia | Imagem maior que 2 MB ou formato inválido | Usar JPG, PNG ou WEBP com até 2 MB. |
