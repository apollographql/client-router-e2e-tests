# Router `@defer` E2E Tests

![Router E2E Defer Tests](https://github.com/alessbell/router-defer-e2e-tests/actions/workflows/router-e2e-defer-tests.yml/badge.svg)

A series of E2E tests that run on push to the `main` branch of this repository and when PRs are opened against `main`.

For more information about the test suite, please see [`CRA-demo/README.md`](CRA-demo/README.md).

## Running `apollo-router` and Cypress tests locally

After cloning this repository, run the following commands to run the router:

```
$ cd CRA-demo && npm run router:up
```

To run the E2E tests in headful mode, run the following from the `CRA-demo` directory:

```
$ npm i && npm run test:local
```

This will open the Cypress GUI which allows you to run the test suite and inspect the results. (To run in headless mode, run `npm run test`.)

Finally, to stop running `apollo-router`:

```
$ npm run router:down
```

### Running GitHub workflows with `act`

The GitHub actions workflows in this repository can also be run with [`act`](https://github.com/nektos/act) for fast iteration during local development.

For example, to run the `ci-docker-local` job in `.github/workflows/router-e2e-defer-tests.yml`:

```
$ brew install act
$ act -j ci-docker-local
```

On M1 macs, run `act` with the `--container-architecture linux/amd64` flag.

> NB: there is a bug in `act` that throws an error when running dockerized Cypress locally. Instead, follow the instructions above to run `apollo-router` locally followed by `npm run test:local` which will bring up the Cypress GUI.