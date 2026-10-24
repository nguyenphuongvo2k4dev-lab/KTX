import React from 'react';

interface StudentMeterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentMeterModal: React.FC<StudentMeterModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-6 shadow-2xl flex flex-col gap-4 border border-outline-variant/30 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[22px]">speed</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-on-surface">Chỉ Số Công Tơ IoT Phòng 402</h3>
              <p className="text-xs text-outline">Đồng bộ tự động qua Modbus-RTU 30s/lần</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface-container text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="space-y-3">
          {/* Electric meter */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">bolt</span>
                <span className="text-xs font-bold text-on-surface">Công tơ điện tử 1 pha</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">
                Online • 220V
              </span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <span className="text-2xl font-bold font-mono text-on-surface">1,420.4</span>
              <span className="text-xs text-outline">kWh (Đầu kỳ: 1,278.4 kWh)</span>
            </div>
            <div className="text-[11px] text-on-surface-variant flex justify-between pt-1 border-t border-surface-container-high">
              <span>Tiêu thụ tháng 10:</span>
              <span className="font-mono font-bold text-primary">142.0 kWh</span>
            </div>
          </div>

          {/* Water meter */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">water_drop</span>
                <span className="text-xs font-bold text-on-surface">Đồng hồ nước điện tử NB-IoT</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">
                Online • Áp lực tốt
              </span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <span className="text-2xl font-bold font-mono text-on-surface">112.6</span>
              <span className="text-xs text-outline">m³ (Đầu kỳ: 96.6 m³)</span>
            </div>
            <div className="text-[11px] text-on-surface-variant flex justify-between pt-1 border-t border-surface-container-high">
              <span>Tiêu thụ tháng 10:</span>
              <span className="font-mono font-bold text-secondary">16.0 m³</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-surface-container-high">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
