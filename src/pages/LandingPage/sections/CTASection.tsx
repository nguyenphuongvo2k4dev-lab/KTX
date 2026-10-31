import React from 'react';
import { useNavigate } from 'react-router-dom';

export const CTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-surface-container-low/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Decorative orbs */}
        <div className="relative">
          <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-primary-fixed opacity-30 blur-3xl" />

          <div className="relative z-10 bg-surface-container-lowest rounded-3xl p-8 sm:p-12 border border-outline-variant/20 shadow-xl overflow-hidden">
            {/* Inner decorative glow */}
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-primary-fixed opacity-25 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-secondary-fixed opacity-20 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-primary text-xs font-bold mb-5">
                <span className="material-symbols-outlined text-[14px]">how_to_reg</span>
                Đăng ký kỳ HK2 · 25/10 – 05/11/2024
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface tracking-tight mb-4">
                Bắt đầu trải nghiệm{' '}
                <span className="text-primary">SmartDorm</span>{' '}
                ngay hôm nay
              </h2>

              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mb-8 max-w-xl mx-auto">
                Hơn 12,450 sinh viên ĐHQG đang sử dụng SmartDorm mỗi ngày. Tham gia để trải nghiệm ký túc xá thông minh thế hệ mới.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
                <button
                  onClick={() => navigate('/register')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-md hover:bg-primary-container hover:shadow-lg transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                  Đăng ký lưu trú K24
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-surface-container text-on-surface rounded-xl font-semibold text-sm border border-outline-variant/30 hover:bg-surface-container-high transition-all"
                >
                  <span className="material-symbols-outlined text-[20px] text-primary">login</span>
                  Đăng nhập tài khoản
                </button>
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-on-surface-variant">
                {[
                  { icon: 'lock', label: 'Bảo mật TLS 1.3' },
                  { icon: 'verified_user', label: 'ISO/IEC 27001' },
                  { icon: 'support_agent', label: 'Hỗ trợ 7/24' },
                  { icon: 'speed', label: 'Dưới 28ms latency' },
                ].map((t) => (
                  <div key={t.label} className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary">{t.icon}</span>
                    <span>{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact strip */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-on-surface-variant">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-primary">call</span>
            <span>Hotline: <strong className="font-mono text-on-surface">024 3754 7890</strong></span>
          </div>
          <span className="hidden sm:inline text-outline-variant">•</span>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-secondary">mail</span>
            <span>hotro@ktx.vnuhcm.edu.vn</span>
          </div>
          <span className="hidden sm:inline text-outline-variant">•</span>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-outline">schedule</span>
            <span>T2–T6: 07:30 – 17:30</span>
          </div>
        </div>
      </div>
    </section>
  );
};
