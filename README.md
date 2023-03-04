# Desafio-BioPark

## Configuração

- Necessário a instalação:
  - Docker compose versão 2.1
  - Nodejs versão 18.8

No diretório do projeto em um terminal:

```bash
docker-compose up
```

No diretório do Backend com o docker up

```bash
npx knex migrate:latest ; npx knex seed:run ; npm start
```

No diretório do frontend

```bash
npm start
```
