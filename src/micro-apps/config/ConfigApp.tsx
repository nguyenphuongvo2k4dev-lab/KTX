import React, { useState } from 'react';
import { eventBus, EVENTS } from '../../core/bus';

export const ConfigApp: React.FC = () => {
  const [ssoEndpoint, setSsoEndpoint] = useState('https://sso.vnu.edu.vn/oauth2/authorize');
  const [redisHost, setRedisHost] = useState('redis-cluster.internal:6379');
  const [mqttBroker, setMqttBroker] = useState('mqtt://iot-gateway.dorm.vnu.edu.vn:1883');
  const [autoBackupTime, setAutoBackupTime] = useState('02:00');
  const [maxLoginAttempts, setMaxLoginAttempts] = useState('5');

  const handleSave = () => {
    eventBus.emit(EVENTS.SHOW_TOAST, 'Đã lưu và cập nhật cấu hình hệ thống SmartDorm!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">tune</span>
            <h1 className="text-xl sm:text-2xl font-bold text-on-surface">Cấu Hình Hệ Thống Trung Tâm</h1>
          </div>
          <p className="text-xs text-on-surface-variant">
            Thiết lập tích hợp SSO ĐHQG, Broker MQTT thiết bị IoT, Redis Cache và lịch trình sao lưu tự động
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-container shadow-sm transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">save</span>
          <span>Lưu cấu hình</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SSO & Auth */}
        <div className="p-5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-surface-container-high">
            <span className="material-symbols-outlined text-primary text-[20px]">badge</span>
            <h3 className="text-sm font-bold text-on-surface">Xác Thực & SSO ĐHQG</h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              Điểm kết nối SSO OAuth2 VNU
            </label>
            <input
              type="text"
              value={ssoEndpoint}
              onChange={(e) => setSsoEndpoint(e.target.value)}
              className="w-full text-xs h-9 px-3 bg-surface-container-low rounded-lg border border-outline-variant/40 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              Số lần đăng nhập sai tối đa trước khi khóa IP
            </label>
            <input
              type="number"
              value={maxLoginAttempts}
              onChange={(e) => setMaxLoginAttempts(e.target.value)}
              className="w-full text-xs h-9 px-3 bg-surface-container-low rounded-lg border border-outline-variant/40 font-mono"
            />
          </div>
        </div>

        {/* IoT Broker */}
        <div className="p-5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-surface-container-high">
            <span className="material-symbols-outlined text-secondary text-[20px]">sensors</span>
            <h3 className="text-sm font-bold text-on-surface">Hạ Tầng Thu Thập Dữ Liệu IoT</h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              MQTT Broker URI (Công tơ & Barrier)
            </label>
            <input
              type="text"
              value={mqttBroker}
              onChange={(e) => setMqttBroker(e.target.value)}
              className="w-full text-xs h-9 px-3 bg-surface-container-low rounded-lg border border-outline-variant/40 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              Redis Cluster Cache Host
            </label>
            <input
              type="text"
              value={redisHost}
              onChange={(e) => setRedisHost(e.target.value)}
              className="w-full text-xs h-9 px-3 bg-surface-container-low rounded-lg border border-outline-variant/40 font-mono"
            />
          </div>
        </div>

        {/* Backup & Maintenance */}
        <div className="p-5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs space-y-4 md:col-span-2">
          <div className="flex items-center gap-2 pb-2 border-b border-surface-container-high">
            <span className="material-symbols-outlined text-tertiary text-[20px]">schedule</span>
            <h3 className="text-sm font-bold text-on-surface">Lịch Trình Tự Động Định Kỳ (Cron)</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Giờ tạo bản chụp Snapshot định kỳ (Hàng ngày)
              </label>
              <input
                type="time"
                value={autoBackupTime}
                onChange={(e) => setAutoBackupTime(e.target.value)}
                className="w-full text-xs h-9 px-3 bg-surface-container-low rounded-lg border border-outline-variant/40 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Vị trí lưu trữ đám mây
              </label>
              <div className="text-xs p-2.5 rounded-lg bg-surface-container-low font-mono text-outline">
                s3://vnu-cloud-backup/smartdorm/production/
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
