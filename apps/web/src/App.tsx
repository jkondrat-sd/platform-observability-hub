import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import ObservabilityDashboard from './pages/ObservabilityDashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
    <p className="text-slate-400">The observability hub engine is currently correlating telemetry signals. This module will be available shortly.</p>
  </div>
);

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<ObservabilityDashboard />} />
          <Route path="/metrics" element={<Placeholder name="Unified Metrics Explorer" />} />
          <Route path="/logs" element={<Placeholder name="Distributed Log Navigator" />} />
          <Route path="/traces" element={<Placeholder name="Service Graph & Tracing" />} />
          <Route path="/correlation" element={<Placeholder name="Signal Correlation Engine" />} />
          <Route path="/slo" element={<Placeholder name="SLO & Error Budget Tracking" />} />
          <Route path="/alerts" element={<Placeholder name="Smart Alerting & Suppression" />} />
          <Route path="/security" element={<Placeholder name="Security Telemetry Correlation" />} />
          <Route path="/rca" element={<Placeholder name="Root Cause AI Analysis" />} />
          <Route path="/settings" element={<Placeholder name="Hub Governance & Standards" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
