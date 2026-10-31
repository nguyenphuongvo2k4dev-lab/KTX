import React from 'react';
import { useNavigate } from 'react-router-dom';

const PORTALS = [
  {
    role: 'Sinh viên',
    icon: 'school',
    color: 'primary',
    badge: 'Cổng chính',
    headline: 'Cổng Sinh Viên Nội Trú',
    desc: 'Quản lý phòng ở, hóa đơn, hợp đồng lưu trú và báo hỏng kỹ thuật — tất cả trong một ứng dụng.',
    path: '/student/overview',
    features: [
      { icon: 'meeting_room', text: 'Xem thông tin phòng & bạn cùng phòng' },
      { icon: 'receipt_long', text: 'Thanh toán tiền phòng / điện / nước' },
      { icon: 'build_circle', text: 'Gửi yêu cầu báo hỏng kỹ thuật' },
      { icon: 'description', text: 'Xem và gia hạn hợp đồng lưu trú' },
      { icon: 'speed', text: 'Tra cứu chỉ số công tơ IoT thời gian thực' },
      { icon: 'smart_toy', text: 'Hỏi trợ lý AI SmartDorm 24/7' },
    ],
    cta: 'Vào cổng sinh viên',
  },
  {
    role: 'Quản trị viên',
    icon: 'admin_panel_settings',
    color: 'secondary',
    badge: 'Admin Console',
    headline: 'Bảng Điều Khiển Quản Trị',
    desc: 'Toàn quyền giám sát hệ thống KTX — tài khoản, biểu phí, IoT, bảo mật và kiểm toán dữ liệu.',
    path: '/admin/overview',
    features: [
      { icon: 'manage_accounts', text: 'Quản lý 4,120 tài khoản sinh viên & cán bộ' },
      { icon: 'payments', text: 'Cập nhật biểu phí điện nước & phòng ở' },
      { icon: 'sensors', text: 'Giám sát 406 thiết bị IoT Modbus' },
      { icon: 'shield', text: 'Trung tâm an ninh WAF & RBAC' },
      { icon: 'receipt_long', text: 'Nhật ký kiểm toán bất biến 1,489 bản ghi' },
      { icon: 'cloud_sync', text: 'Sao lưu S3 tức thì, đa vùng' },
    ],
    cta: 'Vào Admin Console',
  },
];

export const PortalsSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="portals" className="py-20 bg-surface-container-low/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-tertiary text-xs font-bold mb-3">
            <span className="material-symbols-outlined text-[14px]">apps</span>
            Hai cổng truy cập
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight mb-3">
            Giao diện riêng biệt cho{' '}
            <span className="text-primary">từng vai trò</span>
          </h2>
          <p className="text-sm text-on-surface-variant max-w-xl mx-auto">
            SmartDorm cung cấp hai cổng truy cập độc lập, được tối ưu riêng cho sinh viên và quản trị viên.
          </p>
        </div>

        {/* Portal cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PORTALS.map((portal) => {
            const isPrimary = portal.color === 'primary';
            return (
              <div
                key={portal.role}
                className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-xs overflow-hidden hover:shadow-lg transition-all"
              >
                {/* Card header */}
                <div className={`p-6 ${isPrimary ? 'bg-primary-fixed/20' : 'bg-secondary-fixed/20'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${isPrimary ? 'bg-primary' : 'bg-secondary'} flex items-center justify-center text-on-primary shadow-md`}>
                      <span className="material-symbols-outlined text-[26px]">{portal.icon}</span>
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${isPrimary ? 'bg-primary text-on-primary' : 'bg-secondary text-on-secondary'}`}>
                      {portal.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-1">{portal.headline}</h3>
                  <p className="text-sm text-on-surface-variant">{portal.desc}</p>
                </div>

                {/* Feature list */}
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                    {portal.features.map((f) => (
                      <div key={f.text} className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-lg ${isPrimary ? 'bg-primary-fixed/40' : 'bg-secondary-fixed/40'} flex items-center justify-center shrink-0`}>
                          <span className={`material-symbols-outlined text-[15px] ${isPrimary ? 'text-primary' : 'text-secondary'}`}>
                            {f.icon}
                          </span>
                        </div>
                        <span className="text-xs text-on-surface-variant">{f.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => navigate(portal.path)}
                    className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md active:scale-95 ${
                      isPrimary
                        ? 'bg-primary text-on-primary hover:bg-primary-container'
                        : 'bg-secondary text-on-secondary hover:bg-secondary/90'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{portal.icon}</span>
                    {portal.cta}
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-on-surface-variant">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-primary">how_to_reg</span>
            <span>Chưa có tài khoản?</span>
            <button onClick={() => navigate('/register')} className="text-primary font-bold hover:underline">
              Đăng ký lưu trú K24
            </button>
          </div>
          <span className="hidden sm:inline text-outline-variant">•</span>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-secondary">support_agent</span>
            <span>Hotline: <strong className="font-mono text-on-surface">024 3754 7890</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
};
