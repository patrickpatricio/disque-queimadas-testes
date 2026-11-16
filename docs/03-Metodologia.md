
# Metodologia


  O desenvolvimento do projeto “Denúncia de Queimadas Ilegais” foi conduzido utilizando a metodologia ágil Extreme Programming (XP), que prioriza entregas rápidas, feedback contínuo e adaptação às mudanças ao longo do desenvolvimento.

A equipe adotou uma abordagem incremental, dividindo o projeto em pequenas entregas (iterações), permitindo validar funcionalidades como o registro de denúncias, visualização no mapa e exibição das ocorrências.

Durante o desenvolvimento, foram aplicadas práticas da XP como:

- Desenvolvimento incremental
- Feedback contínuo entre os membros do grupo
- Simplicidade na implementação
- Comunicação constante

O projeto foi desenvolvido como uma aplicação web, utilizando tecnologias como HTML, CSS, JavaScript e integração com APIs para manipulação de dados e mapas.


## Controle de versão

A ferramenta de controle de versão adotada foi o Git, com hospedagem do repositório no GitHub.

O projeto seguiu a seguinte convenção de branches:

- main: versão estável e validada do sistema
- unstable: versão funcional, porém ainda sujeita a ajustes
- testing: versão em fase de testes
- dev: ambiente de desenvolvimento ativo
  
#🔧 Gestão de commits

Os commits foram realizados de forma frequente, com mensagens descritivas indicando claramente as alterações realizadas, como:

- “Adiciona mapa interativo”
- “Implementa registro de denúncias”
- “Corrige bug no envio de dados”
  
# Gestão de merges
- As alterações foram inicialmente feitas na branch dev
- Após testes, foram integradas na branch testing
- Após validação, foram promovidas para unstable
- E por fim, versões estáveis foram enviadas para main
  
# Gestão de tags

Foram utilizadas tags para marcar versões importantes do projeto, como:

- v1.0 – versão inicial funcional
- v1.1 – melhorias na interface
  
# Gestão de issues

A equipe utilizou o GitHub Issues para organização das tarefas, seguindo as etiquetas:

- documentation: melhorias na documentação
- bug: correção de erros
- enhancement: melhorias em funcionalidades existentes
- feature: novas funcionalidades
  
## Planejamento do projeto

###  Divisão de papéis

> Apresente a divisão de papéis entre os membros do grupo em cada Sprint. O desejável é que, em cada Sprint, o aluno assuma papéis diferentes na equipe. Siga o modelo do exemplo abaixo:

#### Sprint 1
- _Scrum master_: Arthur
- Protótipos: Stefano Gennaro
- Testes: Stefano Gennaro
- Documentação: Partick e Italo

#### Sprint 2
- _Scrum master_: Arthur
- Desenvolvedor Stefano Gennaro
- Desenvolvedor  Vladimir Valentim
- Testes: Rafael Ricardo
  
###  Quadro de tarefas

> Apresente a divisão de tarefas entre os membros do grupo e o acompanhamento da execução, conforme o exemplo abaixo.

#### Sprint 1

Atualizado em: 21/04/2024

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Arthur Henry      | Definição do tema | 01/04/2026     | 01/04/2026 | ✔️    | 01/04/2026      |
| Patrick e Italo     | Documentção    | 03/04/2024     | 08/04/2026 |  ✔️  |          08/04/2026       |
|  Vladimir Valentim | Histórias de usuário  | 02/04/2026    | 06/04/2026 | ✔️    |    06/04/2026    |
| Rafael Ricardo | Criação das personas  |    02/04/2026        | 06/04/2026 | ✔️    |   06/04/2026  |

#### Sprint 2

Atualizado em: 21/04/2024

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Arthur Henry  | Interface do sistema  | 09/04/2024     | 19/04/2024 | ✔️    | 11/04/2026      |
|  Stefano Gennaro  | Integração com mapa   | 03/04/2024     | 19/04/2024 | ✔️     |       16/04/2026          |
| Stefano Gennaro    | Backend (API)  | 01/04/2024     | 19/04/2024 | ✔️      |            17/04/2026     |
| Vladimir Valentim  | Testes do sistema  |  01/04/2024    | 19/04/2024 | ✔️     |     18/04/2026  |


Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado



### Processo

O grupo seguiu práticas inspiradas na metodologia XP, com ciclos curtos de desenvolvimento (iterações), permitindo a entrega contínua de funcionalidades.

O gerenciamento do projeto foi realizado por meio do GitHub Projects, onde foram organizadas as tarefas em colunas como:

- To do
- In progress
- Done

As issues foram utilizadas como base para o backlog do projeto, permitindo acompanhar o progresso e organizar as demandas.

A comunicação entre os membros ocorreu de forma contínua, garantindo alinhamento e resolução rápida de problemas.

## Ferramentas

Os artefatos do projeto foram desenvolvidos a partir de diferentes plataformas, conforme apresentado na tabela abaixo:
| Ambiente                    | Plataforma                  | Link de acesso                                                   |
| --------------------------- | --------------------------- | ---------------------------------------------------------------- |
| Repositório de código fonte | GitHub                      | [https://github.com/](https://github.com/)                       |
| Documentação do projeto     | GitHub                      | [https://github.com/](https://github.com/)                       |
| Gerenciamento do projeto    | GitHub Projects             | [https://github.com/](https://github.com/)                       |
| Desenvolvimento             | Visual Studio Code          | [https://code.visualstudio.com/](https://code.visualstudio.com/) |
| Mapa interativo             | Leaflet.js                  | [https://leafletjs.com/](https://leafletjs.com/)                 |
| Gráficos                    | Chart.js                    | [https://www.chartjs.org/](https://www.chartjs.org/)             |
| Hospedagem (protótipo)      | Localhost / possível deploy | —                                                                |
