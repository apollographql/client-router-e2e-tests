# Router `@defer` E2E Tests

![Router E2E Defer Tests](https://github.com/alessbell/router-defer-e2e-tests/actions/workflows/router-e2e-defer-tests.yml/badge.svg)

A series of E2E tests that run on push to the `main` branch of this repository.

If cloned locally, they can also be executed with [`act`](https://github.com/nektos/act) for fast iteration.

```
$ brew install act
$ act -j ci-docker-local
```

On M1 macs, run `act` with the `--container-architecture linux/amd64` flag.