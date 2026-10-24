import React, { useState } from 'react';
import { eventBus, EVENTS } from '../../core/bus';

interface MaintenanceTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDevice?: string;
}

export const MaintenanceTicketModal: React.FC<MaintenanceTicketModalProps> = ({
  isOpen,
  onClose,
  defaultDevice = 'Đồng hồ nước điện tử (5 đồng hồ pin yếu <10% - Khu B & C)'
}) => {
  const [device, setDevice] = useState(defaultDevice);
  const [priority, setPriority] = useState('Cao (High)');
  const [technician, setTechnician] = useState('KTV Nguyễn Văn Hùng (Tổ Điện - Nước)');
  const [notes, setNotes] = useState('Pin lithium 3.6V cho bộ phát tín hiệu NB-IoT sắp cạn nguồn. Cần thay thế trước khi chu kỳ chốt chỉ số ngày 30/10.');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    eventBus.emit(EVENTS.SHOW_TOAST, 'Đã phân công phiếu kỹ thuật KTX thành công!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-surface-container-low flex items-center justify-between border-b border-surface-container-high">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-on-secondary">
              <span className="material-symbols-outlined text-[18px]">build</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-on-surface">Tạo Phiếu Kỹ Thuật IoT KTX</h3>
              <p className="text-xs text-outline">Điều phối đội bảo trì hạ tầng ĐHQG</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              Thiết bị hoặc cụm IoT cần xử lý
            </label>
            <input
              type="text"
              value={device}
              onChange={(e) => setDevice(e.target.value)}
              className="w-full h-10 px-3 bg-surface-container-low text-on-surface text-sm rounded-lg border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Mức độ ưu tiên
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full h-10 px-3 bg-surface-container-low text-on-surface text-sm rounded-lg border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Khẩn cấp (Critical)">Khẩn cấp (Critical)</option>
                <option value="Cao (High)">Cao (High)</option>
                <option value="Bình thường (Normal)">Bình thường (Normal)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Kỹ thuật viên phụ trách
              </label>
              <select
                value={technician}
                onChange={(e) => setTechnician(e.target.value)}
                className="w-full h-10 px-3 bg-surface-container-low text-on-surface text-sm rounded-lg border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="KTV Nguyễn Văn Hùng (Tổ Điện - Nước)">KTV Nguyễn Văn Hùng (Điện - Nước)</option>
                <option value="KTV Phạm Quốc Đạt (Tổ Mạng & Barrier)">KTV Phạm Quốc Đạt (Mạng & Barrier)</option>
                <option value="KTV Lê Tuấn Anh (Tổ Điều hòa - PCCC)">KTV Lê Tuấn Anh (PCCC)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              Ghi chú hiện trường & vật tư thay thế
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 bg-surface-container-low text-on-surface text-xs rounded-lg border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-surface-container-high">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface text-xs font-semibold"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-secondary hover:bg-secondary/90 text-white text-xs font-semibold shadow-sm transition-all"
            >
              Gửi lệnh phân công KTV
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
