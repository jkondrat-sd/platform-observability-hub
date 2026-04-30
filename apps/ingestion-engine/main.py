import json
import uuid
import datetime
from typing import List, Dict

class IngestionEngine:
    """Standardizes and ingest telemetry from multiple sources."""
    
    def __init__(self):
        self.raw_queue = []

    def ingest(self, signal: Dict):
        # Normalize signal to OTel format simulation
        normalized = {
            "id": str(uuid.uuid4()),
            "timestamp": datetime.datetime.utcnow().isoformat(),
            "type": signal.get("type", "UNKNOWN"),
            "service": signal.get("service", "undefined"),
            "content": signal.get("body", {}),
            "trace_id": signal.get("trace_id"),
            "span_id": signal.get("span_id"),
        }
        print(f"Ingested {normalized['type']} from {normalized['service']}")
        return normalized

class CorrelationEngine:
    """Connects the dots across metrics, logs, and traces."""
    
    def __init__(self):
        self.signal_store = {}

    def add_signal(self, signal: Dict):
        trace_id = signal.get("trace_id")
        if trace_id:
            if trace_id not in self.signal_store:
                self.signal_store[trace_id] = []
            self.signal_store[trace_id].append(signal)

    def correlate(self, trace_id: str):
        signals = self.signal_store.get(trace_id, [])
        if not signals:
            return None
            
        print(f"Correlating {len(signals)} signals for Trace: {trace_id}")
        return {
            "correlation_id": str(uuid.uuid4()),
            "trace_id": trace_id,
            "involved_signals": [s["id"] for s in signals],
            "summary": f"Found {len([s for s in signals if s['type'] == 'LOG'])} logs attached to this trace."
        }

if __name__ == "__main__":
    ingestor = IngestionEngine()
    correlator = CorrelationEngine()
    
    # Simulating a trace with a log
    t_id = "trace-abc-123"
    
    log_sig = ingestor.ingest({"type": "LOG", "service": "auth-api", "body": {"msg": "DB timeout"}, "trace_id": t_id})
    trace_sig = ingestor.ingest({"type": "TRACE", "service": "auth-api", "body": {"span": "get_user"}, "trace_id": t_id})
    
    correlator.add_signal(log_sig)
    correlator.add_signal(trace_sig)
    
    result = correlator.correlate(t_id)
    print(f"Correlation Result: {json.dumps(result, indent=2)}")
