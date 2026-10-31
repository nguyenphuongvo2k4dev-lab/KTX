import React from 'react';

const STACK = [
  {
    category: 'Frontend',
    icon: 'web',
    color: 'text-primary',
    bg: 'bg-primary-fixed/40',
    items: [
      { name: 'React 19', desc: 'UI Library' },
      { name: 'TypeScript', desc: 'Type Safety' },
      { name: 'Vite 8', desc: 'Build Tool' },
      { name: 'Tailwind CSS v4', desc: 'Styling' },
      { name: 'React Router v7', desc: 'Routing' },
      { name: 'Zustand', desc: 'State Management' },
    ],
  },
  {
    category: 'Backend & API',
    icon: 'dns',
    color: 'text-secondary',
    bg: 'bg-secondary-fixed/40',
    items: [
      { name: 'Node.js', desc: 'Runtime' },
      { name: 'Express', desc: 'API Server' },
      { name: 'REST API', desc: 'Architecture' },
      { name: 'PostgreSQL', desc: 'Database' },
      { name: 'Redis Cache', desc: 'Caching' },
      { name: 'MQTT Broker', desc: 'IoT Protocol' },
    ],
  },
  {
    category: 'Hạ tầng & IoT',
    icon: 'sensors',
    color: 'text-tertiary',
    bg: 'bg-tertiary-fixed/30',
    items: [
      { name: 'Kubernetes', desc: 'Orchestration' },
      { name: 'AWS S3', desc: 'Backup Storage' },
      { name: 'Cloudflare WAF', desc: 'Security' },
      { name: 'Modbus-RTU', desc: 'Electric Meter' },
      { name: 'NB-IoT', desc: 'Water Meter' },
      { name: 'RFID/FaceID', desc: 'Access Control' },
    ],
  },
];

const INFRA = [
  { label: 'CPU Load hiện tại', value: '18%', max: 100, bar: 18, color: 'bg-primary' },
  { label: 'RAM sử dụng', value: '6.8 / 16 GB', max: 100, bar: 42.5, color: 'bg-secondary' },
  { label: 'DB Queries', value: '420 req/s', max: 100, bar: 65, color: 'bg-tertiary' },
  { label: 'API Latency', value: '28 ms', max: 100, bar: 28, color: 'bg-primary' },
];

export const TechSection: React.FC = () => {
  return (
    <section id="tech" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-primary text-xs font-bold mb-3">
            <span className="material-symbols-outlined text-[14px]">terminal</span>
            Công nghệ
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight mb-3">
            Kiến trúc{' '}
            <span className="text-primary">Enterprise-grade</span>
          </h2>
          <p className="text-sm text-on-surface-variant max-w-xl mx-auto">
            Xây dựng trên nền tảng cloud-native với Kubernetes, IoT Modbus và bảo mật chuẩn ISO/IEC 27001:2022.
          </p>
        </div>

        {/* Tech stack grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {STACK.map((s) => (
            <div key={s.category} className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20 shadow-xs">
              <div className="flex items-center gap-2.5 mb-4">
                <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center`}>
                  <span className={`material-symbols-outlined text-[20px] ${s.color}`}>{s.icon}</span>
                </div>
                <h3 className="font-bold text-on-surface text-sm">{s.category}</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {s.items.map((item) => (
                  <div key={item.name} className="bg-surface-container rounded-lg px-2.5 py-2">
                    <div className="text-xs font-bold text-on-surface">{item.name}</div>
                    <div className="text-[11px] text-outline">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Live infra metrics */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">dns</span>
              <div>
                <h3 className="text-sm font-bold text-on-surface">Cụm Kubernetes ĐHQG TPHCM</h3>
                <p className="text-xs text-outline">Cloud v2.4 Enterprise · Phiên bản Production</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              99.98% Uptime
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INFRA.map((m) => (
              <div key={m.label} className="bg-surface-container rounded-xl p-3">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-on-surface-variant">{m.label}</span>
                  <span className="font-mono font-bold text-on-surface">{m.value}</span>
                </div>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div className={`${m.color} h-full rounded-full`} style={{ width: `${m.bar}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Compliance badges */}
          <div className="flex flex-wrap items-center gap-3 mt-5 pt-4 border-t border-surface-container-high">
            {[
              { icon: 'security', label: 'ISO/IEC 27001:2022', color: 'text-primary' },
              { icon: 'lock', label: 'TLS 1.3 SSL 256-bit', color: 'text-secondary' },
              { icon: 'verified_user', label: 'WAF Cloudflare L7', color: 'text-tertiary' },
              { icon: 'cloud_sync', label: 'S3 Multi-AZ Backup', color: 'text-primary' },
              { icon: 'badge', label: 'SSO VNU OAuth2', color: 'text-secondary' },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-xs text-on-surface-variant">
                <span className={`material-symbols-outlined text-[14px] ${b.color}`}>{b.icon}</span>
                {b.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
