![router version](https://img.shields.io/badge/apollographql/router-1.39.0-brightgreen) ![@apollo/server version](https://img.shields.io/badge/@apollo/server-4.10.0-brightgreen) ![@apollo/client version](https://img.shields.io/badge/@apollo/client-3.9.4-brightgreen)

# Client Router E2E Tests

![Client Router E2E Tests](https://github.com/apollographql/client-router-e2e-tests/actions/workflows/router-e2e-defer-tests.yml/badge.svg)

A series of E2E tests that run on push to the `main` branch of this repository and when PRs are opened against `main`.

For more information about the test suite, please see [`demo/README.md`](demo/README.md).

## Running [Apollo Router](https://www.apollographql.com/docs/router/) and Cypress tests locally

> ⚠️ NB: [Docker Desktop](https://www.docker.com/products/docker-desktop/) must be installed and running.

After cloning this repository, `cd` into the folder that contains the web application we'll be running tests against with `cd demo` and run `npm i` to install dependencies. Then run the following command to run the router:

```
$ npm run router:up
```

To run the E2E tests in headful mode, run the following command:

```
$ npm run test:local
```

This will open the Cypress GUI which allows you to run the test suite and inspect the results. (To run in headless mode, run `npm run test`.)

Finally, to stop running `apollo-router`:

```
$ npm run router:down
```

## Running the graph locally with a local router

Sometimes testing against a specific branch of the router is necessary. Follow these instructions to run both subgraphs locally and point the router at our local subgraphs.

First, let's run the subgraphs using `concurrently` via npm script at separate predefined ports:

```
$ cd demo && npm run subgraphs:up:local
```

Then open `scripts/supergraph.yaml` and update the `routing_url` for both subgraphs:

```diff
federation_version: =2.6.1
subgraphs:
  products:
-    routing_url: http://products:4000/graphql
+    routing_url: http://localhost:4001/graphql
    schema:
      file: subgraphs/products/products.graphql
  users:
-    routing_url: http://users:4000/graphql
+    routing_url: http://localhost:4002/graphql
    schema:
      file: subgraphs/users/users.graphql
```

Finally, rebuild the supergraph schema by entering the `scripts` directory and running:

```
$ bash compose.sh
```

Now, inside your local copy of the `router` repository, checkout the branch you'd like to test and run (assumes `router` and `client-router-e2e-tests` are siblings):

```
$ APOLLO_KEY='...' APOLLO_GRAPH_REF='...' cargo run -- --supergraph ../client-router-e2e-tests/scripts/supergraph.graphql --config ../client-router-e2e-tests/scripts/router.yaml --h
ot-reload
```
