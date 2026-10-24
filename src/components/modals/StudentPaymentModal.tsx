import React, { useState } from 'react';
import { api } from '../../core/api';
import { eventBus, EVENTS } from '../../core/bus';

interface StudentPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  billAmount?: number;
  billMonth?: string;
}

export const StudentPaymentModal: React.FC<StudentPaymentModalProps> = ({
  isOpen,
  onClose,
  onPaymentSuccess,
  billAmount = 685000,
  billMonth = 'Tháng 10/2024'
}) => {
  const [method, setMethod] = useState<'vnpay' | 'momo' | 'napas'>('vnpay');
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const handleConfirmPay = async () => {
    setProcessing(true);
    try {
      await api.payBill('BILL-10-2024', method.toUpperCase());
      onPaymentSuccess();
      eventBus.emit(EVENTS.SHOW_TOAST, `Thanh toán thành công hóa đơn ${billMonth}! Mã chuẩn chi: VNU-PAY-${Date.now().toString().slice(-6)}`);
      onClose();
    } catch {
      alert('Không thể thực hiện thanh toán.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-6 shadow-2xl flex flex-col gap-4 border border-outline-variant/30 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[22px]">payments</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-on-surface">Thanh Toán Hóa Đơn KTX</h3>
              <p className="text-xs text-outline">{billMonth} • Phòng 402 Nhà B2</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface-container text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Bill summary breakdown */}
        <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container-high space-y-2 text-xs">
          <div className="flex justify-between text-on-surface-variant">
            <span>Tiền phòng tiêu chuẩn:</span>
            <span className="font-mono font-semibold">650,000 đ</span>
          </div>
          <div className="flex justify-between text-on-surface-variant">
            <span>Điện tiêu thụ (142 kWh):</span>
            <span className="font-mono font-semibold">278,000 đ</span>
          </div>
          <div className="flex justify-between text-on-surface-variant">
            <span>Nước sinh hoạt (16 m³):</span>
            <span className="font-mono font-semibold">142,800 đ</span>
          </div>
          <div className="flex justify-between text-on-surface-variant">
            <span>Chia đều 4 bạn cùng phòng:</span>
            <span className="font-mono text-secondary font-semibold">÷ 4 sinh viên</span>
          </div>
          <div className="border-t border-surface-container-high pt-2 flex justify-between items-center text-sm font-bold">
            <span className="text-on-surface">Khoản cần nộp của bạn:</span>
            <span className="font-mono text-error text-base">{billAmount.toLocaleString('vi-VN')} đ</span>
          </div>
        </div>

        {/* Method selection */}
        <div>
          <span className="block text-xs font-semibold text-on-surface mb-2">Chọn phương thức thanh toán:</span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'vnpay', label: 'VNPay QR', icon: 'qr_code_scanner' },
              { id: 'momo', label: 'Ví MoMo', icon: 'account_balance_wallet' },
              { id: 'napas', label: 'Thẻ ATM Napas', icon: 'credit_card' }
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMethod(m.id as any)}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs ${
                  method === m.id
                    ? 'bg-primary-fixed border-primary text-primary font-bold shadow-xs'
                    : 'bg-surface-container-low border-outline-variant/30 text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{m.icon}</span>
                <span className="text-[11px]">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Simulated QR Code */}
        <div className="p-4 bg-white rounded-xl border border-outline-variant/40 flex flex-col items-center justify-center gap-2">
          {/* SVG Simulated QR code */}
          <div className="w-40 h-40 bg-slate-50 border border-slate-200 rounded-lg p-2 flex flex-col items-center justify-center shadow-xs">
            <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
              <rect x="5" y="5" width="25" height="25" fill="#0037b0" />
              <rect x="9" y="9" width="17" height="17" fill="#ffffff" />
              <rect x="13" y="13" width="9" height="9" fill="#0037b0" />

              <rect x="70" y="5" width="25" height="25" fill="#0037b0" />
              <rect x="74" y="9" width="17" height="17" fill="#ffffff" />
              <rect x="78" y="13" width="9" height="9" fill="#0037b0" />

              <rect x="5" y="70" width="25" height="25" fill="#0037b0" />
              <rect x="9" y="74" width="17" height="17" fill="#ffffff" />
              <rect x="13" y="78" width="9" height="9" fill="#0037b0" />

              <circle cx="50" cy="50" r="10" fill="#0037b0" />
              <rect x="40" y="15" width="8" height="8" fill="#131b2e" />
              <rect x="52" y="25" width="6" height="6" fill="#131b2e" />
              <rect x="45" y="75" width="10" height="8" fill="#131b2e" />
              <rect x="75" y="45" width="8" height="8" fill="#131b2e" />
              <rect x="25" y="48" width="8" height="8" fill="#131b2e" />
            </svg>
          </div>
          <span className="text-[11px] text-outline text-center">
            Mở App Ngân hàng hoặc MoMo quét mã QR trên màn hình
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-surface-container-high">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high"
          >
            Đóng
          </button>
          <button
            type="button"
            onClick={handleConfirmPay}
            disabled={processing}
            className="px-5 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container shadow-sm transition-all flex items-center gap-1.5"
          >
            {processing && <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>}
            <span>Xác nhận đã quét mã</span>
          </button>
        </div>
      </div>
    </div>
  );
};
