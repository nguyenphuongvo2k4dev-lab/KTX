import React, { useState } from 'react';
import { PortalMode } from '../../core/types';

interface StudentHeaderProps {
  onToggleMobileMenu: () => void;
  onOpenNotifications: () => void;
  onSwitchPortal?: (mode: PortalMode) => void;
}

export const StudentHeader: React.FC<StudentHeaderProps> = ({
  onToggleMobileMenu,
  onOpenNotifications,
}) => {
  const [profileDropdown, setProfileDropdown] = useState(false);

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 px-4 sm:px-8 flex items-center justify-between gap-4 border-b border-outline-variant/30">
      {/* Mobile Hamburger + Search Input */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-lg transition-colors shrink-0"
          aria-label="Mở menu"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>

        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none">
            search
          </span>
          <input
            className="w-full h-10 pl-10 pr-4 bg-surface-container-low rounded-lg text-xs sm:text-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 transition-all border border-transparent hover:border-outline-variant/30"
            placeholder="Tìm kiếm thông báo, hóa đơn, quy định KTX..."
            type="text"
          />
        </div>
      </div>

      {/* Right User info cluster */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high text-primary text-xs font-semibold">
          <span className="material-symbols-outlined text-[16px]">school</span>
          <span>Học kỳ 1 - 2024/2025</span>
        </div>

        {/* Semester badge */}

        {/* Notifications trigger */}
        <button
          onClick={onOpenNotifications}
          aria-label="Thông báo sinh viên"
          className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
        >
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-error text-on-error text-[10px] flex items-center justify-center font-bold">
            3
          </span>
        </button>

        {/* Profile Card */}
        <div className="relative">
          <div
            onClick={() => setProfileDropdown(!profileDropdown)}
            className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-outline-variant/40 cursor-pointer select-none group"
          >
            <div className="flex flex-col text-right hidden sm:flex">
              <span className="text-xs font-bold text-on-surface">Đặng Hoàng Nam</span>
              <span className="text-[11px] text-on-surface-variant">
                MSSV: 22120045 • Khu Nhà B - P.402
              </span>
            </div>

            <div className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs ring-2 ring-primary/20 shrink-0">
              HN
            </div>
            <span className="material-symbols-outlined text-outline text-[18px]">expand_more</span>
          </div>

          {/* Profile Dropdown */}
          {profileDropdown && (
            <div className="absolute right-0 top-full mt-2 w-56 py-1.5 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/30 z-50">
              <div className="px-4 py-2 border-b border-surface-container-high">
                <p className="text-xs font-bold text-on-surface">Đặng Hoàng Nam</p>
                <p className="text-[11px] text-outline font-mono">MSSV: 22120045</p>
                <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-bold">
                  Phòng 402 - Tòa B2 (Trưởng phòng)
                </span>
              </div>

              <div className="py-1 text-xs text-on-surface">
                <button
                  onClick={() => setProfileDropdown(false)}
                  className="w-full text-left px-4 py-2 hover:bg-surface-container flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">account_circle</span>
                  Hồ sơ cá nhân
                </button>
                <button
                  onClick={() => {
                    setProfileDropdown(false);
                    alert('Chức năng đổi mật khẩu gửi mã OTP qua email sinh viên VNU.');
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-surface-container flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">lock_reset</span>
                  Đổi mật khẩu
                </button>
              </div>

              <div className="h-px bg-outline-variant/30 my-1" />

              <button
                onClick={() => {
                  setProfileDropdown(false);
                  window.location.href = '/login';
                }}
                className="w-full text-left px-4 py-2 text-xs font-semibold text-error hover:bg-error-container/40 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
