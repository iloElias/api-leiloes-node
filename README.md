# Auction API

## Descrição

Esta é uma API de leilão construída com Node.js e TypeScript, utilizando PostgreSQL como banco de dados. A API foi desenvolvida para uma avaliação da faculdade.

## Funcionalidades

- **Cadastro de Itens:** Os vendedores podem cadastrar itens para leilão, fornecendo descrições detalhadas, lance inicial e tempo de leilão.
- **Cadastro de Compradores:** Os compradores podem se cadastrar na plataforma.
- **Efetuar Lance:** Os compradores podem efetuar lances nos itens cadastrados. Cada lance deve ser maior que o lance anterior.
- **Listagem de Itens:** Listar os itens em leilão, incluindo o maior lance e o tempo restante.

## Endpoints da API

### Cadastro de Usuário

**Endpoint:**

```
POST /api/users
```

**Corpo da Requisição:**

```json
{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "password123"
}
```

### Cadastro de Item para Leilão

**Endpoint:**

```
POST /api/items
```

**Corpo da Requisição:**

```json
{
  "name": "Old Painting",
  "description": "A very old and valuable painting.",
  "initialBid": 100.00,
  "auctionEndTime": "2023-12-31T23:59:59Z",
  "sellerId": 1
}
```

### Listagem de Itens em Leilão

**Endpoint:**

```
GET /api/items
```

### Efetuar Lance

**Endpoint:**

```
POST /api/items/bid
```

**Corpo da Requisição:**

```json
{
  "itemId": 1,
  "userId": 1,
  "amount": 150.00
}
```
