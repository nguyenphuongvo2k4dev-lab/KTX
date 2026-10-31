import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const STATS = [
  { value: '12,450+', label: 'Cư dân đang lưu trú', icon: 'group' },
  { value: '406', label: 'Phòng được quản lý', icon: 'meeting_room' },
  { value: '99.98%', label: 'Uptime hệ thống', icon: 'cloud_done' },
  { value: '< 5 phút', label: 'SLA phản hồi kỹ thuật', icon: 'support_agent' },
];

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto-rotate stats highlight
  useEffect(() => {
    const t = setInterval(() => setActiveIdx((i) => (i + 1) % STATS.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16"
    >
      {/* Ambient background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[20%] -left-[15%] w-[60vw] h-[60vw] rounded-full bg-primary-fixed opacity-40 blur-3xl" />
        <div className="absolute top-[30%] -right-[20%] w-[55vw] h-[55vw] rounded-full bg-secondary-fixed opacity-30 blur-3xl" />
        <div className="absolute -bottom-[25%] left-[25%] w-[50vw] h-[50vw] rounded-full bg-surface-container-high opacity-50 blur-3xl" />
        {/* Grid dot pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#0037b0_0.6px,transparent_0.6px)] [background-size:28px_28px] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Content */}
          <div className="flex flex-col gap-6">
            {/* Announcement pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-lowest border border-primary/20 shadow-sm w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-primary">Cổng đăng ký HK2 mở từ 25/10 – 05/11/2024</span>
              <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-primary text-xs font-bold">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                VNU-SmartDorm Ecosystem 4.0
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-on-surface tracking-tight leading-tight">
                Hệ sinh thái{' '}
                <span className="text-primary">Ký túc xá</span>{' '}
                <br className="hidden sm:block" />
                Đại học Thông minh
              </h1>
              <p className="text-base text-on-surface-variant leading-relaxed max-w-lg">
                Nền tảng số hóa toàn diện cho cư dân KTX ĐHQG — quản lý phòng ở, thanh toán điện nước IoT, báo hỏng kỹ thuật và đồng bộ hồ sơ lưu trú theo thời gian thực.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/register')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-md hover:bg-primary-container hover:shadow-lg transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                Đăng ký lưu trú K24
              </button>
              <button
                onClick={() => navigate('/login')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-surface-container-lowest text-on-surface rounded-xl font-semibold text-sm shadow-sm hover:bg-surface-container border border-outline-variant/30 transition-all"
              >
                <span className="material-symbols-outlined text-[20px] text-primary">login</span>
                Đăng nhập ngay
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {[
                { icon: 'security', label: 'ISO/IEC 27001:2022', color: 'text-primary' },
                { icon: 'lock', label: 'TLS 1.3 E2E SSL', color: 'text-secondary' },
                { icon: 'database', label: 'Đồng bộ CSDL ĐHQG', color: 'text-outline' },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                  <span className={`material-symbols-outlined text-[16px] ${b.color}`}>{b.icon}</span>
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual card */}
          <div className="relative flex flex-col gap-4">
            {/* Main card */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-xl border border-outline-variant/20 relative overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary-fixed opacity-30 blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm">
                    <span className="material-symbols-outlined text-[22px]">apartment</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-on-surface">SmartDorm Dashboard</div>
                    <div className="text-xs text-on-surface-variant">Phòng 402 – Tòa B2 (Khu B)</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </div>
              </div>

              {/* KPI mini grid */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { label: 'Hóa đơn tháng 10', value: '685,000 đ', status: 'Chưa nộp', color: 'text-error', bg: 'bg-error-container/30' },
                  { label: 'Hợp đồng lưu trú', value: 'Còn 74 ngày', status: 'Đang hiệu lực', color: 'text-primary', bg: 'bg-primary-fixed/40' },
                  { label: 'Điện tháng 10', value: '142 kWh', status: 'IoT Realtime', color: 'text-secondary', bg: 'bg-secondary-fixed/40' },
                  { label: 'Yêu cầu kỹ thuật', value: '1 đang xử lý', status: 'KTV tiếp nhận', color: 'text-tertiary', bg: 'bg-tertiary-fixed/30' },
                ].map((kpi) => (
                  <div key={kpi.label} className={`${kpi.bg} rounded-xl p-3 border border-outline-variant/10`}>
                    <div className="text-[11px] text-on-surface-variant mb-1">{kpi.label}</div>
                    <div className={`text-sm font-bold ${kpi.color}`}>{kpi.value}</div>
                    <div className="text-[11px] text-outline mt-0.5">{kpi.status}</div>
                  </div>
                ))}
              </div>

              {/* Action bar */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/login')}
                  className="flex-1 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-colors flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">payments</span>
                  Thanh toán ngay
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="flex-1 py-2 rounded-lg bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">build</span>
                  Báo hỏng
                </button>
              </div>
            </div>

            {/* Floating stats pills */}
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`bg-surface-container-lowest rounded-xl px-4 py-3 border transition-all duration-500 ${
                    i === activeIdx
                      ? 'border-primary/40 shadow-md shadow-primary/10'
                      : 'border-outline-variant/20'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`material-symbols-outlined text-[18px] ${i === activeIdx ? 'text-primary' : 'text-outline'}`}>
                      {stat.icon}
                    </span>
                    <div>
                      <div className="text-base font-bold text-on-surface font-mono">{stat.value}</div>
                      <div className="text-[11px] text-on-surface-variant">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce">
        <span className="text-[11px] text-outline">Khám phá</span>
        <span className="material-symbols-outlined text-outline text-[20px]">keyboard_arrow_down</span>
      </div>
    </section>
  );
};
