import React from 'react';
import { eventBus, EVENTS } from '../../core/bus';

export const ReportsApp: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">analytics</span>
            <h1 className="text-xl sm:text-2xl font-bold text-on-surface">Báo Cáo Tổng Hợp KTX</h1>
          </div>
          <p className="text-xs text-on-surface-variant">
            Số liệu thống kê doanh thu lưu trú, sản lượng điện nước và tỷ lệ đáp ứng chỗ ở ĐHQG
          </p>
        </div>
        <button
          onClick={() => eventBus.emit(EVENTS.SHOW_TOAST, 'Đang trích xuất file PDF báo cáo tài chính KTX...')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-container shadow-sm transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
          <span>Xuất Báo cáo Học kỳ (PDF)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-xs text-outline uppercase font-semibold">Doanh thu dự thu tháng này</span>
          <div className="text-2xl font-bold text-on-surface my-1 font-mono">2,242,500,000 đ</div>
          <span className="text-xs text-secondary font-semibold">Đã thu: 88.4% (3,050 SV)</span>
          <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden mt-3">
            <div className="bg-secondary-container h-full rounded-full" style={{ width: '88.4%' }} />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-xs text-outline uppercase font-semibold">Tổng sản lượng điện (IoT)</span>
          <div className="text-2xl font-bold text-primary my-1 font-mono">48,620 kWh</div>
          <span className="text-xs text-outline">Trung bình: 119.7 kWh / phòng</span>
          <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden mt-3">
            <div className="bg-primary h-full rounded-full" style={{ width: '74%' }} />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-xs text-outline uppercase font-semibold">Tổng lượng nước tiêu thụ</span>
          <div className="text-2xl font-bold text-secondary my-1 font-mono">5,840 m³</div>
          <span className="text-xs text-outline">Tổn thất đường ống: &lt; 0.8%</span>
          <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden mt-3">
            <div className="bg-surface-tint h-full rounded-full" style={{ width: '92%' }} />
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-xs p-5">
        <h3 className="text-base font-bold text-on-surface mb-3">
          Tỷ Lệ Sinh Viên Theo Các Trường Đại Học Thành Viên ĐHQG TP.HCM
        </h3>
        <div className="space-y-3">
          {[
            { name: 'Trường Đại học Bách khoa (HCMUT)', count: 1240, percent: 35.9, color: 'bg-primary' },
            { name: 'Trường Đại học Khoa học Tự nhiên (HCMUS)', count: 860, percent: 24.9, color: 'bg-secondary' },
            { name: 'Trường Đại học Công nghệ Thông tin (UIT)', count: 680, percent: 19.7, color: 'bg-secondary-container' },
            { name: 'Trường Đại học KHXH&NV (USSH)', count: 420, percent: 12.2, color: 'bg-tertiary-container' },
            { name: 'Trường Đại học Kinh tế - Luật (UEL)', count: 250, percent: 7.3, color: 'bg-surface-tint' }
          ].map((school, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-on-surface">{school.name}</span>
                <span className="font-mono text-outline">{school.count} sinh viên ({school.percent}%)</span>
              </div>
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <div className={`${school.color} h-full rounded-full`} style={{ width: `${school.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
