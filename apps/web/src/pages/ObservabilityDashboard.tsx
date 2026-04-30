import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { 
  Activity, 
  AlertTriangle, 
  Zap, 
  Layers,
  Cpu,
  Database,
  Search,
  GitBranch,
  Link2,
  ArrowUpRight
} from 'lucide-react';

const telemetryData = [
  { time: '00:00', ingestion: 840, latency: 120 },
  { time: '04:00', ingestion: 620, latency: 95 },
  { time: '08:00', ingestion: 1250, latency: 145 },
  { time: '12:00', ingestion: 1840, latency: 180 },
  { time: '16:00', ingestion: 1620, latency: 165 },
  { time: '20:00', ingestion: 1100, latency: 130 },
  { time: '23:59', ingestion: 950, latency: 110 },
];

const signalDistribution = [
  { name: 'Metrics', value: 45, color: '#6366f1' },
  { name: 'Logs', value: 35, color: '#8b5cf6' },
  { name: 'Traces', value: 15, color: '#a78bfa' },
  { name: 'Events', value: 5, color: '#c084fc' },
];

const KPI_CARDS = [
  { title: 'Global Throughput', value: '1.4M eps', trend: '+14% / hour', color: 'indigo', icon: Activity },
  { title: 'Active SLO Breaches', value: '2', trend: 'High Priority', color: 'rose', icon: AlertTriangle },
  { title: 'Correlation Engine', value: '99.9%', trend: 'Confidence Score', color: 'violet', icon: Link2 },
  { title: 'Telemetry Cost', value: '$12k', trend: 'Budget: $15k', color: 'emerald', icon: Database },
];

const ObservabilityDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Platform Operational Intelligence</h1>
          <p className="text-slate-400">Unified telemetry correlation across infrastructure, apps, and security.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Query Explorer
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            New Correlation Rule
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <div key={card.title} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-${card.color}-600/10 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-${card.color}-400`} />
              </div>
              <div className={`text-xs font-medium text-slate-400`}>
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ingestion Trend */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Unified Telemetry Ingestion (EPS)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={telemetryData}>
                <defs>
                  <linearGradient id="colorIngestion" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="ingestion" stroke="#6366f1" fill="url(#colorIngestion)" name="Events Per Second" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Signal Breakdown */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Telemetry Signal Mix</h3>
          <div className="flex-1 space-y-4">
            {signalDistribution.map((signal) => (
              <div key={signal.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">{signal.name}</span>
                  <span className="text-slate-400">{signal.value}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full" style={{ width: `${signal.value}%`, backgroundColor: signal.color }}></div>
                </div>
              </div>
            ))}
            <div className="pt-6 mt-6 border-t border-slate-800">
              <div className="flex items-center gap-3 p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/10">
                <Link2 className="text-indigo-400 w-5 h-5" />
                <div className="text-xs">
                  <p className="text-white font-bold">Correlation Engine Active</p>
                  <p className="text-slate-500">Mapping logs to spans in real-time.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Incident & Signal Correlation Feed */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Active Operational Anomalies</h3>
          <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">View Analysis History</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Incident / Anomaly</th>
                <th className="px-6 py-4 font-semibold">Service Scope</th>
                <th className="px-6 py-4 font-semibold">Correlation Level</th>
                <th className="px-6 py-4 font-semibold">Signals</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { title: 'Latency Spike: Auth-V2', service: 'auth-service', confidence: 'HIGH', signals: 'Metric+Trace+Log', status: 'RCA in Progress' },
                { title: 'Database Connection Drop', service: 'payment-db-cluster', confidence: 'CRITICAL', signals: 'Event+Log', status: 'Alert Sent' },
                { title: '5xx Error Rate Elevation', service: 'checkout-api', confidence: 'MEDIUM', signals: 'Metric+Log', status: 'Investigating' },
                { title: 'Abnormal Traffic Pattern', service: 'ingress-gateway', confidence: 'LOW', signals: 'Metric+Security', status: 'Auto-Resolved' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Zap className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-300">{row.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400 font-mono">{row.service}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      row.confidence === 'CRITICAL' ? 'bg-rose-500/10 text-rose-400' : 
                      row.confidence === 'HIGH' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                    }`}>{row.confidence}</span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 italic">{row.signals}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-indigo-500 animate-pulse" />
                      <span className="text-xs font-bold text-slate-300">{row.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ObservabilityDashboard;
