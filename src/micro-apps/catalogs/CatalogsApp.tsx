import React, { useState } from 'react';

interface DormZone {
  id: string;
  name: string;
  type: string;
  rooms: number;
  capacity: number;
  occupied: number;
  available: number;
  manager: string;
}

const ZONES: DormZone[] = [
  { id: 'KHU_A', name: 'Khu A (Nhà A1 - A4)', type: 'Phòng Chất lượng cao máy lạnh (2-4 SV)', rooms: 96, capacity: 384, occupied: 372, available: 12, manager: 'CB. Lê Thị Thu Hà' },
  { id: 'KHU_B', name: 'Khu B (Nhà B1 - B8)', type: 'Phòng Tiêu chuẩn 4-6 sinh viên', rooms: 160, capacity: 960, occupied: 942, available: 18, manager: 'CB. Nguyễn Văn Hoàng' },
  { id: 'KHU_C', name: 'Khu C (Nhà C1 - C6)', type: 'Phòng Tiêu chuẩn 4 sinh viên', rooms: 90, capacity: 720, occupied: 708, available: 12, manager: 'CB. Trần Quốc Bảo' },
  { id: 'KHU_D', name: 'Khu D (Ký túc xá mới)', type: 'Phòng Tiêu chuẩn 6-8 sinh viên', rooms: 60, capacity: 480, occupied: 468, available: 12, manager: 'CB. Vũ Đình Trọng' }
];

export const CatalogsApp: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<DormZone>(ZONES[0]);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[22px]">domain</span>
          <h1 className="text-xl sm:text-2xl font-bold text-on-surface">Danh Mục Hệ Thống & Tòa Nhà KTX</h1>
        </div>
        <p className="text-xs text-on-surface-variant">
          Quản lý cơ sở vật chất 406 phòng ở, phân khu A/B/C/D và công suất khai thác Đại học Quốc gia
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ZONES.map((zone) => {
          const isSelected = selectedZone.id === zone.id;
          const occupancyRate = ((zone.occupied / zone.capacity) * 100).toFixed(1);
          return (
            <button
              key={zone.id}
              onClick={() => setSelectedZone(zone)}
              className={`p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-surface-container-lowest border-primary ring-2 ring-primary/20 shadow-sm'
                  : 'bg-surface-container-lowest border-outline-variant/30 hover:bg-surface-container-low'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-on-surface">{zone.name}</span>
                <span className="text-xs font-mono font-semibold text-secondary">{occupancyRate}%</span>
              </div>
              <p className="text-xs text-on-surface-variant mb-3">{zone.type}</p>
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden mb-2">
                <div className="bg-primary h-full rounded-full" style={{ width: `${occupancyRate}%` }} />
              </div>
              <div className="flex justify-between text-xs text-outline font-mono">
                <span>{zone.occupied}/{zone.capacity} SV</span>
                <span className="text-primary font-semibold">{zone.available} trống</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Zone Details */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-xs p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-surface-container-high pb-4 mb-4 gap-2">
          <div>
            <h3 className="text-base font-bold text-on-surface">{selectedZone.name}</h3>
            <p className="text-xs text-outline">Phụ trách: {selectedZone.manager}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-secondary-fixed text-on-secondary-fixed text-xs font-semibold">
              {selectedZone.rooms} Phòng vận hành
            </span>
            <span className="px-2.5 py-1 rounded bg-surface-container-high text-primary text-xs font-semibold">
              IoT Modbus Đã trang bị 100%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="p-3 bg-surface-container-low rounded-lg">
            <span className="text-xs text-outline">Tổng số giường</span>
            <div className="text-xl font-bold font-mono text-on-surface">{selectedZone.capacity}</div>
          </div>
          <div className="p-3 bg-surface-container-low rounded-lg">
            <span className="text-xs text-outline">Sinh viên đang ở</span>
            <div className="text-xl font-bold font-mono text-primary">{selectedZone.occupied}</div>
          </div>
          <div className="p-3 bg-surface-container-low rounded-lg">
            <span className="text-xs text-outline">Giường sẵn sàng nhận mới</span>
            <div className="text-xl font-bold font-mono text-secondary">{selectedZone.available}</div>
          </div>
          <div className="p-3 bg-surface-container-low rounded-lg">
            <span className="text-xs text-outline">Chỉ số an toàn PCCC</span>
            <div className="text-xl font-bold font-mono text-on-surface">Đạt chuẩn A+</div>
          </div>
        </div>

        <div className="text-xs text-on-surface-variant bg-surface-container-low p-3.5 rounded-lg border border-surface-container-high">
          <strong className="text-on-surface">Trang bị hạ tầng tiêu chuẩn:</strong> Hệ thống khóa điện tử quẹt thẻ RFID/FaceID sảnh chính, công tơ điện tử truyền số tự động qua RS-485 Modbus, đồng hồ nước thông minh có van ngắt áp từ xa, đường truyền Internet cáp quang ĐHQG 1Gbps.
        </div>
      </div>
    </div>
  );
};
