# Plano de Testes de Software

## Objetivo dos Testes

Os testes foram realizados com o objetivo de validar as principais funcionalidades do sistema *Disque Denúncia Queimadas e Irregularidades*, verificando se os requisitos definidos na especificação do projeto foram atendidos. Os cenários foram executados pelos integrantes da equipe em diferentes dispositivos e navegadores, simulando situações reais de utilização da plataforma.

---

## Cenários de Teste

### CT-001 – Visualizar Dashboard Ambiental

| Campo | Descrição |
|---------|---------|
| Requisito associado | RF-001 – Permitir ao usuário visualizar o dashboard ambiental. |
| Objetivo do teste | Verificar se o mapa, indicadores e gráficos são carregados corretamente. |
| Passos | 1. Acessar o sistema.<br>2. Aguardar o carregamento da página.<br>3. Verificar a exibição do mapa e dos gráficos. |
| Critério de êxito | O dashboard é exibido corretamente com todas as informações. |
| Responsável | Equipe do projeto |

---

### CT-002 – Alterar Camadas Geográficas

| Campo | Descrição |
|---------|---------|
| Requisito associado | RF-002 – Permitir a visualização por município, bairros e setores censitários. |
| Objetivo do teste | Verificar o funcionamento do controle de camadas do mapa. |
| Passos | 1. Acessar o dashboard.<br>2. Selecionar uma camada geográfica diferente.<br>3. Verificar a atualização do mapa. |
| Critério de êxito | O mapa apresenta corretamente a camada selecionada. |
| Responsável | Equipe do projeto |

---

### CT-003 – Registrar Nova Denúncia

| Campo | Descrição |
|---------|---------|
| Requisito associado | RF-004 – Permitir o registro de denúncias ambientais. |
| Objetivo do teste | Verificar se uma denúncia pode ser cadastrada no sistema. |
| Passos | 1. Abrir o formulário de denúncia.<br>2. Preencher os dados solicitados.<br>3. Enviar o formulário. |
| Critério de êxito | A denúncia é registrada com sucesso no banco de dados. |
| Responsável | Equipe do projeto |

---


### CT-004 – Responsividade da Plataforma

| Campo | Descrição |
|---------|---------|
| Requisito associado | RNF-001 – O sistema deve ser responsivo. |
| Objetivo do teste | Verificar a adaptação da interface em diferentes dispositivos. |
| Passos | 1. Acessar o sistema em computador.<br>2. Acessar o sistema em smartphone.<br>3. Comparar a exibição dos elementos. |
| Critério de êxito | A interface adapta-se corretamente aos diferentes tamanhos de tela. |
| Responsável | Equipe do projeto |

---

## Ferramentas de Teste

Os testes foram realizados utilizando:

- Google Chrome;
- Ferramentas de Desenvolvedor dos Navegadores (DevTools);
- Ambiente local com XAMPP;
- Plataforma hospedada na Vercel.

Os resultados obtidos demonstraram que as principais funcionalidades da aplicação operam conforme os requisitos definidos durante a fase de especificação do projeto.
