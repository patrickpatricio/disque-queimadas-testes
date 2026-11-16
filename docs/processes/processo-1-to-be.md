### Processo 1 TO BE – REGISTRO DIGITAL DA DENÚNCIA

<img width="2716" height="1298" alt="Modelo_TO_BE_01" src="https://github.com/user-attachments/assets/0b5c04ff-d4a8-4f13-99f0-63fc930d0437" />

#### Detalhamento das atividades

**Atividade 1: Acessa o sistema web via celular ou PC**

| Campo | Tipo | Restrições | Valor default |
| --- | --- | --- | --- |
| Permissão de GPS | Seleção única | Navegador pede localização | Pendente |
| Termos de Uso | Seleção múltipla | Aceite obrigatório (Checkbox) | Falso |

| Comandos | Destino | Tipo |
| --- | --- | --- |
| iniciar denúncia | Atividade: Descreve o local exato | default |


**Atividade 2: Descreve o local exato e a situação**

| Campo | Tipo | Restrições | Valor default |
| --- | --- | --- | --- |
| Endereço/Coordenada | Caixa de texto | Preenchimento obrigatório | |
| Ponto de Referência | Caixa de texto | Máximo 100 caracteres | |
| Descrição da Situação | Área de texto | Preenchimento obrigatório | |

| Comandos | Destino | Tipo |
| --- | --- | --- |
| próximo passo | Atividade: Anexa as fotos da ocorrência | default |


**Atividade 3: Anexa as fotos da ocorrência**

| Campo | Tipo | Restrições | Valor default |
| --- | --- | --- | --- |
| Upload de Evidências | Imagem | Máx 3 fotos (.jpg, .png, 5MB) | |

| Comandos | Destino | Tipo |
| --- | --- | --- |
| adicionar foto | Abre galeria/câmera do dispositivo | default |
| avançar | Atividade: Seleciona opção anônima | default |


**Atividade 4: Seleciona a opção de denúncia anônima**

| Campo | Tipo | Restrições | Valor default |
| --- | --- | --- | --- |
| Manter Anonimato? | Seleção única | Sim / Não (Radio button) | Sim |
| Nome Completo | Caixa de texto | Obrigatório se "Anonimato" = Não | |
| Telefone | Número | Obrigatório se "Anonimato" = Não | |

| Comandos | Destino | Tipo |
| --- | --- | --- |
| concluir | Atividade: Envia o formulário | default |


**Atividade 5: Envia o formulário**

| Campo | Tipo | Restrições | Valor default |
| --- | --- | --- | --- |
| Resumo dos Dados | Área de texto | Apenas leitura (revisão) | |

| Comandos | Destino | Tipo |
| --- | --- | --- |
| confirmar e enviar | Envia pacote para o backend | default |
| voltar | Retorna para correção | cancel |


**Atividade 6: Recebe os dados**

| Campo | Tipo | Restrições | Valor default |
| --- | --- | --- | --- |
| Payload de Dados | Tabela/JSON | Variáveis da requisição web | |
| Data de Recebimento | Data e Hora | Timestamp do servidor | Atual |

| Comandos | Destino | Tipo |
| --- | --- | --- |
| encaminhar | Atividade: Valida e salva os registros | default |


**Atividade 7: Valida e salva os registros no Banco de Dados**

| Campo | Tipo | Restrições | Valor default |
| --- | --- | --- | --- |
| ID da Denúncia | Número | Chave primária (Autoincrement) | |
| Status Inicial | Caixa de texto | Via regra de negócio | "Aberta" |
| Integridade | Seleção única | Booleano (Validação OK?) | |

| Comandos | Destino | Tipo |
| --- | --- | --- |
| persistir dados | Banco de Dados | default |
| exibir protocolo | Fim do Processo (Tela de sucesso) | default |

---
