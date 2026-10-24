import React from 'react';
import { SecurityAlert } from '../../core/types';
import { eventBus, EVENTS } from '../../core/bus';

interface SecurityAppProps {
  alerts: SecurityAlert[];
  onBlockIp: (alertId: string, ip: string) => void;
}

export const SecurityApp: React.FC<SecurityAppProps> = ({ alerts, onBlockIp }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-error text-[22px]">shield</span>
            <h1 className="text-xl sm:text-2xl font-bold text-on-surface">Trung Tâm An Ninh & Tường Lửa WAF</h1>
          </div>
          <p className="text-xs text-on-surface-variant">
            Giám sát thời gian thực các nỗ lực xâm nhập bất thường, dò quét mật khẩu và quản lý danh sách đen IP
          </p>
        </div>
        <button
          onClick={() => eventBus.emit(EVENTS.SHOW_TOAST, 'Đã làm mới cơ chế phân tích luồng an ninh!')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface text-xs font-semibold border border-outline-variant/40 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">refresh</span>
          <span>Rà soát an ninh lại</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-xs text-outline uppercase font-semibold">Tình trạng Tường lửa WAF</span>
          <div className="text-2xl font-bold text-secondary my-1">Bảo vệ 100%</div>
          <span className="text-xs text-outline">Quy tắc lọc L7 ĐHQG đang kích hoạt</span>
        </div>
        <div className="p-5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-xs text-outline uppercase font-semibold">Sự cố an ninh cần xử lý</span>
          <div className="text-2xl font-bold text-error my-1 font-mono">
            {alerts.filter(a => a.status === 'active').length} Sự cố
          </div>
          <span className="text-xs text-error font-medium">Khuyến nghị chặn IP khẩn cấp</span>
        </div>
        <div className="p-5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-xs text-outline uppercase font-semibold">IP đã đưa vào danh sách đen</span>
          <div className="text-2xl font-bold text-on-surface my-1 font-mono">28 dải IP</div>
          <span className="text-xs text-outline">Tự động mở khóa sau 24h</span>
        </div>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-5 rounded-xl border transition-all ${
              alert.severity === 'high'
                ? 'bg-surface-container-lowest border-error/40 shadow-xs'
                : 'bg-surface-container-lowest border-outline-variant/30'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 mb-2 border-b border-surface-container-high gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-outline">#{alert.id}</span>
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
                <span className="text-xs text-outline font-mono">IP: {alert.ip}</span>
              </div>
              <span className="text-xs text-outline font-mono">{alert.timeAgo}</span>
            </div>

            <h3 className="text-sm font-bold text-on-surface mb-2">{alert.title}</h3>

            <div className="p-3 bg-surface-container-low rounded-lg text-xs text-on-surface-variant mb-4 border border-outline-variant/20">
              <strong className="text-primary font-semibold">Tác vụ can thiệp: </strong>
              {alert.actionTaken}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-outline">
                Trạng thái: <strong className="text-on-surface">{alert.status === 'active' ? 'Đang mở (Active)' : 'Đã giải quyết (Resolved)'}</strong>
              </span>

              {alert.status === 'active' && (
                <button
                  onClick={() => onBlockIp(alert.id, alert.ip)}
                  className="px-4 py-1.5 rounded-lg bg-error hover:bg-error/90 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">block</span>
                  Chặn vĩnh viễn IP trên WAF
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
