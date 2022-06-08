# Example crud (Docker + Express + GraphQL + MongoDB)

- Docker
- ExpressJS
- Mongoose
- Apollo GraphQL
- Jest

# Setup .env

|Variables|Description|
|-|-|
|MONGO_URL|Mongodb connection string|

Note: copy rename file `.env.example` => `.env`

# How to run on locally

##### Using yarn

```
    $ yarn install
    $ yarn dev
```

Build code

```
    $ yarn build
```

##### Using Docker compose

Start server
```
$ docker-compose build && docker-compose up

````

End to end testing

```
$ docker-compose -f docker-compose.yml run app yarn test
```

 Graphql Playground: http://127.0.0.1:3000/graphql 