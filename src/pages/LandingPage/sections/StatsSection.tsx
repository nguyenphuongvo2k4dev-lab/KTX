import React, { useEffect, useRef, useState } from 'react';

const METRICS = [
  { value: 4120, suffix: '+', label: 'Tài khoản người dùng', icon: 'group', color: 'text-primary', bg: 'bg-primary-fixed/40' },
  { value: 3450, suffix: '', label: 'Sinh viên đang lưu trú', icon: 'school', color: 'text-secondary', bg: 'bg-secondary-fixed/40' },
  { value: 406, suffix: '', label: 'Phòng vận hành (Khu A–D)', icon: 'meeting_room', color: 'text-primary', bg: 'bg-primary-fixed/30' },
  { value: 99.98, suffix: '%', label: 'Uptime hệ thống (30 ngày)', icon: 'cloud_done', color: 'text-secondary', bg: 'bg-secondary-fixed/30' },
  { value: 32, suffix: '', label: 'Cổng RFID/FaceID hoạt động', icon: 'passkey', color: 'text-tertiary', bg: 'bg-tertiary-fixed/30' },
  { value: 142, suffix: '+', label: 'Tân sinh viên K24 nhập học', icon: 'how_to_reg', color: 'text-primary', bg: 'bg-primary-fixed/40' },
];

const IOT_STATS = [
  { label: 'Công tơ điện IoT', online: 403, total: 406, percent: 99.2, icon: 'bolt', color: 'bg-primary' },
  { label: 'Đồng hồ nước NB-IoT', online: 401, total: 406, percent: 98.8, icon: 'water_drop', color: 'bg-secondary' },
  { label: 'Cổng RFID Barrier', online: 32, total: 32, percent: 100, icon: 'passkey', color: 'bg-tertiary' },
];

function useCountUp(target: number, duration = 1400, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const isFloat = target % 1 !== 0;
    const raf = (ts: number) => {
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(isFloat ? parseFloat((ease * target).toFixed(2)) : Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [target, started, duration]);
  return count;
}

const MetricCard: React.FC<{ m: typeof METRICS[0]; started: boolean }> = ({ m, started }) => {
  const count = useCountUp(m.value, 1600, started);
  return (
    <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/20 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className={`w-10 h-10 rounded-xl ${m.bg} flex items-center justify-center mb-3`}>
        <span className={`material-symbols-outlined text-[22px] ${m.color}`}>{m.icon}</span>
      </div>
      <div className={`text-2xl font-bold ${m.color} font-mono tracking-tight mb-1`}>
        {m.value % 1 !== 0 ? count.toFixed(2) : count.toLocaleString('vi-VN')}{m.suffix}
      </div>
      <div className="text-xs text-on-surface-variant">{m.label}</div>
    </div>
  );
};

export const StatsSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="stats" className="py-20 bg-surface-container-low/50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-primary text-xs font-bold mb-3">
            <span className="material-symbols-outlined text-[14px]">analytics</span>
            Số liệu thực tế
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight mb-3">
            Hệ thống vận hành tại quy mô{' '}
            <span className="text-primary">Đại học Quốc gia</span>
          </h2>
          <p className="text-sm text-on-surface-variant max-w-xl mx-auto">
            Toàn bộ số liệu được đồng bộ thời gian thực từ cơ sở hạ tầng IoT và hệ thống quản lý KTX ĐHQG TP.HCM.
          </p>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {METRICS.map((m) => <MetricCard key={m.label} m={m} started={started} />)}
        </div>

        {/* IoT status bars */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20 shadow-xs">
          <div className="flex items-center gap-2 mb-5">
            <span className="material-symbols-outlined text-primary text-[22px]">sensors</span>
            <h3 className="text-base font-bold text-on-surface">Trạng thái thiết bị IoT toàn KTX</h3>
            <span className="ml-auto text-[11px] px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-semibold">Cập nhật 30s/lần</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {IOT_STATS.map((s) => (
              <div key={s.label} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-outline">{s.icon}</span>
                    <span className="font-medium text-on-surface">{s.label}</span>
                  </div>
                  <span className="font-mono font-bold text-primary">{s.percent}%</span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div
                    className={`${s.color} h-full rounded-full transition-all duration-1000`}
                    style={{ width: started ? `${s.percent}%` : '0%' }}
                  />
                </div>
                <div className="text-[11px] text-outline font-mono">
                  {s.online}/{s.total} thiết bị online
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
