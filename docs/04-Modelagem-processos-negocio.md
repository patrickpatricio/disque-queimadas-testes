# Modelagem dos processos de negócio

A modelagem a seguir descreve a transição do cenário problemático atual para a solução 
digitalizada proposta, evidenciando como a tecnologia pode otimizar o fluxo de informações 
entre os cidadãos e as autoridades competentes.

## Modelagem da situação atual (Modelagem AS IS)

No cenário atual do município de Betim, o fluxo de comunicação e registro sobre queimadas ilegais é majoritariamente analógico e ineficiente, visto que muitas dessas ocorrências não são denunciadas formalmente ou identificadas rapidamente. Para ilustrar essa realidade, foram mapeados dois processos manuais que geram retrabalho e atrasos:

  - **Processo 1: Denúncia de Queimada**: Atualmente, quando um morador presencia uma queimada, ele precisa ligar para a prefeitura ou para os bombeiros. O processo envolve tentar ser atendido, explicar verbalmente a localização (que muitas vezes é em lotes vagos sem endereço exato) e relatar a gravidade sem poder enviar fotos. Além disso, o medo de sofrer represálias ao fornecer dados pessoais ao telefone faz com que muitos cidadãos desistam da denúncia.
    
  <img width="1600" height="1105" alt="image" src="https://github.com/user-attachments/assets/058a7016-17bb-488d-9cfb-cace487b53e4" />

<br>

  - **Processo 2: Mapeamento de Focos:** As informações recebidas via telefone são anotadas manualmente ou inseridas em planilhas isoladas por diferentes órgãos (Defesa Civil, Prefeitura, Bombeiros). Não há um banco de dados centralizado. Um analista precisa compilar esses dados periodicamente de forma manual para tentar descobrir onde estão os focos de incêndio, gerando atraso na resposta e dificultando o planejamento estratégico.

 <img width="1600" height="1231" alt="image" src="https://github.com/user-attachments/assets/c594b6ad-da37-4ead-bd74-2c9abeaaabd7" />
   

## Descrição geral da proposta (Modelagem TO BE)

Para solucionar os gargalos identificados, propõe-se a implementação do sistema web "Denúncia de Queimadas Ilegais". A tecnologia introduz automação, padronização e transparência.

  - **Processo 1 TO BE: Registro Digital de Denúncia:** O morador acessa o site responsivo pelo celular ou computador. Ele preenche um formulário simples informando o local da ocorrência, descrevendo a situação e anexando fotos. O sistema permite que ele escolha a opção de denúncia anônima. Ao enviar, o registro é salvo automaticamente no banco de dados, eliminando o atendimento humano intermediário e garantindo privacidade.
    <br>
    <br>
    ● **Oportunidade de melhoria**: Agilidade no envio de dados precisos e quebra da barreira do medo através do anonimato garantido.

    <img width="1600" height="764" alt="image" src="https://github.com/user-attachments/assets/1306a380-8495-4306-bf05-ca655239044f" />

  - **Processo 2 TO BE: Gestão e Visibilidade de Denúncias:** Ao receber a denúncia, o sistema a publica automaticamente no "mural da vergonha" (histórico público). Simultaneamente, os dados consolidados ficam disponíveis para consulta pelas instituições (Bombeiros, Prefeitura, Defesa Civil). As autoridades utilizam a plataforma para visualizar mapas de calor/frequência, permitindo o direcionamento imediato de viaturas ou o planejamento de campanhas educativas.
    <br>
    <br>
    ● **Oportunidade de melhoria:** Centralização da informação que auxilia as autoridades na identificação de áreas críticas e aumenta a conscientização da população através da exposição pública do problema. 

  <img width="1600" height="1054" alt="image" src="https://github.com/user-attachments/assets/b59458f1-d4f9-47eb-bc9b-137bd5fa0e73" />

## Modelagem dos processos

[PROCESSO 1 AS IS - Denúncia de Queimada](./processes/processo-1-as-is.md "Detalhamento do processo 1 AS IS.")

[PROCESSO 1 TO BE - Registro Digital de Denúncia](./processes/processo-1-to-be.md "Detalhamento do processo 1 TO BE.")

[PROCESSO 2 AS IS - Mapeamento de Focos](./processes/processo-2-as-is.md "Detalhamento do processo 2 AS IS.")

[PROCESSO 2 TO BE - Gestão e Visibilidade de Denúncias](./processes/processo-2-to-be.md "Detalhamento do processo 2 TO BE.")

## Indicadores de desempenho

| **Indicador** | **Objetivos** | **Descrição** | **Fonte de dados** | **Fórmula de cálculo** |
| ---           | ---           | ---           | ---             | ---             |
| Taxa de denúncias anônimas | Avaliar a eficácia do sistema na quebra da barreira do medo de represálias. | Mede o percentual de cidadãos que optaram por ocultar seus dados ao denunciar. | Tabela Denuncias | (número de denúncias anônimas / número total de denúncias) * 100 |
| Tempo médio de resposta | Garantir o direcionamento imediato das viaturas e reduzir a latência reativa. | Calcula o tempo médio decorrido entre o registro no sistema e o status "Atendido". | Tabela Ocorrencias | $\Sigma$ (data/hora de atendimento - data/hora de registro) / total de ocorrências atendidas |
| Taxa de denúncias com evidências | Medir a qualidade e precisão das informações enviadas pela população. | Percentual de denúncias que possuem imagens fotográficas anexadas. | Tabela Denuncias | (número de denúncias com fotos / número total de denúncias) * 100 |
|Taxa de falsos alarmes | Medir a confiabilidade da plataforma e evitar o desperdício de recursos públicos. |Percentual de despachos onde a autoridade classificou a situação como "Falso Alarme". | Tabela Ocorrencias | (número de status "Falso Alarme" / número total de ocorrências verificadas) * 100 |
| Concentração por bairro (Índice de Risco) | Identificar áreas críticas para o planejamento de campanhas educativas preventivas. | Volume absoluto de denúncias confirmadas agrupadas por bairro no mês. | Tabela Enderecos | contagem total de denúncias validadas agrupadas por Bairro/Região |
