import React, { useState } from 'react';
import { eventBus, EVENTS } from '../../core/bus';

interface TopHeaderProps {
  onToggleMobileMenu: () => void;
  onOpenCommandPalette: () => void;
  onToggleNotifications: () => void;
  notificationCount: number;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onToggleMobileMenu,
  onOpenCommandPalette,
  onToggleNotifications,
  notificationCount
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-surface-container-lowest/95 backdrop-blur-md z-30 shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/30">
      <div className="h-16 w-full px-4 lg:px-6 flex items-center justify-between gap-3">
        {/* Left: Hamburger for mobile + Search Input */}
        <div className="flex items-center gap-2 flex-1 max-w-xl">
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-lg transition-colors shrink-0"
            aria-label="Mở danh mục điều hướng"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>

          <div
            onClick={onOpenCommandPalette}
            className="relative flex items-center flex-1 cursor-pointer group"
          >
            <span className="material-symbols-outlined absolute left-3 text-outline pointer-events-none text-[20px] group-hover:text-primary transition-colors">
              search
            </span>
            <input
              readOnly
              onClick={onOpenCommandPalette}
              className="w-full h-10 pl-10 pr-16 bg-surface-container-low text-on-surface placeholder:text-outline text-xs sm:text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all cursor-pointer border border-transparent hover:border-outline-variant/40"
              placeholder="Tìm tài khoản, vai trò, cấu hình, kiểm toán (Ctrl+K)..."
              type="text"
            />
            <kbd className="absolute right-2.5 hidden sm:inline-flex items-center font-mono text-[11px] bg-surface-container px-1.5 py-0.5 rounded text-on-surface-variant pointer-events-none border border-outline-variant/30">
              Ctrl+K
            </kbd>
          </div>
        </div>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Cloud Environment status */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-semibold">
            <span className="material-symbols-outlined text-[16px]">cloud_done</span>
            <span>Production - Cloud ĐHQG</span>
          </div>

          {/* Quick Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => eventBus.emit(EVENTS.OPEN_QUICK_CONFIG)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-low text-on-surface hover:bg-surface-container-high rounded-lg text-xs font-semibold transition-colors border border-outline-variant/30"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">tune</span>
              <span>Cấu hình nhanh</span>
            </button>

            <button
              onClick={() => eventBus.emit(EVENTS.OPEN_BACKUP)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-low text-on-surface hover:bg-surface-container-high rounded-lg text-xs font-semibold transition-colors border border-outline-variant/30"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">backup</span>
              <span>Sao lưu dữ liệu</span>
            </button>
          </div>

          {/* Notifications Trigger */}
          <button
            onClick={onToggleNotifications}
            className="relative w-10 h-10 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors"
            type="button"
            aria-label="Thông báo an ninh"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {notificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-error text-on-error text-[10px] flex items-center justify-center font-bold animate-pulse">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Profile User Dropdown */}
          <div className="relative">
            <div
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 pl-1.5 sm:pl-2 cursor-pointer select-none group"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-sm text-on-primary font-bold text-xs shrink-0">
                TK
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs text-on-surface font-semibold leading-tight">
                  TS. Trần Minh Khoa
                </span>
                <span className="text-[11px] text-on-surface-variant leading-tight">
                  Quản trị viên Hệ thống (Super Admin)
                </span>
              </div>
              <span className="material-symbols-outlined text-outline group-hover:text-on-surface transition-colors text-[20px]">
                expand_more
              </span>
            </div>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/40 py-2 z-50">
                <div className="px-4 py-2 border-b border-surface-container-high">
                  <p className="text-xs font-bold text-on-surface">TS. Trần Minh Khoa</p>
                  <p className="text-[11px] font-mono text-outline">root@dorm.edu.vn</p>
                  <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-bold">
                    SuperAdmin Full Access
                  </span>
                </div>

                <div className="py-1 text-xs text-on-surface">
                  <button
                    onClick={() => {
                      eventBus.emit(EVENTS.NAVIGATE, 'account-management');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-surface-container-low flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px] text-outline">
                      manage_accounts
                    </span>
                    Quản lý tài khoản cá nhân
                  </button>

                  <button
                    onClick={() => {
                      eventBus.emit(EVENTS.NAVIGATE, 'roles-permissions');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-surface-container-low flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px] text-outline">
                      admin_panel_settings
                    </span>
                    Kiểm tra quyền hạn RBAC
                  </button>

                  <button
                    onClick={() => {
                      eventBus.emit(EVENTS.OPEN_QUICK_CONFIG);
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-surface-container-low flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px] text-outline">
                      settings
                    </span>
                    Thiết lập hệ thống
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      window.location.href = '/student/overview';
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-surface-container-low flex items-center gap-2 text-primary font-semibold"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      school
                    </span>
                    Chuyển sang Cổng Sinh Viên
                  </button>
                </div>

                <div className="border-t border-surface-container-high pt-1">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      window.location.href = '/login';
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-error-container/40 text-error flex items-center gap-2 text-xs font-semibold"
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    Đăng xuất phiên SuperAdmin
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
