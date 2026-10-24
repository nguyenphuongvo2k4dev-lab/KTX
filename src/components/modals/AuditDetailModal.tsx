import React from 'react';
import { AuditLog } from '../../core/types';

interface AuditDetailModalProps {
  log: AuditLog | null;
  onClose: () => void;
  onToggleLock: (logId: string) => void;
}

export const AuditDetailModal: React.FC<AuditDetailModalProps> = ({
  log,
  onClose,
  onToggleLock
}) => {
  if (!log) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-surface-container-low flex items-center justify-between border-b border-surface-container-high">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-on-surface">Chi Tiết Bản Ghi Kiểm Toán</h3>
              <p className="text-xs font-mono text-outline">{log.id} · Mã hóa SHA-256</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Details Content */}
        <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
          {/* Main Info */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-outline">Thời gian ghi nhận:</span>
              <span className="font-mono font-semibold text-on-surface">
                {log.time} - {log.date}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-outline">Người thực thi:</span>
              <span className="font-semibold text-on-surface">
                {log.user.name} ({log.user.role})
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-outline">Email xác thực:</span>
              <span className="font-mono text-outline">{log.user.email}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-outline">Hành động:</span>
              <span className="font-semibold text-primary">{log.action}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-outline">Đối tượng ảnh hưởng:</span>
              <span className="font-mono px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-semibold">
                {log.targetId}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-outline">Địa chỉ IP & Môi trường:</span>
              <span className="font-mono text-secondary">{log.ip} · {log.device}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-outline">Trạng thái:</span>
              <span className="font-bold text-primary">{log.statusText}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-outline uppercase mb-1">Mô tả chi tiết tác vụ:</h4>
            <p className="p-3 rounded-lg bg-surface-container-low text-xs text-on-surface border border-outline-variant/30">
              {log.detail}
            </p>
          </div>

          {/* JSON Payload Inspection */}
          {log.payload && (
            <div>
              <h4 className="text-xs font-bold text-outline uppercase mb-1">Dữ liệu Payload mã hóa:</h4>
              <pre className="p-3 rounded-lg bg-surface-container-highest text-[11px] font-mono text-on-surface overflow-x-auto border border-outline-variant/30">
                {JSON.stringify(log.payload, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-surface-container-low/70 border-t border-surface-container-high flex items-center justify-between">
          <button
            onClick={() => onToggleLock(log.id)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              log.status === 'locked'
                ? 'bg-secondary text-white hover:bg-secondary/90'
                : 'bg-error-container text-on-error-container hover:bg-error hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {log.status === 'locked' ? 'lock_open' : 'lock'}
            </span>
            <span>{log.status === 'locked' ? 'Mở khóa tài khoản đối tượng' : 'Khóa khẩn cấp đối tượng'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface text-xs font-semibold"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
