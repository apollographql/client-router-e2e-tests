# vue-demo

This is a demo of `@vue/apollo-composable` + `@apollo/client@3.7.0-beta.7` demonstrating @defer support running against a dockerized supergraph. This requires `docker` + `docker-compose` to run.

To run this project locally:

- clone this repository
- `cd vue-demo && npm i`
- `npm run router:up`
- `npm run serve`
- visit http://localhost:8080/ and observe that the response is multipart, resulting in the dimenions appearing after initial DOMContentLoaded

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
