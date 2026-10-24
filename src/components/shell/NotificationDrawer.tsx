import React from 'react';
import { SecurityAlert } from '../../core/types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: SecurityAlert[];
  onBlockIp: (alertId: string, ip: string) => void;
  onViewAllSecurity: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  alerts,
  onBlockIp,
  onViewAllSecurity
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface-container-lowest shadow-2xl border-l border-outline-variant/30 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-surface-container-high flex items-center justify-between bg-surface-container-low/50">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-error text-[24px]">security</span>
              <div>
                <h3 className="text-sm font-bold text-on-surface">Cảnh Báo An Ninh Hệ Thống</h3>
                <p className="text-xs text-outline">Real-time Security Stream</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-high"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* List of alerts */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {alerts.length === 0 ? (
              <div className="text-center py-12 text-outline text-sm">
                Không có sự cố an ninh chưa xử lý
              </div>
            ) : (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    alert.severity === 'high'
                      ? 'bg-error-container/30 border-error/30'
                      : alert.severity === 'medium'
                      ? 'bg-amber-500/10 border-amber-500/30'
                      : 'bg-surface-container-low border-surface-container-high'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-semibold text-outline">
                      #{alert.id}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        alert.severity === 'high'
                          ? 'bg-error-container text-on-error-container'
                          : alert.severity === 'medium'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-secondary-fixed text-on-secondary-fixed'
                      }`}
                    >
                      {alert.severityLabel}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-on-surface mb-2">
                    {alert.title}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-outline mb-2">
                    <span className="font-mono text-secondary">IP: {alert.ip}</span>
                    <span>{alert.timeAgo}</span>
                  </div>

                  <div className="text-[11px] text-on-surface-variant bg-surface-container-lowest/80 p-2 rounded mb-2 border border-outline-variant/20">
                    <span className="font-semibold text-primary">Hành động: </span>
                    {alert.actionTaken}
                  </div>

                  {alert.status === 'active' && (
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => onBlockIp(alert.id, alert.ip)}
                        className="flex-1 py-1 px-2 rounded-lg bg-error text-white hover:bg-error/90 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[14px]">block</span>
                        Chặn IP WAF
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-surface-container-high bg-surface-container-low">
            <button
              onClick={() => {
                onClose();
                onViewAllSecurity();
              }}
              className="w-full py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <span>Xem chi tiết trung tâm an ninh</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
