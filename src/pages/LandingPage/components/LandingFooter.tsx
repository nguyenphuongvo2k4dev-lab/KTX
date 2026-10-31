import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LandingFooter: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm">
                <span className="material-symbols-outlined text-[20px]">apartment</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-primary text-base">SmartDorm</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-primary-fixed text-primary text-[10px] font-bold">VNU</span>
                </div>
                <span className="text-[11px] text-on-surface-variant">Ký túc xá thông minh ĐHQG</span>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
              Nền tảng quản lý ký túc xá thế hệ mới cho Đại học Quốc gia TP.HCM — hiện đại, an toàn và tiện lợi.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-secondary font-medium">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>Hệ thống hoạt động 24/7 — 99.98% uptime</span>
            </div>
          </div>

          {/* Cổng sinh viên */}
          <div>
            <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-3">Sinh viên</h4>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              {['Đăng ký lưu trú', 'Tra cứu hóa đơn', 'Báo hỏng thiết bị', 'Hợp đồng điện tử', 'Gia hạn phòng'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => navigate('/login')}
                    className="hover:text-primary transition-colors text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quản trị */}
          <div>
            <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-3">Quản trị</h4>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              {['Bảng điều khiển', 'Quản lý tài khoản', 'Biểu phí KTX', 'Nhật ký kiểm toán', 'An ninh hệ thống'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => navigate('/login')}
                    className="hover:text-primary transition-colors text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Liên hệ */}
          <div>
            <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-3">Hỗ trợ</h4>
            <ul className="space-y-2.5 text-xs text-on-surface-variant">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary">call</span>
                <span className="font-mono font-semibold text-on-surface">024 3754 7890</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-secondary">mail</span>
                <span>hotro@ktx.vnuhcm.edu.vn</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-outline">schedule</span>
                <span>T2–T6: 07:30 – 17:30</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-outline mt-0.5">location_on</span>
                <span>Khu Đô thị ĐHQG, Thành phố Thủ Đức, TP.HCM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 text-xs text-on-surface-variant">
            <span>© 2024 Trung tâm Quản trị KTX — Đại học Quốc gia TP.HCM</span>
            <span className="hidden sm:inline text-outline-variant">•</span>
            <span className="flex items-center gap-1 text-secondary font-medium">
              <span className="material-symbols-outlined text-[14px]">verified_user</span>
              ISO/IEC 27001:2022
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-on-surface-variant">
            <button className="hover:text-primary transition-colors">Quy chế KTX</button>
            <button className="hover:text-primary transition-colors">Bảo mật</button>
            <button className="hover:text-primary transition-colors">VNU-ID</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
