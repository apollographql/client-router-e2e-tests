.PHONY: supergraph
supergraph: config compose

.PHONY: config
config:
	./config.sh > ./supergraph.yaml

.PHONY: compose
compose:
	./compose.sh

.PHONY: docker-build-local-router
docker-build-local-router:
	docker-compose -f docker-compose.router.yml build --no-cache --pull --parallel --progress plain

.PHONY: docker-up-local-router
docker-up-local-router:
	docker-compose -f docker-compose.router.yml up -d
	@docker logs apollo-router

.PHONY: docker-compose-down
docker-compose-down:
	docker-compose -f docker-compose.router.yml down