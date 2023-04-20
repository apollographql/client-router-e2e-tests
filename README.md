![router version](https://img.shields.io/badge/apollographql/router-1.15.1-brightgreen) ![@apollo/server version](https://img.shields.io/badge/@apollo/server-4.6.0-brightgreen) ![@apollo/client version](https://img.shields.io/badge/@apollo/client-3.7.12-brightgreen)

# Client Router E2E Tests

![Client Router E2E Tests](https://github.com/apollographql/client-router-e2e-tests/actions/workflows/router-e2e-defer-tests.yml/badge.svg)

A series of E2E tests that run on push to the `main` branch of this repository and when PRs are opened against `main`.

For more information about the test suite, please see [`CRA-demo/README.md`](CRA-demo/README.md).

## Running [Apollo Router](https://www.apollographql.com/docs/router/) and Cypress tests locally

> ⚠️ NB: [Docker Desktop](https://www.docker.com/products/docker-desktop/) must be installed and running.

After cloning this repository, `cd` into the folder that contains the web application we'll be running tests against with `cd CRA-demo` and run `npm i` to install dependencies. Then run the following command to run the router:

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
