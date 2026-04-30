export enum TelemetryType {
  METRIC = "METRIC",
  LOG = "LOG",
  TRACE = "TRACE",
  EVENT = "EVENT"
}

export enum Severity {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  FATAL = "FATAL"
}

export interface TelemetrySignal {
  id: string;
  type: TelemetryType;
  source: string;
  service: string;
  timestamp: string;
  tags: Record<string, string>;
  content: any;
}

export interface CorrelationResult {
  correlationId: string;
  signals: string[]; // List of telemetry signal IDs
  confidence: number; // 0-1.0
  rootCauseCandidate?: string;
  summary: string;
}

export interface SLO {
  id: string;
  name: string;
  target: number; // e.g., 99.9
  currentValue: number;
  periodDays: number;
  status: "HEALTHY" | "DEGRADED" | "BREACHED";
}

export interface ObservabilityKPIs {
  ingestionRatePerSecond: number;
  avgCorrelationLatencyMs: number;
  activeIncidents: number;
  errorRatePercentage: number;
  costEstimateMonthly: number;
}
