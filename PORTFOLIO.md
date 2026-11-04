# Portfólio PraSol

As fotos do portfólio são composições fotográficas completas: produto, apoio, cenário e sombra de contato integrados na própria imagem. As versões PNG de ambientação ficam em output/fotos-ambientadas; os arquivos tratados com transparência e os originais foram preservados.

As versões para o site ficam em assets/images/ambientadas: até 800 px de largura nos cards e até 1600 px na ampliação, em WebP de qualidade 93. A imagem não recebe outra sombra ou pedestal pela interface. As paletas são coerentes entre os ângulos de cada trabalho; closes conservam o foco nos detalhes.

## Acrescentar trabalhos

1. Tratar as novas fotos e ambientá-las como fotografias completas, verificando a sombra de contato e a cor do cenário através das telas.
2. Exportar as duas versões WebP seguindo os nomes em assets/images/ambientadas.
3. Acrescentar o trabalho e os números das fotos em portfolio-data.js. `category` aceita `bones` e `viseiras`; `tone` aceita `sand`, `sage`, `blue`, `lavender` e `peach`.
4. Na pasta do site, executar `node scripts/sync-portfolio.cjs`. Isso atualiza os cards estáticos e a contagem com a mesma fonte usada pelo visualizador.
5. Conferir em celular e computador, incluindo os outros ângulos no visualizador.

As marcas identificam peças efetivamente fotografadas e fornecidas pela empresa. BYD aparece como BYD · Vitória Motors. Não foram adicionados depoimentos, números de clientes ou alegações de parceria oficial.

## Conferência desta versão

- Layout conferido em 320, 390 e 1440 px, sem rolagem horizontal.
- 13 trabalhos, 24 fotos no visualizador, 5 trabalhos no filtro de viseiras.
- Troca de destaque, filtros, navegação entre ângulos, fechamento por Escape e menu móvel verificados.
- Fluxo de orçamento até a preparação do resumo verificado, com abertura externa interceptada no teste; nenhuma mensagem foi enviada.
- Todas as imagens carregaram; nenhum erro de execução do JavaScript foi observado.
- Resultado local, sem publicação, commit ou push nesta etapa.

## Atualização das fotos ambientadas

As 24 fotos foram revistas e inseridas no site, com cenários e sombras integrados. Quatro vistas frontais foram refeitas para manter o ângulo original. Foram verificadas as 48 versões WebP finais (24 cards e 24 ampliações), todas com cenário completo. O carregamento dos 24 ângulos no visualizador e a navegação em 320, 390 e 1440 px passaram sem imagens quebradas ou rolagem horizontal. O resumo do orçamento foi testado sem enviar mensagem.

## Vitrine e navegação — 16/10/2026

- Abertura encurtada, com foto maior e revisão dos fundos BYD para azul/cinza.
- Três destaques (BYD, Lubrax, Sicoob) combinam foto inteira e outro ângulo ou close. Os botões abrem o ângulo mostrado.
- Marcas abrem o trabalho correspondente; logos fornecidos de Lubrax, Sicoob e Loovi foram preparados para a faixa de clientes. BYD é identificada por texto, sem inventar um logotipo.
- Loovi foi incorporada com três fotos existentes: 14 trabalhos e 27 fotos no total.
- Grade sem etiquetas repetidas; inicialmente seis trabalhos, com botão para revelar os demais e filtros que conservam acesso ao conjunto completo.
- Três closes de acabamento; no celular, faixa horizontal deslizável.
- “Quero algo nessa linha” acrescenta uma referência removível ao resumo do orçamento; não altera as etapas existentes.
- Atalho de orçamento móvel só aparece após a abertura e some no formulário, no menu e no visualizador.
- Alterações locais, sem publicação.


### Logos de clientes — 16/10/2026

A seção de clientes usa 14 identidades fornecidas em `assets/Logos clientes`, com derivados WebP em `assets/images/marcas`. Originais e cores preservados. Lubrax, Sicoob e Loovi abrem trabalhos fotografados; BYD · Vitória Motors permanece em um botão separado, pois não há logo fornecido na pasta. Grade estática com sete colunas no desktop e três no celular, sem depender de carrossel para descobrir as marcas.

Referências consultadas: https://seubone.com/ destaca logos após a abertura; https://lfbones.com.br/ destaca depoimentos na seção “Quem compra, recomenda”. A PraSol usa os logos e fotografias próprios, sem importar avaliações ou números dos concorrentes.

Verificação local: larguras 320, 390 e 1440 px, sem transbordamento horizontal, imagens quebradas ou erros no navegador; navegação das 27 fotos e seleção de referência no orçamento preservadas. Publicação não realizada.
