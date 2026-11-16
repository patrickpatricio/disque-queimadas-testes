### Processo 1 AS IS – Denúncia de Queimada

<img width="1890" height="1306" alt="Modelo_AS_IS_01" src="https://github.com/user-attachments/assets/c227aa47-57fe-4990-b8da-076b39e6b561" />

#### Detalhamento das atividades

**Atividade 1: Liga para a Prefeitura ou Bombeiros**

| Campo | Tipo | Restrições | Valor default |
| --- | --- | --- | --- |
| Número de Destino | Número | 193 ou Telefone da Prefeitura | |
| Motivo da Ligação | Seleção única | Queimada, Acidente, Outros | Queimada |

| Comandos | Destino | Tipo |
| --- | --- | --- |
| iniciar chamada | Gateway (Sente insegurança?) | default |
| desligar | Fim do Processo (Desistência) | cancel |


**Atividade 2: Tenta explicar a localização sem o endereço exato**

| Campo | Tipo | Restrições | Valor default |
| --- | --- | --- | --- |
| Ponto de Referência | Área de texto | Relato verbal descritivo | |
| Bairro ou Região | Caixa de texto | | |
| Distância Estimada | Caixa de texto | | |

| Comandos | Destino | Tipo |
| --- | --- | --- |
| informar local | Atividade: Relata a gravidade | default |


**Atividade 3: Relata a gravidade sem poder enviar fotos**

| Campo | Tipo | Restrições | Valor default |
| --- | --- | --- | --- |
| Tamanho das Chamas | Seleção única | Baixa, Média, Alta | Média |
| Riscos Imediatos | Seleção múltipla | Casas próximas, Rede elétrica | |
| Presença de Fumaça | Seleção única | Pouca, Muita, Tóxica | |

| Comandos | Destino | Tipo |
| --- | --- | --- |
| concluir relato | Atividade: Recebe e interpreta as informações | default |


**Atividade 4: Recebe e interpreta as informações**

| Campo | Tipo | Restrições | Valor default |
| --- | --- | --- | --- |
| Compreensão do Local | Área de texto | Sujeito a falhas de comunicação | |
| Avaliação de Risco | Seleção única | Baixo, Médio, Alto | |
| Telefone do Denunciante | Número | Retido pela Bina ou oculto | Oculto |

| Comandos | Destino | Tipo |
| --- | --- | --- |
| confirmar dados | Atividade: Anota os dados em papel | default |
| pedir repetição | Retorna à fala do cidadão | default |


**Atividade 5: Anota os dados em papel ou sistema simples**

| Campo | Tipo | Restrições | Valor default |
| --- | --- | --- | --- |
| Data e Hora | Data e Hora | dd-mm-aaaa, hh:mm | |
| Endereço Interpretado | Área de texto | | |
| Descrição do Foco | Área de texto | | |
| Órgão Responsável | Seleção única | Bombeiros, Defesa Civil | |

| Comandos | Destino | Tipo |
| --- | --- | --- |
| salvar registro | Fim do Processo (Registro concluído) | default |
| descartar | Fim do Processo (Trote/falso alarme) | cancel |
