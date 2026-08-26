# Word Transformer

Aplicação web para preencher templates `.docx` diretamente no navegador usando Docxtemplater.

## Como usar

1. Adicione tags ao documento do Word.
2. Selecione o template na aplicação.
3. Preencha os campos encontrados e gere o documento.

O último template selecionado fica salvo no `localStorage` e é restaurado automaticamente na próxima visita.

## Tags suportadas

Campo simples:

```text
Cliente: {nome}
```

Loop (a aplicação permite adicionar e remover itens):

```text
{#itens}
{descricao} — {valor}
{/itens}
```

Condição (selecione “Condição” no bloco exibido pela aplicação):

```text
{#mostrar_endereco}
Endereço: {endereco}
{/mostrar_endereco}
```

Loops e condições podem ser aninhados. Para evitar ambiguidades, use nomes únicos para tags que vivem no mesmo nível do template.
