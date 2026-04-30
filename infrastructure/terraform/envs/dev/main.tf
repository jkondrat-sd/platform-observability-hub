module "prometheus_stack" {
  source = "./modules/prometheus"

  retention_days = 30
  storage_size   = "100Gi"
}

module "loki_stack" {
  source = "./modules/loki"

  retention_days = 15
  s3_bucket      = "telemetry-logs-prod"
}

module "tempo_stack" {
  source = "./modules/tempo"

  retention_days = 7
}

resource "kubernetes_namespace" "observability" {
  metadata {
    name = "platform-observability"
  }
}

# Kafka for telemetry buffering
module "kafka_telemetry" {
  source = "./modules/kafka"

  namespace = kubernetes_namespace.observability.metadata[0].name
  replicas  = 3
}
