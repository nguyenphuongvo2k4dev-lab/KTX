import React from 'react';

interface StudentRoomRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentRoomRulesModal: React.FC<StudentRoomRulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4 border border-outline-variant/30 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[22px]">menu_book</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-on-surface">Quy Ước Phòng 402 & Nội Quy KTX</h3>
              <p className="text-xs text-outline">Quy định nếp sống văn minh KTX ĐHQG</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface-container text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="space-y-3 text-xs text-on-surface-variant max-h-[60vh] overflow-y-auto pr-1">
          <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container-high">
            <h4 className="font-bold text-on-surface mb-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
              1. Giờ giấc & Trật tự chung
            </h4>
            <p>Cửa ra vào sảnh tòa nhà B2 khóa từ 23:00 đến 05:00 sáng. Sau 23:00 giữ trật tự chung, tắt bớt đèn tuýp lớn và chỉ sử dụng đèn bàn học.</p>
          </div>

          <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container-high">
            <h4 className="font-bold text-on-surface mb-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-secondary">cleaning_services</span>
              2. Vệ sinh & Phân công trực nhật phòng
            </h4>
            <p>Lịch trực nhật xoay vòng 4 bạn: Thứ 2 (G1), Thứ 4 (G2), Thứ 6 (G3), Chủ nhật (G4). Đổ rác trước 08:00 sáng tại khu gom rác cầu thang.</p>
          </div>

          <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container-high">
            <h4 className="font-bold text-on-surface mb-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">power</span>
              3. Tiết kiệm điện nước & An toàn PCCC
            </h4>
            <p>Tắt điều hòa khi ra khỏi phòng trên 30 phút. Nghiêm cấm dùng bếp điện công suất &gt; 1500W, bình siêu tốc không rõ nguồn gốc hoặc đốt nến trong phòng.</p>
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-surface-container-high">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container"
          >
            Đã hiểu & Tuân thủ
          </button>
        </div>
      </div>
    </div>
  );
};
