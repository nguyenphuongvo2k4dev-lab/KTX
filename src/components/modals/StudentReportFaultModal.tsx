import React, { useState } from 'react';
import { api } from '../../core/api';
import { eventBus, EVENTS } from '../../core/bus';

interface StudentReportFaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTicketCreated: () => void;
}

export const StudentReportFaultModal: React.FC<StudentReportFaultModalProps> = ({
  isOpen,
  onClose,
  onTicketCreated
}) => {
  const [category, setCategory] = useState('Hệ thống điện & Bóng đèn chiếu sáng');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      alert('Vui lòng nhập mô tả sự cố để KTV chuẩn bị linh kiện.');
      return;
    }
    setSubmitting(true);
    try {
      await api.createStudentTicket(category, description);
      onTicketCreated();
      eventBus.emit(EVENTS.SHOW_TOAST, 'Đã gửi báo hỏng phòng 402 tới Tổ Kỹ thuật KTX!');
      onClose();
      setDescription('');
    } catch {
      alert('Không thể gửi yêu cầu lúc này.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4 border border-outline-variant/30 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-error-container text-error flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">build</span>
            </div>
            <div className="flex flex-col">
              <h3 className="text-base font-bold text-on-surface">Gửi báo hỏng & Sự cố phòng</h3>
              <span className="text-xs text-on-surface-variant">Phòng 402 - Tòa B2 • Trưởng phòng: Đặng Hoàng Nam</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 text-xs">
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              Thiết bị / Khu vực gặp sự cố
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-10 px-3 bg-surface-container-low rounded-lg text-on-surface text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 border border-outline-variant/40"
            >
              <option>Hệ thống điện & Bóng đèn chiếu sáng</option>
              <option>Vòi nước, Lavabo, Bồn cầu vệ sinh</option>
              <option>Điều hòa nhiệt độ (Không mát, chảy nước)</option>
              <option>Bình tắm nước nóng Ariston</option>
              <option>Cửa ra vào, Khóa phòng, Cửa sổ kính</option>
              <option>Giường tầng, Bàn học sinh viên</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              Mô tả chi tiết tình trạng sự cố
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-surface-container-low rounded-lg text-on-surface text-xs placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 border border-outline-variant/40"
              placeholder="Ví dụ: Đèn tuýp LED ngoài ban công chớp nháy liên tục từ tối qua, phát ra tiếng vo ve..."
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              Ảnh chụp hiện trường sự cố (Tùy chọn)
            </label>
            <div
              onClick={() => setHasPhoto(!hasPhoto)}
              className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
                hasPhoto
                  ? 'bg-secondary-fixed/40 border-secondary text-secondary'
                  : 'bg-surface-container-low border-outline-variant/50 hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[28px] text-primary">
                {hasPhoto ? 'check_circle' : 'add_a_photo'}
              </span>
              <span className="text-xs font-medium text-on-surface">
                {hasPhoto ? 'Đã đính kèm ảnh chụp hiện trường (hỏng_đèn_ban_công.jpg)' : 'Nhấn để tải ảnh hoặc quay video ngắn'}
              </span>
              <span className="text-[11px] text-outline">Định dạng JPG, PNG dưới 10MB</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-lg bg-surface-container-low text-on-surface-variant text-[11px] border border-surface-container-high">
            <span className="material-symbols-outlined text-[18px] text-primary shrink-0">schedule</span>
            <span>Ban Quản lý tiếp nhận và xử lý kỹ thuật trong khung giờ: 08:00 - 17:30 các ngày trong tuần.</span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-surface-container-high">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors shadow-sm disabled:opacity-50 flex items-center gap-1.5"
            >
              {submitting && <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>}
              <span>Gửi yêu cầu ngay</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
