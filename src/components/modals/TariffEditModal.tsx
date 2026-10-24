import React, { useState, useEffect } from 'react';
import { TariffItem } from '../../core/types';
import { api } from '../../core/api';
import { eventBus, EVENTS } from '../../core/bus';

interface TariffEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  tariffs: TariffItem[];
  onTariffsUpdated: (newTariffs: TariffItem[]) => void;
}

export const TariffEditModal: React.FC<TariffEditModalProps> = ({
  isOpen,
  onClose,
  tariffs,
  onTariffsUpdated
}) => {
  const [localTariffs, setLocalTariffs] = useState<TariffItem[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLocalTariffs(JSON.parse(JSON.stringify(tariffs)));
  }, [tariffs, isOpen]);

  if (!isOpen) return null;

  const handlePriceChange = (index: number, value: string | number) => {
    const updated = [...localTariffs];
    updated[index].price = value;
    setLocalTariffs(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.updateTariffs(localTariffs);
      onTariffsUpdated(localTariffs);
      eventBus.emit(EVENTS.SHOW_TOAST, 'Đã cập nhật biểu phí KTX thành công!');
      onClose();
    } catch {
      alert('Không thể lưu biểu phí');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-surface-container-low flex items-center justify-between border-b border-surface-container-high">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-[18px]">payments</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-on-surface">Cập Nhật Biểu Phí Ký Túc Xá</h3>
              <p className="text-xs text-outline">Áp dụng cho học kỳ kế tiếp toàn hệ thống</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {localTariffs.map((item, idx) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-on-surface">{item.name}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-surface-container-high text-outline font-semibold">
                    {item.zone}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant">{item.desc}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <input
                  type={typeof item.price === 'number' ? 'number' : 'text'}
                  value={item.price}
                  onChange={(e) => handlePriceChange(idx, typeof item.price === 'number' ? Number(e.target.value) : e.target.value)}
                  className="w-36 h-9 px-3 bg-surface-container-lowest text-on-surface font-mono font-bold text-sm rounded-lg border border-outline-variant/50 focus:ring-2 focus:ring-primary outline-none"
                />
                <span className="text-xs text-outline">{item.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-surface-container-low/70 border-t border-surface-container-high flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface text-xs font-semibold"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
          >
            {saving && <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>}
            <span>Lưu thay đổi biểu phí</span>
          </button>
        </div>
      </div>
    </div>
  );
};
