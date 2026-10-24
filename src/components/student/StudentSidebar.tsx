import React from 'react';
import { StudentAppId, PortalMode } from '../../core/types';

interface StudentSidebarProps {
  currentPath: StudentAppId;
  onNavigate: (path: StudentAppId) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onSwitchPortal?: (mode: PortalMode) => void;
  onOpenRules: () => void;
}

const NAV_ITEMS: Array<{ id: StudentAppId; label: string; icon: string; badge?: number }> = [
  { id: 'trang-chu-tong-quan', label: 'Trang chủ / Tổng quan', icon: 'dashboard' },
  { id: 'thong-tin-ca-nhan', label: 'Thông tin cá nhân', icon: 'person' },
  { id: 'phong-o-hien-tai', label: 'Phòng ở hiện tại', icon: 'bed' },
  { id: 'dang-ky-chuyen-phong', label: 'Đăng ký & Chuyển phòng', icon: 'swap_horiz' },
  { id: 'hop-dong-luu-tru', label: 'Hợp đồng lưu trú', icon: 'description' },
  { id: 'hoa-don-thanh-toan', label: 'Hóa đơn & Thanh toán', icon: 'receipt_long' },
  { id: 'bao-hong-phan-anh-su-co', label: 'Báo hỏng & Phản ánh', icon: 'build_circle' },
  { id: 'thong-bao', label: 'Thông báo', icon: 'notifications', badge: 3 },
  { id: 'lich-su-yeu-cau', label: 'Lịch sử yêu cầu', icon: 'history' }
];

export const StudentSidebar: React.FC<StudentSidebarProps> = ({
  currentPath,
  onNavigate,
  mobileOpen,
  onCloseMobile,
  onSwitchPortal,
  onOpenRules
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between border-r border-outline-variant/30 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col flex-1 min-h-0">
          {/* Header Brand */}
          <div className="px-6 pt-6 pb-4 flex flex-col gap-3 border-b border-outline-variant/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold text-lg shadow-sm">
                  <span className="material-symbols-outlined text-[24px]">apartment</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold text-primary tracking-tight">SmartDorm</span>
                  <span className="text-[11px] text-on-surface-variant font-medium">Cổng Sinh Viên</span>
                </div>
              </div>

              {/* Close on mobile */}
              <button
                onClick={onCloseMobile}
                className="lg:hidden p-1 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-primary text-[11px] font-semibold w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Sinh viên KTX ĐHQG</span>
              </div>
              <span className="text-[11px] text-on-surface-variant font-mono">K22-K24</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto flex flex-col px-3 py-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPath === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                    isActive
                      ? 'bg-primary text-on-primary font-semibold shadow-sm'
                      : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px] shrink-0">
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-error text-on-error'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer info box */}
        <div className="p-4 mx-3 mb-4 rounded-xl bg-surface-container-low flex flex-col gap-2.5 border border-outline-variant/30">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span className="text-xs font-semibold">Hotline BQL: 024 3754 7890</span>
          </div>
          <button
            onClick={onOpenRules}
            className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors text-xs text-left"
          >
            <span className="material-symbols-outlined text-[16px]">menu_book</span>
            <span>Nội quy & Quy chế KTX</span>
          </button>
        </div>
      </aside>
    </>
  );
};
