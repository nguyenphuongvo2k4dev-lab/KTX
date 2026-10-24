import React, { useState } from 'react';
import { api } from '../../core/api';
import { eventBus, EVENTS } from '../../core/bus';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded: () => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onUserAdded
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Sinh viên (Student)');
  const [room, setRoom] = useState('Khu B - B204');
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      setError('Vui lòng điền đầy đủ họ tên và email.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await api.createUser({
        fullName,
        email,
        role,
        room,
        studentId: studentId || `SV_${Math.floor(2000000 + Math.random() * 900000)}`
      });

      if (res.success) {
        onUserAdded();
        eventBus.emit(EVENTS.SHOW_TOAST, `Đã tạo tài khoản cho ${fullName} thành công!`);
        onClose();
      } else {
        setError(res.error || 'Có lỗi xảy ra.');
      }
    } catch {
      setError('Không thể kết nối máy chủ.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-surface-container-low flex items-center justify-between border-b border-surface-container-high">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-[18px]">person_add</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-on-surface">Thêm Tài Khoản Mới</h3>
              <p className="text-xs text-outline">Đồng bộ SSO ĐHQG & phân bổ phòng KTX</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-error-container text-on-error-container text-xs font-semibold">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              Họ và tên <span className="text-error">*</span>
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nguyễn Văn A"
              className="w-full h-10 px-3 bg-surface-container-low text-on-surface text-sm rounded-lg border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Email nội bộ (@vnu / @dorm) <span className="text-error">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vana@dorm.edu.vn"
                className="w-full h-10 px-3 bg-surface-container-low text-on-surface text-sm rounded-lg border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Mã định danh (MSSV / Mã Cán bộ)
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="SV_2411089"
                className="w-full h-10 px-3 bg-surface-container-low text-on-surface text-sm rounded-lg border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Vai trò phân quyền
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full h-10 px-3 bg-surface-container-low text-on-surface text-sm rounded-lg border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Sinh viên (Student)">Sinh viên (Student)</option>
                <option value="Cán bộ Quản lý (Manager)">Cán bộ Quản lý (Manager)</option>
                <option value="Kỹ thuật viên (Tech)">Kỹ thuật viên (Tech)</option>
                <option value="Kế toán (Finance)">Kế toán (Finance)</option>
                <option value="Quản trị viên (Admin)">Quản trị viên (Admin)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Phòng / Vị trí KTX
              </label>
              <select
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full h-10 px-3 bg-surface-container-low text-on-surface text-sm rounded-lg border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Khu A - A101 (CLC)">Khu A - A101 (CLC Máy lạnh)</option>
                <option value="Khu A - A102 (Đặc cách)">Khu A - A102 (Đặc cách)</option>
                <option value="Khu B - B204 (Tiêu chuẩn)">Khu B - B204 (Tiêu chuẩn)</option>
                <option value="Khu B - B308 (Tiêu chuẩn)">Khu B - B308 (Tiêu chuẩn)</option>
                <option value="Khu C - C102 (Tiêu chuẩn)">Khu C - C102 (Tiêu chuẩn)</option>
                <option value="Khu D - D405 (Tiêu chuẩn)">Khu D - D405 (Tiêu chuẩn)</option>
                <option value="Văn phòng BQL KTX">Văn phòng BQL KTX</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-surface-container-high">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold shadow-sm transition-all disabled:opacity-50 flex items-center gap-1.5"
            >
              {loading && <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>}
              <span>Xác nhận & Cấp tài khoản</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
