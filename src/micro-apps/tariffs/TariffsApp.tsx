import React, { useState } from 'react';
import { TariffItem } from '../../core/types';
import { eventBus, EVENTS } from '../../core/bus';

interface TariffsAppProps {
  tariffs: TariffItem[];
}

export const TariffsApp: React.FC<TariffsAppProps> = ({ tariffs }) => {
  // Electricity EVN calculator
  const [kwhUsage, setKwhUsage] = useState<number>(120);
  const [waterUsage, setWaterUsage] = useState<number>(14);

  // EVN 6-tier calculation for Dormitory
  const calculateElectricFee = (kwh: number) => {
    let fee = 0;
    if (kwh <= 50) fee = kwh * 1806;
    else if (kwh <= 100) fee = 50 * 1806 + (kwh - 50) * 1866;
    else if (kwh <= 200) fee = 50 * 1806 + 50 * 1866 + (kwh - 100) * 2167;
    else fee = 50 * 1806 + 50 * 1866 + 100 * 2167 + (kwh - 200) * 2729;
    return Math.round(fee * 1.08); // 8% VAT
  };

  const calculateWaterFee = (m3: number) => {
    return Math.round(m3 * 8500 * 1.05); // 5% VAT
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">payments</span>
            <h1 className="text-xl sm:text-2xl font-bold text-on-surface">Quản Lý Biểu Phí KTX ĐHQG</h1>
          </div>
          <p className="text-xs text-on-surface-variant">
            Định mức tiền phòng, biểu giá điện lũy tiến EVN, nước sinh hoạt và dịch vụ hỗ trợ sinh viên
          </p>
        </div>
        <button
          onClick={() => eventBus.emit(EVENTS.OPEN_TARIFFS)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-container shadow-sm transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">edit_note</span>
          <span>Chỉnh sửa biểu phí</span>
        </button>
      </div>

      {/* Tariffs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tariffs.map((tariff) => (
          <div
            key={tariff.id}
            className="p-5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-on-surface">{tariff.name}</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-surface-container-high text-primary font-semibold">
                  {tariff.zone}
                </span>
              </div>
              <div className="text-2xl font-bold text-on-surface my-2 font-sans">
                {typeof tariff.price === 'number'
                  ? `${tariff.price.toLocaleString('vi-VN')} đ`
                  : tariff.price}
              </div>
              <div className="text-xs text-outline mb-2">{tariff.unit}</div>
              <p className="text-xs text-on-surface-variant">{tariff.desc}</p>
            </div>
            <button
              onClick={() => eventBus.emit(EVENTS.OPEN_TARIFFS)}
              className="mt-4 text-xs font-semibold text-primary hover:underline text-left"
            >
              Cấu hình định mức →
            </button>
          </div>
        ))}
      </div>

      {/* Interactive Bill Simulator for IoT Meters */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-xs p-5">
        <div className="border-b border-surface-container-high pb-3 mb-4">
          <h3 className="text-base font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">calculate</span>
            Công Cụ Mô Phỏng Tính Tiền Phòng & Điện Nước Tự Động (Batch Simulator)
          </h3>
          <p className="text-xs text-outline">
            Thuật toán đồng bộ chỉ số từ công tơ Modbus và áp biểu giá EVN cho từng phòng KTX
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-on-surface">Điện tiêu thụ dự kiến trong tháng (kWh):</span>
                <span className="font-mono text-primary font-bold">{kwhUsage} kWh</span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                value={kwhUsage}
                onChange={(e) => setKwhUsage(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-on-surface">Nước sinh hoạt dự kiến trong tháng (m³):</span>
                <span className="font-mono text-secondary font-bold">{waterUsage} m³</span>
              </div>
              <input
                type="range"
                min="2"
                max="40"
                value={waterUsage}
                onChange={(e) => setWaterUsage(Number(e.target.value))}
                className="w-full accent-secondary"
              />
            </div>
          </div>

          <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container-high space-y-2.5">
            <div className="flex justify-between text-xs">
              <span className="text-outline">Tiền điện (Bậc 1-6 EVN + 8% VAT):</span>
              <span className="font-mono font-bold text-on-surface">
                {calculateElectricFee(kwhUsage).toLocaleString('vi-VN')} đ
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-outline">Tiền nước (8,500 đ/m³ + 5% VAT):</span>
              <span className="font-mono font-bold text-on-surface">
                {calculateWaterFee(waterUsage).toLocaleString('vi-VN')} đ
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-outline">Phí phòng tiêu chuẩn Khu B (4 SV):</span>
              <span className="font-mono font-bold text-on-surface">
                {(650000 * 4).toLocaleString('vi-VN')} đ
              </span>
            </div>
            <div className="border-t border-surface-container-high pt-2 flex justify-between text-sm font-bold">
              <span className="text-primary">Tổng hóa đơn toàn phòng:</span>
              <span className="font-mono text-primary text-base">
                {(calculateElectricFee(kwhUsage) + calculateWaterFee(waterUsage) + 650000 * 4).toLocaleString('vi-VN')} đ
              </span>
            </div>
            <div className="text-[11px] text-outline text-right font-mono">
              ~{Math.round((calculateElectricFee(kwhUsage) + calculateWaterFee(waterUsage) + 650000 * 4) / 4).toLocaleString('vi-VN')} đ / sinh viên
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
