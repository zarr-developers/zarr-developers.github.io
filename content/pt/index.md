---
layout: single
author_profile: false
sidebar:
  title: Conteúdo
  nav: sidebar
excerpt: Possui belos dados no Zarr? Mostre-nos no Bluesky!
header:
  overlay_image: /images/llc4320_sst.png
  overlay_filter: 0.5
  caption: "Crédito: Ryan Abernathey"
  actions:
    - label: Compartilhe aqui!
      url: https://bsky.app/intent/compose?text=@zarr.dev%20%23beautifuldata
---

Zarr é um projeto da comunidade para desenvolver especificações e software para armazenamento de grandes matrizes tipadas n-dimensionais, também comumente conhecidas como tensores. Um foco particular de Zarr é fornecer suporte para o armazenamento
usando sistemas distribuídos como armazenagem de objetos em nuvem, e para habilitar E/S eficiente para aplicações de computação paralela.

## Descrição

Zarr é motivado pela necessidade de um formato simples, transparente, aberto e baseado em uma comunidade que suporte alta taxa de E/S distribuída em sistemas de armazenamento diferentes. Os dados do Zarr podem ser armazenados em qualquer sistema de armazenamento que pode ser representado como uma loja de valor chave, incluindo mais comumente sistemas de arquivos POSIX e armazenamento em nuvem de objetos, mas também arquivos zipados, bem como bancos de dados de documentos e relacionais.

Veja os seguintes repositórios do GitHub para mais informações:

- [Zarr Python](https://github.com/zarr-developers/zarr)
- [Zarr Specs](https://github.com/zarr-developers/zarr-specs)
- [Numcodecs](https://github.com/zarr-developers/numcodecs)
- [Z5](https://github.com/constantinpape/z5)
- [N5](https://github.com/saalfeldlab/n5)
- [Zarr.jl](https://github.com/meggart/Zarr.jl)
- [ndarray.scala](https://github.com/lasersonlab/ndarray.scala)

## Aplicações

- Serialização simples e rápida de matrizes do tipo NumPy, acessível a partir de linguagens como Python, C, C++, Rust, Javascript e Java
- Armazenamento de imagens n-dimensionais em várias escalas, por exemplo, em microscópio leve e elétrons
- Interpretadores geoespaciais, por exemplo, seguindo as convenções de metadados NetCDF / CFC

## Recursos

- Divide matrizes multidimensionais ao longo de qualquer dimensão.
- Armazenar matrizes na memória, em disco, dentro de um arquivo Zip, no S3, etc.
- Lê e escreve matrizes simultaneamente a partir de múltiplos tópicos ou processos.
- Organiza matrizes em hierarquias através de grupos anotáveis.

## Patrocínio

Zarr é um Projeto Patrocinado da NumFOCUS, uma instituição pública de caridade conforme a lei US 501(c)(3).

Projetos Patrocinados pela NumFOCUS dependem do generoso apoio de patrocinadores corporativos, parceiros institucionais e doadores individuais.

## Vídeos

[Vídeos](https://www.youtube.com/playlist?list=PLvkeNUPrCU04Xvcph4ErxsRkZq28Oucr7)
dos membros da comunidade falando sobre Zarr. Se você tem um vídeo que gostaria que compartilhássemos, nos avise!

<div class="video">
    <figure>
        <iframe width="640" height="480"
            src="https://www.youtube.com/embed/videoseries?list=PLvkeNUPrCU04Xvcph4ErxsRkZq28Oucr7"
            frameborder="0" allowfullscreen></iframe>
    </figure>
</div>
