import React, { useState } from 'react';
import { eventBus, EVENTS } from '../../core/bus';

interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  role: string;
  room: string;
  zone: string;
  status: 'active' | 'suspended' | 'pending';
  lastActive: string;
}

const INITIAL_ACCOUNTS: UserAccount[] = [
  { id: 'SV_2411089', fullName: 'Trần Minh Anh', email: 'anh.tm@student.edu.vn', role: 'Sinh viên', room: 'B204', zone: 'Khu B', status: 'active', lastActive: '10 phút trước' },
  { id: 'SV_2310452', fullName: 'Lê Hoàng Long', email: 'long.lh@student.edu.vn', role: 'Sinh viên', room: 'A102', zone: 'Khu A', status: 'active', lastActive: '35 phút trước' },
  { id: 'CB_09124', fullName: 'Nguyễn Văn Hoàng', email: 'hoang.nv@dorm.edu.vn', role: 'Cán bộ QL Khu B', room: 'VP Khu B', zone: 'Khu B', status: 'active', lastActive: '5 phút trước' },
  { id: 'SV_2112450', fullName: 'Phạm Đức Huy', email: 'huy.pd@student.edu.vn', role: 'Sinh viên', room: 'C104', zone: 'Khu C', status: 'suspended', lastActive: '8:05:40 24/10' },
  { id: 'CB_04412', fullName: 'Lê Hồng Phúc', email: 'phuc.lh@dorm.edu.vn', role: 'Kế toán KTX', room: 'Phòng Tài vụ', zone: 'Khu A', status: 'active', lastActive: 'Vừa xong' },
  { id: 'KTV_012', fullName: 'Nguyễn Văn Hùng', email: 'hung.nv@tech.dorm.edu.vn', role: 'Kỹ thuật viên Điện Nước', room: 'Tổ Kỹ thuật', zone: 'Toàn KTX', status: 'active', lastActive: '1 giờ trước' },
  { id: 'ROOT_001', fullName: 'TS. Trần Minh Khoa', email: 'root@dorm.edu.vn', role: 'Super Admin', room: 'BQL Trung tâm', zone: 'ĐHQG', status: 'active', lastActive: 'Đang online' }
];

export const AccountsApp: React.FC = () => {
  const [accounts, setAccounts] = useState<UserAccount[]>(INITIAL_ACCOUNTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [zoneFilter, setZoneFilter] = useState('all');

  const filtered = accounts.filter(acc => {
    if (roleFilter !== 'all' && !acc.role.toLowerCase().includes(roleFilter.toLowerCase())) return false;
    if (zoneFilter !== 'all' && acc.zone !== zoneFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return acc.fullName.toLowerCase().includes(q) || acc.email.toLowerCase().includes(q) || acc.id.toLowerCase().includes(q) || acc.room.toLowerCase().includes(q);
    }
    return true;
  });

  const toggleStatus = (id: string) => {
    setAccounts(prev => prev.map(a => {
      if (a.id === id) {
        const newStatus = a.status === 'active' ? 'suspended' : 'active';
        eventBus.emit(EVENTS.SHOW_TOAST, `Đã cập nhật trạng thái tài khoản ${a.id}`);
        return { ...a, status: newStatus };
      }
      return a;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">manage_accounts</span>
            <h1 className="text-xl sm:text-2xl font-bold text-on-surface">Quản Lý Tài Khoản KTX</h1>
          </div>
          <p className="text-xs text-on-surface-variant">
            Danh sách 4,120 tài khoản sinh viên, cán bộ quản trị và phân bổ chỗ ở ĐHQG
          </p>
        </div>
        <button
          onClick={() => eventBus.emit(EVENTS.OPEN_ADD_USER)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-container shadow-sm transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          <span>+ Cấp tài khoản mới</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-xs">
          <span className="text-[11px] text-outline uppercase font-semibold">Tổng sinh viên</span>
          <div className="text-2xl font-bold text-on-surface mt-1 font-mono">3,450</div>
          <span className="text-xs text-secondary font-medium">83.7% sức chứa KTX</span>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-xs">
          <span className="text-[11px] text-outline uppercase font-semibold">Cán bộ & Nhân sự</span>
          <div className="text-2xl font-bold text-primary mt-1 font-mono">70</div>
          <span className="text-xs text-outline">BQL, Tài vụ & Kỹ thuật</span>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-xs">
          <span className="text-[11px] text-outline uppercase font-semibold">Tài khoản đang khóa</span>
          <div className="text-2xl font-bold text-error mt-1 font-mono">14</div>
          <span className="text-xs text-error font-medium">Vi phạm nội quy / sai pass</span>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-xs">
          <span className="text-[11px] text-outline uppercase font-semibold">Đồng bộ SSO hôm nay</span>
          <div className="text-2xl font-bold text-secondary mt-1 font-mono">+142</div>
          <span className="text-xs text-secondary font-medium">Tân sinh viên K24</span>
        </div>
      </div>

      {/* Filter and Table Card */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-surface-container-high flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <span className="material-symbols-outlined text-outline text-[18px]">search</span>
            <input
              type="text"
              placeholder="Tìm theo tên, email, MSSV, phòng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs h-9 bg-surface-container-low px-3 rounded-lg border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="text-xs h-9 px-2.5 bg-surface-container-low rounded-lg border border-outline-variant/40"
            >
              <option value="all">Tất cả vai trò</option>
              <option value="Sinh viên">Sinh viên</option>
              <option value="Cán bộ">Cán bộ quản lý</option>
              <option value="Kỹ thuật">Kỹ thuật viên</option>
              <option value="Admin">Quản trị viên</option>
            </select>

            <select
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
              className="text-xs h-9 px-2.5 bg-surface-container-low rounded-lg border border-outline-variant/40"
            >
              <option value="all">Tất cả khu</option>
              <option value="Khu A">Khu A</option>
              <option value="Khu B">Khu B</option>
              <option value="Khu C">Khu C</option>
              <option value="Khu D">Khu D</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-container-low/75 text-outline text-[11px] uppercase tracking-wider h-10 border-b border-surface-container-high">
                <th className="px-5 py-2 font-semibold">Tài khoản</th>
                <th className="px-4 py-2 font-semibold">Mã ID</th>
                <th className="px-4 py-2 font-semibold">Vai trò</th>
                <th className="px-4 py-2 font-semibold">Phòng KTX</th>
                <th className="px-4 py-2 font-semibold">Hoạt động gần nhất</th>
                <th className="px-4 py-2 text-center font-semibold">Trạng thái</th>
                <th className="px-5 py-2 text-right font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high/60">
              {filtered.map(acc => (
                <tr key={acc.id} className="hover:bg-surface-container-low/40">
                  <td className="px-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-on-surface">{acc.fullName}</div>
                    <div className="text-[11px] text-outline font-mono">{acc.email}</div>
                  </td>
                  <td className="px-4 py-3 font-mono font-semibold text-on-surface">
                    {acc.id}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-primary">{acc.role}</span>
                  </td>
                  <td className="px-4 py-3 font-mono">
                    {acc.room} ({acc.zone})
                  </td>
                  <td className="px-4 py-3 text-outline">
                    {acc.lastActive}
                  </td>
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        acc.status === 'active'
                          ? 'bg-secondary-fixed text-on-secondary-fixed'
                          : 'bg-error-container text-on-error-container'
                      }`}
                    >
                      {acc.status === 'active' ? 'Đang kích hoạt' : 'Bị tạm khóa'}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => toggleStatus(acc.id)}
                        className="px-2 py-1 rounded bg-surface-container-low hover:bg-surface-container text-outline hover:text-on-surface font-semibold text-[11px]"
                      >
                        {acc.status === 'active' ? 'Khóa' : 'Mở khóa'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
