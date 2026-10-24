import React from 'react';
import { MicroAppId } from '../../core/types';

interface SidebarProps {
  currentPath: MicroAppId;
  onNavigate: (path: MicroAppId) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  alertCount?: number;
}

const NAV_ITEMS: Array<{ id: MicroAppId; label: string; icon: string; badge?: number }> = [
  { id: 'overview', label: 'Tổng quan', icon: 'grid_view' },
  { id: 'account-management', label: 'Quản lý tài khoản', icon: 'manage_accounts' },
  { id: 'roles-permissions', label: 'Vai trò & Phân quyền', icon: 'admin_panel_settings' },
  { id: 'system-catalogs', label: 'Danh mục hệ thống', icon: 'domain' },
  { id: 'fee-tariffs', label: 'Quản lý biểu phí', icon: 'payments' },
  { id: 'audit-logs', label: 'Nhật ký hoạt động', icon: 'receipt_long' },
  { id: 'system-reports', label: 'Báo cáo tổng hợp', icon: 'analytics' },
  { id: 'system-configuration', label: 'Cấu hình hệ thống', icon: 'tune' },
  { id: 'security-alerts', label: 'Cảnh báo bảo mật', icon: 'shield', badge: 4 }
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath,
  onNavigate,
  mobileOpen,
  onCloseMobile,
  alertCount = 4
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
        className={`fixed left-0 top-0 h-full w-72 bg-surface-container-low z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-outline-variant/30 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col flex-1 min-h-0">
          {/* Brand Header */}
          <div className="h-16 px-6 flex items-center justify-between bg-surface-container-low border-b border-outline-variant/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm">
                <span className="material-symbols-outlined text-[22px]">apartment</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-base text-primary tracking-tight font-bold font-sans">
                    SmartDorm
                  </span>
                  <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-semibold">
                    ĐHQG
                  </span>
                </div>
                <span className="text-xs text-on-surface-variant font-medium">
                  Quản trị hệ thống (Admin)
                </span>
              </div>
            </div>

            {/* Close button on mobile */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-colors"
              aria-label="Đóng menu"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto px-4 py-3">
            <div className="px-2 py-1 text-[11px] text-outline uppercase tracking-wider font-semibold">
              Bàn làm việc quản trị
            </div>

            <nav className="flex flex-col gap-1 mt-1">
              {NAV_ITEMS.map((item) => {
                const isActive = currentPath === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      onCloseMobile();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all text-left ${
                      isActive
                        ? 'bg-primary-container text-on-primary font-semibold shadow-sm'
                        : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-medium'
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
                        className={`px-1.5 py-0.5 rounded-full text-[11px] font-bold ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-error-container text-on-error-container'
                        }`}
                      >
                        {item.id === 'security-alerts' ? alertCount : item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Server & Infrastructure Widget Box at Sidebar Bottom */}
        <div className="p-4 bg-surface-container-low border-t border-outline-variant/20">
          <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] mb-2 border border-outline-variant/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-on-surface-variant font-semibold">
                Tình trạng cụm máy chủ
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-secondary font-medium">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                Online
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 mb-2">
              <div className="bg-surface-container-low px-2 py-1 rounded">
                <span className="text-[11px] text-outline block">CPU Core</span>
                <span className="font-mono text-xs text-on-surface font-semibold">18% Load</span>
              </div>
              <div className="bg-surface-container-low px-2 py-1 rounded">
                <span className="text-[11px] text-outline block">RAM Heap</span>
                <span className="font-mono text-xs text-on-surface font-semibold">42% Dùng</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-on-surface-variant font-mono text-xs pt-1 border-t border-surface-container-high/60">
              <span className="text-[11px]">DB Uptime</span>
              <span className="text-primary font-semibold">99.98%</span>
            </div>
          </div>

          <div className="flex items-center justify-between px-1 text-on-surface-variant text-xs">
            <span className="font-mono text-[11px] text-outline">v2.4 Enterprise</span>
            <div className="flex items-center gap-2 text-[11px]">
              <a
                href="#hotline"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Đường dây nóng kỹ thuật KTX ĐHQG: 1900 6868 (Ext: 104)');
                }}
                className="hover:text-primary transition-colors text-outline hover:underline"
              >
                Hotline
              </a>
              <span className="text-outline">·</span>
              <a
                href="#help"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Cổng trợ giúp & tài liệu hướng dẫn quản trị: docs.dorm.edu.vn');
                }}
                className="hover:text-primary transition-colors text-outline hover:underline"
              >
                Trợ giúp
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
