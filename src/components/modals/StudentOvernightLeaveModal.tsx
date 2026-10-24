import React, { useState } from 'react';
import { eventBus, EVENTS } from '../../core/bus';

interface StudentOvernightLeaveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentOvernightLeaveModal: React.FC<StudentOvernightLeaveModalProps> = ({ isOpen, onClose }) => {
  const [fromDate, setFromDate] = useState('2024-10-25');
  const [toDate, setToDate] = useState('2024-10-27');
  const [reason, setReason] = useState('Về quê thăm gia đình cuối tuần');
  const [emergencyPhone, setEmergencyPhone] = useState('0988 123 456 (Phụ huynh)');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    eventBus.emit(EVENTS.SHOW_TOAST, 'Đã gửi đơn đăng ký tạm vắng qua đêm tới Ban Quản lý Tòa B2!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-6 shadow-2xl flex flex-col gap-4 border border-outline-variant/30 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[22px]">night_shelter</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-on-surface">Đăng Ký Tạm Vắng Qua Đêm</h3>
              <p className="text-xs text-outline">Báo cáo lịch vắng mặt sau 22h30 KTX ĐHQG</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface-container text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Từ ngày</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full h-9 px-3 bg-surface-container-low rounded-lg border border-outline-variant/40"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Đến ngày</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full h-9 px-3 bg-surface-container-low rounded-lg border border-outline-variant/40"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Lý do vắng mặt</label>
            <textarea
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2.5 bg-surface-container-low rounded-lg border border-outline-variant/40"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Số điện thoại liên hệ khẩn cấp</label>
            <input
              type="text"
              value={emergencyPhone}
              onChange={(e) => setEmergencyPhone(e.target.value)}
              className="w-full h-9 px-3 bg-surface-container-low rounded-lg border border-outline-variant/40"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-surface-container-high">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-surface-container text-on-surface text-xs font-semibold"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold shadow-xs hover:bg-primary-container"
            >
              Gửi thông báo tạm vắng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
