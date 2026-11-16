### Processo 2 AS IS – MAPEAMENTO DE FOCOS

<img width="2004" height="1542" alt="Modelo_AS_IS_02" src="https://github.com/user-attachments/assets/094103c2-ed3c-4a96-99a0-6e5244fb6636" />

#### Detalhamento das atividades

**Atividade 1: Insere a denúncia em planilhas locais ou cadernos**

| Campo | Tipo | Restrições | Valor default |
| --- | --- | --- | --- |
| Data da Ocorrência | Data | dd-mm-aaaa | Data atual |
| Local / Endereço | Caixa de texto | | |
| Descrição | Área de texto | | |
| Status Interno | Seleção única | Aberto, Verificado, Fechado | Aberto |

| Comandos | Destino | Tipo |
| --- | --- | --- |
| salvar registro | Planilha de Armazenamento (Local) | default |
| descartar | Cancelamento do registro | cancel |


**Atividade 2: Verifica os dados nas planilhas**

| Campo | Tipo | Restrições | Valor default |
| --- | --- | --- | --- |
| Órgão Solicitado | Seleção única | Defesa Civil, Bombeiros, Pref. | |
| Período de Apuração | Data | dd-mm-aaaa a dd-mm-aaaa | |
| Arquivos Recebidos | Arquivo | Formatos .xls, .xlsx ou papel | |

| Comandos | Destino | Tipo |
| --- | --- | --- |
| abrir arquivos | Atividade: Compila manualmente os dados | default |


**Atividade 3: Compila manualmente os dados**

| Campo | Tipo | Restrições | Valor default |
| --- | --- | --- | --- |
| Planilha Mestre | Tabela | Matriz de dados (cópia manual) | |
| Total de Registros | Número | Soma das linhas copiadas | |
| Tratar Duplicidade | Seleção única | Sim, Não | Não |

| Comandos | Destino | Tipo |
| --- | --- | --- |
| salvar planilha | Atividade: Tenta mapear os focos | default |


**Atividade 4: Tenta mapear os focos e identificar padrões**

| Campo | Tipo | Restrições | Valor default |
| --- | --- | --- | --- |
| Região Crítica | Caixa de texto | Filtro de Excel | |
| Frequência de Focos | Número | Contagem por bairro | |
| Conclusões | Área de texto | Resumo para planejamento | |

| Comandos | Destino | Tipo |
| --- | --- | --- |
| gerar relatório | Fim do Processo | default |
