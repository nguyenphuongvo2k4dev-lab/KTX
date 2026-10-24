import React, { useState } from 'react';
import { api } from '../../core/api';
import { eventBus, EVENTS } from '../../core/bus';

interface BackupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BackupModal: React.FC<BackupModalProps> = ({ isOpen, onClose }) => {
  const [inProgress, setInProgress] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [backupResult, setBackupResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleStartBackup = async () => {
    setInProgress(true);
    setProgressPercent(15);

    const timer = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 85) {
          clearInterval(timer);
          return 85;
        }
        return prev + 20;
      });
    }, 350);

    try {
      const res = await api.triggerBackup();
      clearInterval(timer);
      setProgressPercent(100);
      setBackupResult(res);
      eventBus.emit(EVENTS.SHOW_TOAST, 'Sao lưu CSDL KTX ĐHQG hoàn tất thành công!');
    } catch {
      clearInterval(timer);
      alert('Không thể thực hiện sao lưu lúc này.');
    } finally {
      setInProgress(false);
    }
  };

  const handleReset = () => {
    setBackupResult(null);
    setProgressPercent(0);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-surface-container-low flex items-center justify-between border-b border-surface-container-high">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-on-secondary">
              <span className="material-symbols-outlined text-[18px]">cloud_sync</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-on-surface">Sao Lưu Dữ Liệu Tức Thì</h3>
              <p className="text-xs text-outline">ĐHQG Cloud S3 Immutable Snapshots</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {!backupResult ? (
            <>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Hệ thống sẽ tạo bản chụp Snapshot nhất quán (Atomic snapshot) cho toàn bộ CSDL PostgreSQL và dữ liệu thiết bị IoT KTX. Không làm gián đoạn cổng sinh viên và barrier RFID.
              </p>

              <div className="p-3 bg-surface-container-low rounded-xl border border-surface-container-high space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-outline">Dung lượng ước tính:</span>
                  <span className="font-mono font-bold text-on-surface">~14.28 GB</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-outline">Đích lưu trữ:</span>
                  <span className="font-mono text-secondary font-semibold">VNU-Cloud S3 Storage (Multi-AZ)</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-outline">Mã hóa:</span>
                  <span className="font-mono text-on-surface font-semibold">AES-256 GCM</span>
                </div>
              </div>

              {inProgress && (
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-primary flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                      Đang đồng bộ dữ liệu vào S3...
                    </span>
                    <span className="font-mono">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full transition-all duration-300 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high space-y-3">
              <div className="flex items-center gap-2 text-secondary font-bold text-sm">
                <span className="material-symbols-outlined text-[20px]">verified</span>
                <span>Sao lưu thành công!</span>
              </div>
              <p className="text-xs text-on-surface-variant">
                {backupResult.message}
              </p>
              <div className="bg-surface-container-lowest p-2.5 rounded-lg border border-outline-variant/30 text-xs font-mono text-on-surface space-y-1">
                <div>Snapshot ID: <span className="text-primary font-bold">{backupResult.backupId}</span></div>
                <div>Dung lượng: {backupResult.size}</div>
                <div className="text-[11px] text-outline truncate">Bucket: {backupResult.storageBucket}</div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-surface-container-low/70 border-t border-surface-container-high flex items-center justify-end gap-3">
          {!backupResult ? (
            <>
              <button
                type="button"
                onClick={onClose}
                disabled={inProgress}
                className="px-4 py-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface text-xs font-semibold"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={handleStartBackup}
                disabled={inProgress}
                className="px-5 py-2 rounded-lg bg-secondary text-white hover:bg-secondary/90 text-xs font-semibold shadow-sm transition-all disabled:opacity-50 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">cloud_upload</span>
                <span>Khởi chạy sao lưu ngay</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2 rounded-lg bg-primary text-white text-xs font-semibold"
            >
              Hoàn tất
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
