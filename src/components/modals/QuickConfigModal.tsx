import React, { useState } from 'react';
import { eventBus, EVENTS } from '../../core/bus';

interface QuickConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickConfigModal: React.FC<QuickConfigModalProps> = ({ isOpen, onClose }) => {
  const [ssoEnabled, setSsoEnabled] = useState(true);
  const [rateLimit, setRateLimit] = useState(120);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [rfidAutoScan, setRfidAutoScan] = useState(true);

  if (!isOpen) return null;

  const handleSave = () => {
    eventBus.emit(EVENTS.SHOW_TOAST, 'Cấu hình tham số hệ thống đã được đồng bộ vào cụm K8s!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-surface-container-low flex items-center justify-between border-b border-surface-container-high">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-[18px]">tune</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-on-surface">Cấu Hình Nhanh Hệ Thống</h3>
              <p className="text-xs text-outline">Tham số cụm Cloud K8s ĐHQG TP.HCM</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-surface-container-high">
            <div>
              <div className="text-xs font-bold text-on-surface">Đồng bộ SSO Đại học Quốc Gia</div>
              <div className="text-[11px] text-outline">Tự động cấp quyền tài khoản sinh viên qua Portal VNU</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={ssoEnabled}
                onChange={(e) => setSsoEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </label>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-surface-container-high">
            <div>
              <div className="text-xs font-bold text-on-surface">Cổng RFID & FaceID Barcode Telemetry</div>
              <div className="text-[11px] text-outline">Truyền luồng quét thẻ sinh viên thời gian thực</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={rfidAutoScan}
                onChange={(e) => setRfidAutoScan(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </label>
          </div>

          <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container-high">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold text-on-surface">Giới hạn truy vấn WAF (Req/IP/Phút)</span>
              <span className="font-mono text-xs font-bold text-primary">{rateLimit} req</span>
            </div>
            <input
              type="range"
              min="30"
              max="300"
              step="10"
              value={rateLimit}
              onChange={(e) => setRateLimit(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-[10px] text-outline mt-1 font-mono">
              <span>30 req (Nghiêm ngặt)</span>
              <span>300 req (Thoải mái)</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-surface-container-high">
            <div>
              <div className="text-xs font-bold text-error">Chế độ bảo trì hệ thống</div>
              <div className="text-[11px] text-outline">Chỉ cho phép SuperAdmin và cán bộ đăng nhập</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-error" />
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-surface-container-low/70 border-t border-surface-container-high flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface text-xs font-semibold"
          >
            Đóng
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container text-xs font-semibold shadow-sm transition-all"
          >
            Lưu & Đồng bộ K8s
          </button>
        </div>
      </div>
    </div>
  );
};
