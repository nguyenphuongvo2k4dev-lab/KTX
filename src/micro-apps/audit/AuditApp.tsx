import React, { useState } from 'react';
import { AuditLog } from '../../core/types';
import { eventBus, EVENTS } from '../../core/bus';
import { api } from '../../core/api';

interface AuditAppProps {
  auditLogs: AuditLog[];
  onOpenAuditDetail: (log: AuditLog) => void;
  onRefreshLogs: () => void;
}

export const AuditApp: React.FC<AuditAppProps> = ({
  auditLogs,
  onOpenAuditDetail,
  onRefreshLogs
}) => {
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [actionType, setActionType] = useState('');

  const filtered = auditLogs.filter(log => {
    if (role && !log.user.role.toLowerCase().includes(role.toLowerCase())) return false;
    if (actionType && log.actionType !== actionType) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        log.user.name.toLowerCase().includes(q) ||
        log.detail.toLowerCase().includes(q) ||
        log.targetId.toLowerCase().includes(q) ||
        log.ip.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleToggleLock = async (id: string) => {
    try {
      await api.toggleLock(id);
      onRefreshLogs();
      eventBus.emit(EVENTS.SHOW_TOAST, 'Cập nhật trạng thái khóa tài khoản thành công!');
    } catch {
      alert('Không thể thực hiện');
    }
  };

  const handleExport = () => {
    const headers = ['Mã Log', 'Thời gian', 'Người thực hiện', 'Email', 'Hành động', 'Mô tả', 'Đối tượng', 'IP', 'Trạng thái'];
    const rows = filtered.map(l => [
      l.id,
      `${l.date} ${l.time}`,
      l.user.name,
      l.user.email,
      l.action,
      `"${l.detail.replace(/"/g, '""')}"`,
      l.targetId,
      l.ip,
      l.statusText
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `SmartDorm_Full_Audit_${Date.now()}.csv`;
    link.click();
    eventBus.emit(EVENTS.SHOW_TOAST, 'Đã tải xuống file CSV nhật ký kiểm toán!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">receipt_long</span>
            <h1 className="text-xl sm:text-2xl font-bold text-on-surface">Nhật Ký Hoạt Động & Kiểm Toán</h1>
          </div>
          <p className="text-xs text-on-surface-variant">
            Lưu vết bất biến 1,489 bản ghi can thiệp dữ liệu, phân quyền và đăng nhập hệ thống
          </p>
        </div>
        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface text-xs font-semibold border border-outline-variant/40 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">file_download</span>
          <span>Tải tệp CSV lưu trữ</span>
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-xs overflow-hidden">
        {/* Filter bar */}
        <div className="p-4 border-b border-surface-container-high flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <span className="material-symbols-outlined text-outline text-[18px]">search</span>
            <input
              type="text"
              placeholder="Tìm kiếm nội dung kiểm toán, IP, user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs h-9 bg-surface-container-low px-3 rounded-lg border border-outline-variant/40"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="text-xs h-9 px-2.5 bg-surface-container-low rounded-lg border border-outline-variant/40"
            >
              <option value="">Tất cả vai trò</option>
              <option value="Admin">Quản trị viên (Admin)</option>
              <option value="Manager">Cán bộ Quản lý (Manager)</option>
              <option value="Student">Sinh viên (Student)</option>
              <option value="Kế toán">Kế toán (Finance)</option>
            </select>

            <select
              value={actionType}
              onChange={(e) => setActionType(e.target.value)}
              className="text-xs h-9 px-2.5 bg-surface-container-low rounded-lg border border-outline-variant/40"
            >
              <option value="">Tất cả loại hành động</option>
              <option value="create">Tạo tài khoản</option>
              <option value="update_price">Cập nhật biểu phí</option>
              <option value="lock">Khóa tài khoản</option>
              <option value="perm">Thay đổi phân quyền</option>
              <option value="special">Phê duyệt đặc cách</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-container-low/75 text-outline text-[11px] uppercase tracking-wider h-10 border-b border-surface-container-high">
                <th className="px-5 py-2 font-semibold">Thời gian</th>
                <th className="px-4 py-2 font-semibold">Người thực hiện</th>
                <th className="px-4 py-2 font-semibold">Hành động</th>
                <th className="px-4 py-2 font-semibold">Đối tượng</th>
                <th className="px-4 py-2 font-semibold">Địa chỉ IP</th>
                <th className="px-4 py-2 text-center font-semibold">Trạng thái</th>
                <th className="px-5 py-2 text-right font-semibold">Chi tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high/60">
              {filtered.map(log => (
                <tr key={log.id} className="hover:bg-surface-container-low/40">
                  <td className="px-5 py-3 whitespace-nowrap font-mono">
                    <span className="font-semibold block">{log.time}</span>
                    <span className="text-[11px] text-outline">{log.date}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-semibold text-on-surface">{log.user.name}</div>
                    <div className="text-[11px] text-outline">{log.user.role} • {log.user.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-primary">{log.action}</div>
                    <div className="text-[11px] text-on-surface-variant truncate max-w-xs">{log.detail}</div>
                  </td>
                  <td className="px-4 py-3 font-mono font-semibold">
                    {log.targetId}
                  </td>
                  <td className="px-4 py-3 font-mono text-outline">
                    {log.ip}
                  </td>
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary text-[11px] font-semibold">
                      {log.statusText}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onOpenAuditDetail(log)}
                        className="p-1.5 rounded hover:bg-surface-container text-outline hover:text-primary transition-colors"
                        title="Xem payload JSON"
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                      <button
                        onClick={() => handleToggleLock(log.id)}
                        className="p-1.5 rounded hover:bg-surface-container text-outline hover:text-error transition-colors"
                        title="Khóa/Mở khóa"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {log.status === 'locked' ? 'lock_open' : 'lock'}
                        </span>
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
