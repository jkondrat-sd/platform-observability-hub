.PHONY: help build up down test lint migrate ingest-mock correlate-traces

help:
	@echo "Platform Observability Hub - Management Commands"
	@echo "----------------------------------------------"
	@echo "build              : Build all service containers"
	@echo "up                 : Start all services in the background"
	@echo "down               : Stop all services"
	@echo "test               : Run all tests (Unit + Pipeline)"
	@echo "lint               : Run linting checks"
	@echo "migrate            : Run database migrations"
	@echo "ingest-mock        : Ingest mock telemetry data"
	@echo "correlate-traces   : Manually trigger trace-log correlation"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

test:
	pytest tests/api tests/pipelines
	npm test --prefix apps/web

lint:
	flake8 apps/api apps/worker apps/ingestion-engine
	npm run lint --prefix apps/web

migrate:
	docker-compose exec api alembic upgrade head

ingest-mock:
	docker-compose exec ingestion-engine python scripts/ingest/mock_telemetry.py

correlate-traces:
	docker-compose exec api python scripts/correlate/correlate_all.py
