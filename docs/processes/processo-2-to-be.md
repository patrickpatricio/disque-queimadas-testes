### Processo 2 TO BE – GESTÃO E VISIBILIDADE DE DENÚNCIAS

<img width="2604" height="1716" alt="Modelo_TO_BE_02" src="https://github.com/user-attachments/assets/0478dfce-3966-4d90-997a-a9fbdfce3a06" />

#### Detalhamento das atividades

**Atividade Paralela 1: Publica registro no 'Mural da Vergonha'**

| Campo | Tipo | Restrições | Valor default |
| --- | --- | --- | --- |
| Visibilidade | Seleção única | Público / Privado (Booleano) | Público |
| Dados Exibidos | Tabela | Leitura de banco de dados | |
| Ocultação (Nome) | Seleção única | Booleano | Sim |

| Comandos | Destino | Tipo |
| --- | --- | --- |
| atualizar tela | Tela do Mural Público | default |


**Atividade Paralela 1: Atualiza banco consolidado e mapas de calor**

| Campo | Tipo | Restrições | Valor default |
| --- | --- | --- | --- |
| Coordenadas GPS | Número | Extraído da denúncia | |
| Densidade | Número | Cor/intensidade no mapa | |

| Comandos | Destino | Tipo |
| --- | --- | --- |
| recalcular mapa | Dashboard das Autoridades | default |


**Atividade 3: Acessam a plataforma de dados unificada**

| Campo | Tipo | Restrições | Valor default |
| --- | --- | --- | --- |
| E-mail Institucional| Caixa de Texto | Formato de e-mail | |
| Senha | Caixa de Texto | Mínimo de 8 caracteres | |

| Comandos | Destino | Tipo |
| --- | --- | --- |
| entrar | Atividade: Visualizam o mapa de calor | default |
| recuperar senha | Fluxo de recuperação | cancel |


**Atividade 4: Visualizam o mapa de calor e analisa as áreas críticas**

| Campo | Tipo | Restrições | Valor default |
| --- | --- | --- | --- |
| Filtro de Período | Data e Hora | dd-mm-aaaa | 7 dias |
| Filtro de Status | Seleção múltipla | Aberto, Atendido, Resolvido | Aberto |
| Mapa Interativo | Imagem | Renderização API Mapas | |
| Lista de Denúncias | Tabela | Sincronizada com os filtros | |

| Comandos | Destino | Tipo |
| --- | --- | --- |
| aplicar filtros | Atualizar Mapa e Tabela | default |
| analisar dados | Gateway Paralelo | default |


**Atividade Paralela 2.1: Direcionamento de viaturas**

| Campo | Tipo | Restrições | Valor default |
| --- | --- | --- | --- |
| Denúncia ID | Número | Somente leitura | |
| Equipe Designada | Seleção única | Lista de viaturas | |
| Atualizar Status | Seleção única | Em Atendimento, Resolvido | Atendimento |

| Comandos | Destino | Tipo |
| --- | --- | --- |
| confirmar despacho| Banco de Dados (salva status) | default |
| cancelar | Retorna ao Painel | cancel |


**Atividade Paralela 2.2: Planejamentos da campanhas de prevenção e educação**

| Campo | Tipo | Restrições | Valor default |
| --- | --- | --- | --- |
| Bairros Críticos | Seleção múltipla | Extraído do mapa de calor | |
| Descrição da Ação | Área de texto | | |
| Data da Campanha | Data | dd-mm-aaaa | |

| Comandos | Destino | Tipo |
| --- | --- | --- |
| registrar | Banco de Dados / Módulo Campanhas | default |
| exportar pdf | Download | default |
