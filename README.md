# Router `@defer` E2E Tests

![Router E2E Defer Tests](https://github.com/alessbell/router-defer-e2e-tests/actions/workflows/router-e2e-defer-tests.yml/badge.svg)

A series of E2E tests that run on push to the `main` branch of this repository and when PRs are opened against `main`.

If cloned locally, they can also be executed with [`act`](https://github.com/nektos/act) for fast iteration.

```
$ brew install act
$ act -j ci-docker-local
```

On M1 macs, run `act` with the `--container-architecture linux/amd64` flag.

> NB: there is a bug in `act` that throws an error when running dockerized Cypress locally. As a stop gap, if your apollo-router is already running (you can achieve this by commenting out L65 and below in `.github/workflows/router-e2e-defer` and running `act-j ci-docker-local`) you can then run `npm run test:local` which will bring up the Cypress GUI.