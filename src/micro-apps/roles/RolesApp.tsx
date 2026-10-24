import React, { useState } from 'react';
import { eventBus, EVENTS } from '../../core/bus';

interface RoleDef {
  id: string;
  name: string;
  assignedCount: number;
  description: string;
  permissions: {
    viewDashboard: boolean;
    manageUsers: boolean;
    manageTariffs: boolean;
    manageHardware: boolean;
    approveSpecialRooms: boolean;
    viewAuditLogs: boolean;
    systemConfig: boolean;
  };
}

const INITIAL_ROLES: RoleDef[] = [
  {
    id: 'ROLE_SUPERADMIN',
    name: 'Quản trị viên Hệ thống (SuperAdmin)',
    assignedCount: 4,
    description: 'Toàn quyền cấu hình máy chủ, phân bổ phòng, phân quyền RBAC và xử lý an ninh.',
    permissions: {
      viewDashboard: true,
      manageUsers: true,
      manageTariffs: true,
      manageHardware: true,
      approveSpecialRooms: true,
      viewAuditLogs: true,
      systemConfig: true
    }
  },
  {
    id: 'ROLE_MANAGER',
    name: 'Cán bộ Quản lý Khu KTX',
    assignedCount: 48,
    description: 'Quản lý danh sách sinh viên các khu A/B/C/D, giải quyết chuyển phòng và tiếp nhận sự cố.',
    permissions: {
      viewDashboard: true,
      manageUsers: true,
      manageTariffs: false,
      manageHardware: true,
      approveSpecialRooms: true,
      viewAuditLogs: false,
      systemConfig: false
    }
  },
  {
    id: 'ROLE_FINANCE',
    name: 'Kế toán & Thu phí KTX',
    assignedCount: 12,
    description: 'Chốt chỉ số điện nước, lập hóa đơn học kỳ, quản lý thu ngân và biểu phí sinh hoạt.',
    permissions: {
      viewDashboard: true,
      manageUsers: false,
      manageTariffs: true,
      manageHardware: false,
      approveSpecialRooms: false,
      viewAuditLogs: false,
      systemConfig: false
    }
  },
  {
    id: 'ROLE_TECH',
    name: 'Kỹ thuật viên Thiết bị & Mạng',
    assignedCount: 22,
    description: 'Vận hành công tơ điện thông minh Modbus, đồng hồ nước NB-IoT và hệ thống FaceID.',
    permissions: {
      viewDashboard: true,
      manageUsers: false,
      manageTariffs: false,
      manageHardware: true,
      approveSpecialRooms: false,
      viewAuditLogs: true,
      systemConfig: false
    }
  },
  {
    id: 'ROLE_STUDENT',
    name: 'Sinh viên Lưu trú (Student)',
    assignedCount: 3450,
    description: 'Đăng ký phòng, tra cứu chỉ số điện nước cá nhân, phản ánh hư hỏng và thanh toán phí.',
    permissions: {
      viewDashboard: false,
      manageUsers: false,
      manageTariffs: false,
      manageHardware: false,
      approveSpecialRooms: false,
      viewAuditLogs: false,
      systemConfig: false
    }
  }
];

export const RolesApp: React.FC = () => {
  const [roles, setRoles] = useState<RoleDef[]>(INITIAL_ROLES);
  const [selectedRole, setSelectedRole] = useState<RoleDef>(roles[0]);

  const togglePermission = (key: keyof RoleDef['permissions']) => {
    if (selectedRole.id === 'ROLE_SUPERADMIN') {
      alert('Không thể hạ quyền của nhóm SuperAdmin');
      return;
    }
    const updated = {
      ...selectedRole,
      permissions: {
        ...selectedRole.permissions,
        [key]: !selectedRole.permissions[key]
      }
    };
    setSelectedRole(updated);
    setRoles(prev => prev.map(r => r.id === updated.id ? updated : r));
    eventBus.emit(EVENTS.SHOW_TOAST, `Đã cập nhật quyền hạn cho nhóm "${selectedRole.name}"`);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[22px]">admin_panel_settings</span>
          <h1 className="text-xl sm:text-2xl font-bold text-on-surface">Vai Trò & Phân Quyền RBAC</h1>
        </div>
        <p className="text-xs text-on-surface-variant">
          Quản lý ma trận truy cập bảo mật dựa trên vai trò (Role-Based Access Control) chuẩn ĐHQG
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Roles List */}
        <div className="lg:col-span-4 space-y-2">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedRole.id === role.id
                  ? 'bg-primary-container text-on-primary border-primary shadow-sm'
                  : 'bg-surface-container-lowest text-on-surface border-outline-variant/30 hover:bg-surface-container-low'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-xs sm:text-sm">{role.name}</span>
                <span
                  className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                    selectedRole.id === role.id ? 'bg-white/20 text-white' : 'bg-surface-container-high text-outline'
                  }`}
                >
                  {role.assignedCount} NS
                </span>
              </div>
              <p className={`text-xs line-clamp-2 ${selectedRole.id === role.id ? 'text-on-primary/80' : 'text-on-surface-variant'}`}>
                {role.description}
              </p>
            </button>
          ))}
        </div>

        {/* Permissions Matrix */}
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-xs p-5">
          <div className="border-b border-surface-container-high pb-4 mb-4">
            <h3 className="text-base font-bold text-on-surface">{selectedRole.name}</h3>
            <p className="text-xs text-outline font-mono mt-0.5">Mã vai trò: {selectedRole.id}</p>
          </div>

          <div className="space-y-3">
            {[
              { key: 'viewDashboard', label: 'Xem Bảng điều khiển Quản trị Trung tâm', desc: 'Truy cập các số liệu KPI, biểu đồ lưu lượng và trạng thái cụm K8s' },
              { key: 'manageUsers', label: 'Thêm, sửa, khóa tài khoản người dùng', desc: 'Quản lý thông tin sinh viên, gán mã định danh và cấp quyền nội bộ' },
              { key: 'manageTariffs', label: 'Quản lý biểu phí phòng, điện nước', desc: 'Cập nhật bảng giá định mức điện sinh hoạt, nước sạch và phí dịch vụ' },
              { key: 'manageHardware', label: 'Điều khiển thiết bị IoT KTX', desc: 'Gửi lệnh khởi động lại công tơ điện thông minh, cấu hình barrier FaceID' },
              { key: 'approveSpecialRooms', label: 'Phê duyệt đặc cách phòng ở ưu tiên', desc: 'Duyệt hồ sơ sinh viên chính sách, diện khuyết tật vào phòng tầng 1' },
              { key: 'viewAuditLogs', label: 'Truy xuất Nhật ký Kiểm toán (Audit Logs)', desc: 'Xem chi tiết các thao tác nhạy cảm, IP truy cập và tải file CSV' },
              { key: 'systemConfig', label: 'Cấu hình hệ thống & Tham số máy chủ', desc: 'Thiết lập SSO VNU, Rate-limit WAF và chế độ bảo trì toàn hệ thống' }
            ].map((perm) => {
              const isEnabled = selectedRole.permissions[perm.key as keyof RoleDef['permissions']];
              return (
                <div
                  key={perm.key}
                  className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container-high flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-xs font-bold text-on-surface">{perm.label}</div>
                    <div className="text-[11px] text-outline">{perm.desc}</div>
                  </div>
                  <button
                    onClick={() => togglePermission(perm.key as keyof RoleDef['permissions'])}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                      isEnabled
                        ? 'bg-primary text-white'
                        : 'bg-surface-container-highest text-outline hover:text-on-surface'
                    }`}
                  >
                    {isEnabled ? 'Đã cấp quyền' : 'Không có quyền'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
