# router-defer-e2e-tests

A series of E2E tests that run on push to the `main` branch of this repository.

If cloned locally, they can also run via [`act`](https://github.com/nektos/act) for fast iteration.

```
$ brew install act
$ act -j ci-docker-local
```

On M1 macs, run `act` with the `--container-architecture linux/amd64` flag.