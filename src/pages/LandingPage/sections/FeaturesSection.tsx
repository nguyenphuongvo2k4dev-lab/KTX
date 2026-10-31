import React, { useState } from 'react';

const FEATURES = [
  {
    icon: 'assignment_turned_in',
    title: 'Hợp đồng điện tử & Check-in',
    desc: 'Ký số xác thực bảo mật qua căn cước VNeID. Phòng được phân bổ tự động, check-in không cần giấy tờ.',
    tag: 'Sinh viên',
    color: 'text-primary',
    bg: 'bg-primary-fixed/40',
    details: ['Ký hợp đồng online 100%', 'Phân bổ phòng tự động AI', 'Check-in qua FaceID/QR'],
  },
  {
    icon: 'bolt',
    title: 'IoT Điện – Nước thông minh',
    desc: 'Công tơ Modbus-RTU & đồng hồ NB-IoT cập nhật chỉ số mỗi 30 giây. Hoá đơn tính tự động theo EVN bậc thang.',
    tag: 'IoT',
    color: 'text-secondary',
    bg: 'bg-secondary-fixed/40',
    details: ['406 công tơ thông minh', 'Hóa đơn tự động theo EVN', 'Phát hiện rò rỉ nước 24/7'],
  },
  {
    icon: 'engineering',
    title: 'Báo hỏng SLA 5 phút',
    desc: 'Gửi yêu cầu kỹ thuật từ ứng dụng, KTV nhận lịch tự động. Theo dõi tiến độ xử lý thời gian thực.',
    tag: 'Kỹ thuật',
    color: 'text-tertiary',
    bg: 'bg-tertiary-fixed/30',
    details: ['Ứng dụng báo hỏng mobile', 'Phân công KTV tự động', 'SLA phản hồi dưới 5 phút'],
  },
  {
    icon: 'passkey',
    title: 'Kiểm soát ra vào RFID/FaceID',
    desc: '32 cổng barrier tích hợp thẻ sinh viên RFID và FaceID. Log ra vào theo thời gian thực, cảnh báo bất thường.',
    tag: 'Bảo mật',
    color: 'text-primary',
    bg: 'bg-primary-fixed/40',
    details: ['Thẻ RFID sinh viên', 'FaceID AI tốc độ cao', 'Nhật ký ra vào thời gian thực'],
  },
  {
    icon: 'payments',
    title: 'Thanh toán VNPay / MoMo',
    desc: 'Đóng tiền phòng, điện, nước trực tuyến qua VNPay QR, MoMo, thẻ ATM Napas. Biên lai điện tử tức thì.',
    tag: 'Tài chính',
    color: 'text-secondary',
    bg: 'bg-secondary-fixed/40',
    details: ['VNPay QR & MoMo', 'Thẻ ATM Napas', 'Biên lai điện tử VNU'],
  },
  {
    icon: 'shield',
    title: 'Bảo mật WAF & RBAC',
    desc: 'Tường lửa WAF Cloudflare, phân quyền RBAC 5 cấp, kiểm toán mọi hành động. ISO/IEC 27001:2022.',
    tag: 'Admin',
    color: 'text-error',
    bg: 'bg-error-container/30',
    details: ['WAF Layer 7 ĐHQG', 'RBAC 5 cấp độ', 'Audit trail bất biến'],
  },
];

export const FeaturesSection: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold mb-3">
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
            Tính năng nổi bật
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight mb-3">
            Quản lý KTX toàn diện trong{' '}
            <span className="text-primary">một nền tảng</span>
          </h2>
          <p className="text-sm text-on-surface-variant max-w-xl mx-auto">
            Từ hợp đồng điện tử đến IoT thông minh — mọi nghiệp vụ ký túc xá được số hóa và tự động hóa hoàn toàn.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`bg-surface-container-lowest rounded-2xl p-6 border transition-all duration-300 cursor-default ${
                hovered === i
                  ? 'border-primary/30 shadow-lg shadow-primary/5 -translate-y-1'
                  : 'border-outline-variant/20 shadow-xs'
              }`}
            >
              {/* Icon + Tag */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center`}>
                  <span className={`material-symbols-outlined text-[24px] ${f.color}`}>{f.icon}</span>
                </div>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full bg-surface-container-high ${f.color}`}>
                  {f.tag}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-base font-bold text-on-surface mb-2">{f.title}</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-4">{f.desc}</p>

              {/* Detail chips */}
              <div className="flex flex-wrap gap-1.5">
                {f.details.map((d) => (
                  <span
                    key={d}
                    className="text-[11px] px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-medium"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
