import React, { useState } from 'react';
import { AuditLog, SecurityAlert, SystemStats, TariffItem } from '../../core/types';
import { eventBus, EVENTS } from '../../core/bus';
import { api } from '../../core/api';

interface OverviewAppProps {
  stats: SystemStats;
  auditLogs: AuditLog[];
  tariffs: TariffItem[];
  securityAlerts: SecurityAlert[];
  onOpenAuditDetail: (log: AuditLog) => void;
  onRefreshLogs: () => void;
}

export const OverviewApp: React.FC<OverviewAppProps> = ({
  stats,
  auditLogs,
  tariffs,
  securityAlerts,
  onOpenAuditDetail,
  onRefreshLogs
}) => {
  const [trafficTimeframe, setTrafficTimeframe] = useState<'today' | '7days' | 'term1'>('today');
  const [roleFilter, setRoleFilter] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [tableSearch, setTableSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered audit logs
  const filteredLogs = auditLogs.filter(log => {
    if (roleFilter && !log.user.role.toLowerCase().includes(roleFilter.toLowerCase())) {
      return false;
    }
    if (actionFilter && log.actionType !== actionFilter) {
      return false;
    }
    if (tableSearch) {
      const q = tableSearch.toLowerCase();
      const match =
        log.user.name.toLowerCase().includes(q) ||
        log.detail.toLowerCase().includes(q) ||
        log.targetId.toLowerCase().includes(q) ||
        log.ip.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleToggleLock = async (logId: string) => {
    try {
      await api.toggleLock(logId);
      onRefreshLogs();
      eventBus.emit(EVENTS.SHOW_TOAST, 'Cập nhật trạng thái khóa tài khoản thành công!');
    } catch {
      alert('Không thể cập nhật trạng thái');
    }
  };

  const handleExportCSV = () => {
    const headers = ['Mã Log', 'Thời gian', 'Người thực hiện', 'Email', 'Hành động', 'Mô tả', 'Đối tượng', 'IP', 'Trạng thái'];
    const rows = filteredLogs.map(l => [
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
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SmartDorm_Audit_Trail_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    eventBus.emit(EVENTS.SHOW_TOAST, 'Đã xuất file CSV kiểm toán hệ thống thành công!');
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Top Action Bar & Greeting */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary-container text-on-primary shadow-sm">
              <span className="material-symbols-outlined text-[18px]">terminal</span>
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
              Bảng Điều Khiển Quản Trị Hệ Thống (System Admin Console)
            </h1>
          </div>
          <div className="text-xs sm:text-sm text-on-surface-variant flex flex-wrap items-center gap-2">
            <span>Hệ sinh thái Quản lý KTX Đại học Quốc gia</span>
            <span className="text-outline hidden sm:inline">•</span>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface-container-high text-primary font-semibold">
              Phiên bản Cloud v2.4 Enterprise
            </span>
            <span className="text-outline hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1.5 text-xs text-secondary font-medium">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Trạng thái: Ổn định (99.98% Uptime)
            </span>
          </div>
        </div>

        {/* Quick Admin Actions */}
        <div className="flex items-center flex-wrap gap-2 pt-1 xl:pt-0">
          <button
            onClick={() => eventBus.emit(EVENTS.OPEN_BACKUP)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container text-xs font-semibold shadow-xs transition-all border border-outline-variant/30"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">cloud_sync</span>
            <span>Sao lưu dữ liệu tức thì</span>
          </button>
          <button
            onClick={() => eventBus.emit(EVENTS.OPEN_ADD_USER)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container text-xs font-semibold shadow-xs transition-all border border-outline-variant/30"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">person_add</span>
            <span>+ Thêm tài khoản mới</span>
          </button>
          <button
            onClick={() => eventBus.emit(EVENTS.NAVIGATE, 'audit-logs')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-container text-on-primary hover:bg-primary text-xs font-semibold shadow-sm transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">description</span>
            <span>Báo cáo kiểm toán hệ thống</span>
          </button>
        </div>
      </div>

      {/* System & Infrastructure KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1: User Accounts */}
        <div className="bg-surface-container-lowest rounded-xl p-5 shadow-xs border border-outline-variant/30 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
              Tổng tài khoản hệ thống
            </span>
            <div className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">group</span>
            </div>
          </div>
          <div className="text-3xl text-on-surface font-bold tracking-tight mb-1 font-sans">
            {stats.accounts.total.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 mb-3">
            <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-semibold">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>+{stats.accounts.newThisWeek} tuần này
            </span>
            <span className="text-xs text-outline">Đồng bộ SSO ĐHQG</span>
          </div>
          <div className="bg-surface-container-low rounded-lg p-2.5 grid grid-cols-2 gap-2 text-on-surface text-xs">
            <div className="flex flex-col">
              <span className="text-[11px] text-outline">Sinh viên</span>
              <span className="font-mono font-semibold text-on-surface">3,450 (83.7%)</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-outline">Cán bộ QL</span>
              <span className="font-mono font-semibold text-on-surface">48 nhân sự</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-outline">Kỹ thuật viên</span>
              <span className="font-mono font-semibold text-on-surface">22 tài khoản</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-outline">Quản trị viên</span>
              <span className="font-mono font-semibold text-primary">4 quyền Root</span>
            </div>
          </div>
        </div>

        {/* Card 2: Dorm Occupancy */}
        <div className="bg-surface-container-lowest rounded-xl p-5 shadow-xs border border-outline-variant/30 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
              Lấp đầy & Chỗ ở KTX
            </span>
            <div className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[20px]">bedroom_parent</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl text-on-surface font-bold tracking-tight font-sans">
              {stats.occupancy.occupied.toLocaleString()}
            </span>
            <span className="text-sm font-semibold text-outline">
              / {stats.occupancy.totalSlots.toLocaleString()} chỗ
            </span>
          </div>
          <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden mb-2">
            <div className="bg-secondary-container h-full rounded-full transition-all" style={{ width: stats.occupancy.rate }} />
          </div>
          <div className="flex items-center justify-between text-on-surface-variant text-xs">
            <span className="font-semibold text-secondary">Tỷ lệ lấp đầy: {stats.occupancy.rate}</span>
            <span>406 phòng (Khu A, B, C, D)</span>
          </div>
          <div className="mt-3 flex items-center justify-between px-2.5 py-1.5 rounded bg-surface-container-low font-mono text-xs">
            <span className="text-on-surface-variant">Phòng trống khả dụng:</span>
            <span className="font-semibold text-on-surface">{stats.occupancy.availableRooms} phòng sẵn sàng</span>
          </div>
        </div>

        {/* Card 3: Server & Database Health */}
        <div className="bg-surface-container-lowest rounded-xl p-5 shadow-xs border border-outline-variant/30 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
              Hạ tầng Cloud & CSDL
            </span>
            <div className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined text-[20px]">dns</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl text-on-surface font-bold tracking-tight font-sans">
              {stats.infrastructure.uptime}
            </span>
            <span className="text-xs text-secondary font-semibold">Uptime 30d</span>
          </div>
          <p className="text-xs text-outline mb-3 truncate">{stats.infrastructure.cluster}</p>
          <div className="grid grid-cols-2 gap-2 text-on-surface text-xs">
            <div className="bg-surface-container-low p-2 rounded">
              <div className="flex justify-between items-center text-outline text-[11px]">
                <span>CPU</span>
                <span className="text-primary font-mono font-semibold">{stats.infrastructure.cpuLoad}%</span>
              </div>
              <div className="w-full bg-surface-container-highest h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: `${stats.infrastructure.cpuLoad}%` }} />
              </div>
            </div>
            <div className="bg-surface-container-low p-2 rounded">
              <div className="flex justify-between items-center text-outline text-[11px]">
                <span>RAM</span>
                <span className="text-secondary font-mono font-semibold">{stats.infrastructure.ramUsed}</span>
              </div>
              <div className="w-full bg-surface-container-highest h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-secondary-container h-full rounded-full" style={{ width: `${stats.infrastructure.ramPercent}%` }} />
              </div>
            </div>
            <div className="bg-surface-container-low p-2 rounded">
              <span className="text-[11px] text-outline block">DB Queries</span>
              <span className="font-mono font-semibold text-on-surface">{stats.infrastructure.dbQueries}</span>
            </div>
            <div className="bg-surface-container-low p-2 rounded">
              <span className="text-[11px] text-outline block">API Latency</span>
              <span className="font-mono font-semibold text-on-surface">{stats.infrastructure.apiLatency}</span>
            </div>
          </div>
        </div>

        {/* Card 4: Security Alerts */}
        <div className="bg-surface-container-lowest rounded-xl p-5 shadow-xs border border-outline-variant/30 hover:shadow-md transition-shadow relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
              An ninh & Xác thực
            </span>
            <div className="w-9 h-9 rounded-full bg-error-container flex items-center justify-center text-on-error-container">
              <span className="material-symbols-outlined text-[20px]">gpp_maybe</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl text-error font-bold tracking-tight font-sans">03</span>
            <span className="text-sm font-semibold text-on-surface">Sự cố an ninh</span>
          </div>
          <p className="text-xs text-error mb-2 font-medium">Yêu cầu rà soát IP và khóa tài khoản</p>
          <div className="space-y-1.5 mb-3">
            <div className="flex items-center gap-1.5 p-1.5 rounded bg-error-container/40 text-on-error-container text-xs">
              <span className="material-symbols-outlined text-[16px] text-error shrink-0">warning</span>
              <span className="truncate">1 IP bất thường từ Nga (Khu B)</span>
            </div>
            <div className="flex items-center gap-1.5 p-1.5 rounded bg-surface-container-low text-on-surface-variant text-xs">
              <span className="material-symbols-outlined text-[16px] text-outline shrink-0">lock_clock</span>
              <span className="truncate">2 tài khoản sai pass &gt; 5 lần</span>
            </div>
          </div>
          <button
            onClick={() => eventBus.emit(EVENTS.NAVIGATE, 'security-alerts')}
            className="w-full py-2 px-3 rounded-lg bg-error-container text-on-error-container hover:bg-error hover:text-on-error text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            type="button"
          >
            <span>Xem chi tiết cảnh báo khẩn</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Central Analytics & Distribution Grids (8/12 and 4/12 columns) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column: 8 cols */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          {/* Traffic & User Roles Analytics */}
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-xs border border-outline-variant/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-2">
              <div>
                <h2 className="text-base font-bold text-on-surface">
                  Phân Tầng Người Dùng & Lưu Lượng Truy Cập Hệ Thống
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Lưu lượng yêu cầu ghi nhận theo thời gian thực (Giờ cao điểm sinh viên đăng ký phòng KTX)
                </p>
              </div>

              {/* Timeframe toggle buttons */}
              <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg self-start sm:self-auto">
                <button
                  onClick={() => setTrafficTimeframe('today')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                    trafficTimeframe === 'today'
                      ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Hôm nay
                </button>
                <button
                  onClick={() => setTrafficTimeframe('7days')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                    trafficTimeframe === '7days'
                      ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  7 ngày qua
                </button>
                <button
                  onClick={() => setTrafficTimeframe('term1')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                    trafficTimeframe === 'term1'
                      ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Kỳ I (2024)
                </button>
              </div>
            </div>

            {/* Metric counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-3">
              <div className="p-2.5 rounded-lg bg-surface-container-low">
                <span className="text-[11px] text-outline block">Sinh viên Active</span>
                <span className="font-mono text-sm font-bold text-on-surface">
                  {trafficTimeframe === 'today' ? '3,118 online' : trafficTimeframe === '7days' ? '3,410 active' : '3,450 kỳ 1'}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-low">
                <span className="text-[11px] text-outline block">Cán bộ Quản lý</span>
                <span className="font-mono text-sm font-bold text-on-surface">42 đang phiên</span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-low">
                <span className="text-[11px] text-outline block">Đỉnh tải (Peak Traffic)</span>
                <span className="font-mono text-sm font-bold text-primary">
                  {trafficTimeframe === 'today' ? '12,840 req/phút' : '18,520 req/phút'}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-low">
                <span className="text-[11px] text-outline block">Tỷ lệ Lỗi HTTP 5xx</span>
                <span className="font-mono text-sm font-bold text-secondary">0.002% (An toàn)</span>
              </div>
            </div>

            {/* Interactive SVG Chart */}
            <div className="w-full bg-surface-container-low/50 rounded-xl p-3.5 overflow-hidden border border-outline-variant/20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-outline text-xs mb-2 gap-2">
                <span className="font-mono">Yêu cầu hệ thống (Requests/Giờ)</span>
                <div className="flex items-center gap-4 text-xs font-sans">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                    Lưu lượng Cổng Đăng Ký
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary-container" />
                    Dịch vụ Tra cứu / Hóa đơn
                  </span>
                </div>
              </div>

              <div className="relative h-44 w-full">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 650 160">
                  <defs>
                    <linearGradient id="gradPrimary" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#0037b0" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#0037b0" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="gradSecondary" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#39b8fd" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#39b8fd" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Grid lines */}
                  <line stroke="#dae2fd" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="650" y1="30" y2="30" />
                  <line stroke="#dae2fd" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="650" y1="70" y2="70" />
                  <line stroke="#dae2fd" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="650" y1="110" y2="110" />
                  <line stroke="#dae2fd" strokeWidth="1" x1="0" x2="650" y1="150" y2="150" />

                  {/* Secondary Area */}
                  <path d="M 0,140 Q 60,130 120,110 T 240,95 T 360,70 T 480,105 T 600,80 L 650,75 L 650,150 L 0,150 Z" fill="url(#gradSecondary)" />
                  <path d="M 0,140 Q 60,130 120,110 T 240,95 T 360,70 T 480,105 T 600,80 L 650,75" fill="none" stroke="#39b8fd" strokeWidth="2.5" />

                  {/* Primary Area (Peak at 400) */}
                  <path d="M 0,145 Q 80,135 160,115 T 300,75 T 400,20 T 500,90 T 580,115 L 650,110 L 650,150 L 0,150 Z" fill="url(#gradPrimary)" />
                  <path d="M 0,145 Q 80,135 160,115 T 300,75 T 400,20 T 500,90 T 580,115 L 650,110" fill="none" stroke="#0037b0" strokeWidth="3" />

                  {/* Peak indicator */}
                  <circle cx="400" cy="20" fill="#0037b0" r="4.5" />
                  <circle cx="400" cy="20" fill="#0037b0" opacity="0.2" r="9" />
                </svg>
              </div>

              <div className="flex justify-between text-outline font-mono text-[11px] pt-2 px-1 overflow-x-auto">
                <span>00:00</span>
                <span>04:00</span>
                <span className="text-primary font-semibold">08:00 (Mở cổng)</span>
                <span>12:00</span>
                <span className="text-secondary font-semibold">16:00 (Đỉnh phòng B4)</span>
                <span>20:00</span>
                <span>23:59</span>
              </div>
            </div>
          </div>

          {/* IoT Hardware Status & Infrastructure Grid */}
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-xs border border-outline-variant/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">sensors</span>
                <h2 className="text-base font-bold text-on-surface">
                  Trạng Thái Đồng Bộ Thiết Bị IoT Toàn Ký Túc Xá
                </h2>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-semibold self-start sm:self-auto">
                Tần suất quét: 30s/lần
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {/* Công tơ điện */}
              <div className="p-4 rounded-xl bg-surface-container-low flex flex-col justify-between border border-surface-container-high/60">
                <div>
                  <div className="flex items-start justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">bolt</span>
                      <span className="text-xs font-bold text-on-surface">Công tơ điện thông minh</span>
                    </div>
                    <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-surface-container-highest font-bold text-primary">
                      {stats.iot.electricityMeters.percent}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-3">
                    {stats.iot.electricityMeters.online} / {stats.iot.electricityMeters.total} thiết bị truyền telemetry ổn định qua giao thức Modbus-RTU / MQTT
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-surface-container-high/80">
                  <span className="text-secondary font-medium text-[11px]">{stats.iot.electricityMeters.disconnectedArea}</span>
                  <button
                    onClick={() => eventBus.emit(EVENTS.SHOW_TOAST, 'Đã gửi lệnh khởi động lại 3 công tơ Khu C!')}
                    className="text-primary hover:underline font-semibold text-xs"
                  >
                    Khởi động lại
                  </button>
                </div>
              </div>

              {/* Đồng hồ nước */}
              <div className="p-4 rounded-xl bg-surface-container-low flex flex-col justify-between border border-surface-container-high/60">
                <div>
                  <div className="flex items-start justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-[20px]">water_drop</span>
                      <span className="text-xs font-bold text-on-surface">Đồng hồ nước điện tử</span>
                    </div>
                    <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-surface-container-highest font-bold text-secondary">
                      {stats.iot.waterMeters.percent}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-3">
                    {stats.iot.waterMeters.online} / {stats.iot.waterMeters.total} thiết bị hoạt động chính xác. Phao cảnh báo rò rỉ nước tự động 24/7
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-surface-container-high/80">
                  <span className="text-error font-medium text-[11px]">{stats.iot.waterMeters.warning}</span>
                  <button
                    onClick={() => eventBus.emit(EVENTS.OPEN_TICKET)}
                    className="text-primary hover:underline font-semibold text-xs"
                  >
                    Tạo phiếu KT
                  </button>
                </div>
              </div>

              {/* Cổng RFID / FaceID */}
              <div className="p-4 rounded-xl bg-surface-container-low flex flex-col justify-between border border-surface-container-high/60">
                <div>
                  <div className="flex items-start justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-tertiary text-[20px]">fingerprint</span>
                      <span className="text-xs font-bold text-on-surface">Cổng RFID / FaceID</span>
                    </div>
                    <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-secondary-fixed font-bold text-on-secondary-fixed">
                      {stats.iot.rfidGates.percent}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-3">
                    {stats.iot.rfidGates.total}/{stats.iot.rfidGates.total} Barrier sảnh tòa nhà và cổng chính KTX kết nối thông suốt với DB sinh viên
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-surface-container-high/80">
                  <span className="text-secondary font-medium text-[11px]">{stats.iot.rfidGates.delay}</span>
                  <button
                    onClick={() => eventBus.emit(EVENTS.NAVIGATE, 'audit-logs')}
                    className="text-primary hover:underline font-semibold text-xs"
                  >
                    Kiểm tra log
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick System Tariffs & Catalogs Summary */}
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-xs border border-outline-variant/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">price_change</span>
                <h2 className="text-base font-bold text-on-surface">
                  Danh Mục Hệ Thống & Biểu Phí Ký Túc Xá Đang Áp Dụng
                </h2>
              </div>
              <button
                onClick={() => eventBus.emit(EVENTS.OPEN_TARIFFS)}
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-semibold self-start sm:self-auto"
                type="button"
              >
                <span>Cập nhật bảng giá (Học kỳ II)</span>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {tariffs.map((tariff) => (
                <div
                  key={tariff.id}
                  className="p-3.5 rounded-lg bg-surface-container-low flex flex-col justify-between border border-surface-container-high/60"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-outline uppercase font-semibold">
                      {tariff.name}
                    </span>
                    <span className="text-[11px] px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface font-semibold">
                      {tariff.zone}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-on-surface my-1 font-sans">
                    {typeof tariff.price === 'number'
                      ? `${tariff.price.toLocaleString('vi-VN')} đ`
                      : tariff.price}
                  </div>
                  <span className="text-xs text-on-surface-variant">{tariff.unit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: 4 cols */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* Security & Access Logs Stream */}
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-xs border border-outline-variant/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-error text-[22px]">security</span>
                  <h2 className="text-base font-bold text-on-surface">Nhật Ký Cảnh Báo An Ninh</h2>
                </div>
                <span className="font-mono text-xs text-outline">Real-time</span>
              </div>

              <div className="flex flex-col gap-3 mt-3">
                {securityAlerts.slice(0, 3).map((alert) => (
                  <div key={alert.id} className="p-3 rounded-xl bg-surface-container-low border border-surface-container-high/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs text-outline font-semibold">#{alert.id}</span>
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                          alert.severity === 'high'
                            ? 'bg-error-container text-on-error-container'
                            : alert.severity === 'medium'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-secondary-fixed text-on-secondary-fixed'
                        }`}
                      >
                        {alert.severityLabel}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface font-medium mb-2 leading-relaxed">
                      {alert.title} <span className="font-mono text-primary font-semibold">({alert.ip})</span>.
                    </p>
                    <div className="flex items-center justify-between text-on-surface-variant text-[11px]">
                      <span className="text-secondary font-medium truncate max-w-[190px]">
                        {alert.actionTaken}
                      </span>
                      <span className="font-mono text-outline shrink-0">{alert.timeAgo}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => eventBus.emit(EVENTS.NAVIGATE, 'security-alerts')}
              className="w-full mt-4 py-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface text-xs font-semibold flex items-center justify-center gap-1 transition-colors border border-outline-variant/30"
              type="button"
            >
              <span>Xem tất cả bản ghi an ninh</span>
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>

          {/* Background Microservices & Jobs Monitor */}
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-xs border border-outline-variant/30">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-surface-container-high">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[22px]">developer_board</span>
                <h2 className="text-base font-bold text-on-surface">Dịch Vụ Nền & Cron Jobs</h2>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" title="Microservices Active" />
            </div>

            <div className="space-y-4">
              {stats.cronJobs.map((job, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-on-surface">{job.name}</span>
                    <span className="text-secondary font-mono">{job.status}</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        idx === 0 ? 'bg-secondary-container' : idx === 1 ? 'bg-primary' : 'bg-surface-tint'
                      }`}
                      style={{ width: `${job.progress}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-outline">{job.note}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 p-2.5 rounded-lg bg-surface-container-low flex items-center justify-between border border-surface-container-high/60">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-outline text-[18px]">update</span>
                <span className="text-xs text-on-surface">Lần dọn rác DB gần nhất:</span>
              </div>
              <span className="font-mono text-xs text-primary font-semibold">03:30 Hôm nay</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Audit Trail & User Accounts Management Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-xs border border-outline-variant/30 overflow-hidden flex flex-col mb-8">
        {/* Header of CRUD Card */}
        <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-surface-container-high">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">history_edu</span>
              <h2 className="text-base font-bold text-on-surface">
                Nhật Ký Hoạt Động Kiểm Toán Hệ Thống (System Audit Trail)
              </h2>
            </div>
            <p className="text-xs text-on-surface-variant">
              Toàn bộ thao tác can thiệp dữ liệu người dùng, biểu phí, và phân quyền đều được mã hóa lưu trữ không thể xóa
            </p>
          </div>

          {/* Filters & Action Bar */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm log..."
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                className="h-9 pl-7 pr-3 bg-surface-container-low text-on-surface text-xs rounded-lg border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary w-36 sm:w-44"
              />
              <span className="material-symbols-outlined absolute left-2 top-2 text-[16px] text-outline pointer-events-none">
                search
              </span>
            </div>

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="h-9 px-2.5 bg-surface-container-low text-on-surface text-xs rounded-lg border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">Tất cả vai trò</option>
              <option value="Admin">Quản trị viên (Admin)</option>
              <option value="Manager">Cán bộ Quản lý (Manager)</option>
              <option value="Student">Sinh viên (Student)</option>
              <option value="Kế toán">Kế toán (Finance)</option>
            </select>

            {/* Action Type Filter */}
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="h-9 px-2.5 bg-surface-container-low text-on-surface text-xs rounded-lg border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">Tất cả hành động</option>
              <option value="create">Tạo tài khoản</option>
              <option value="update_price">Cập nhật biểu phí</option>
              <option value="lock">Khóa tài khoản</option>
              <option value="perm">Thay đổi phân quyền</option>
              <option value="special">Phê duyệt đặc cách</option>
            </select>

            <button
              onClick={handleExportCSV}
              className="h-9 px-3 bg-surface-container-low hover:bg-surface-container-high text-on-surface rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border border-outline-variant/40"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">file_download</span>
              <span>Xuất CSV</span>
            </button>
          </div>
        </div>

        {/* Data Table Container */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-surface-container-low/75 h-11 text-outline text-[11px] uppercase tracking-wider border-b border-surface-container-high">
                <th className="px-5 py-2 font-semibold">Thời gian</th>
                <th className="px-4 py-2 font-semibold">Người thực hiện</th>
                <th className="px-4 py-2 font-semibold">Hành động thực hiện</th>
                <th className="px-4 py-2 font-semibold">Đối tượng</th>
                <th className="px-4 py-2 font-semibold">Địa chỉ IP & Thiết bị</th>
                <th className="px-4 py-2 text-center font-semibold">Trạng thái</th>
                <th className="px-5 py-2 text-right font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high/60 text-on-surface text-xs">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-outline">
                    Không tìm thấy bản ghi kiểm toán phù hợp bộ lọc
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span className="font-mono font-semibold text-on-surface block leading-tight">
                        {log.time}
                      </span>
                      <span className="text-[11px] text-outline">{log.date}</span>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded-full ${log.user.avatarBg} flex items-center justify-center text-white font-bold text-[11px] shrink-0`}
                        >
                          {log.user.avatarInitials}
                        </div>
                        <div>
                          <span className="font-semibold text-on-surface block leading-tight">
                            {log.user.name}
                          </span>
                          <span className="text-[11px] text-outline">
                            {log.user.role} • {log.user.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 max-w-xs">
                      <span
                        className={`inline-flex items-center gap-1 font-semibold ${
                          log.actionType === 'lock'
                            ? 'text-error'
                            : log.actionType === 'update_price'
                            ? 'text-secondary'
                            : 'text-primary'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          {log.actionType === 'lock'
                            ? 'lock_person'
                            : log.actionType === 'update_price'
                            ? 'payments'
                            : log.actionType === 'perm'
                            ? 'security'
                            : log.actionType === 'special'
                            ? 'verified_user'
                            : 'person_add'}
                        </span>
                        {log.action}
                      </span>
                      <span className="text-[11px] text-on-surface-variant block truncate">
                        {log.detail}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span
                        className={`font-mono text-[11px] px-2 py-0.5 rounded font-semibold ${
                          log.status === 'locked'
                            ? 'bg-error-container text-on-error-container'
                            : 'bg-surface-container text-on-surface'
                        }`}
                      >
                        {log.targetId}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span
                        className={`font-mono text-xs block leading-tight ${
                          log.status === 'locked' ? 'text-error font-semibold' : 'text-on-surface'
                        }`}
                      >
                        {log.ip}
                      </span>
                      <span className="text-[11px] text-outline">{log.device}</span>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap text-center">
                      <span
                        className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold ${
                          log.status === 'locked'
                            ? 'bg-error-container text-on-error-container'
                            : log.status === 'approved'
                            ? 'bg-secondary-fixed text-on-secondary-fixed'
                            : 'bg-surface-container-high text-primary'
                        }`}
                      >
                        {log.statusText}
                      </span>
                    </td>

                    <td className="px-5 py-3.5 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onOpenAuditDetail(log)}
                          className="p-1.5 rounded hover:bg-surface-container text-outline hover:text-primary transition-colors"
                          title="Xem chi tiết log"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
                        <button
                          onClick={() => handleToggleLock(log.id)}
                          className={`p-1.5 rounded hover:bg-surface-container transition-colors ${
                            log.status === 'locked'
                              ? 'text-secondary hover:text-primary'
                              : 'text-outline hover:text-error'
                          }`}
                          title={log.status === 'locked' ? 'Mở khóa tài khoản' : 'Khóa nhanh tài khoản'}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {log.status === 'locked' ? 'lock_open' : 'lock'}
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 bg-surface-container-lowest flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-surface-container-high/60">
          <div className="flex items-center gap-1.5 text-on-surface-variant text-xs">
            <span>Hiển thị</span>
            <span className="font-mono font-semibold text-on-surface">1 - {filteredLogs.length}</span>
            <span>trong tổng số</span>
            <span className="font-mono font-semibold text-on-surface">1,489</span>
            <span>bản ghi kiểm toán</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-outline hover:bg-surface-container-low transition-colors disabled:opacity-40"
            >
              <span className="material-symbols-outlined text-[16px]">first_page</span>
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-outline hover:bg-surface-container-low transition-colors disabled:opacity-40"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>

            {[1, 2, 3].map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded-lg font-mono text-xs font-semibold ${
                  currentPage === page
                    ? 'bg-primary-container text-on-primary shadow-xs'
                    : 'hover:bg-surface-container-low text-on-surface'
                }`}
              >
                {page}
              </button>
            ))}

            <span className="px-1 text-outline text-xs">...</span>

            <button
              onClick={() => setCurrentPage(298)}
              className="w-7 h-7 rounded-lg hover:bg-surface-container-low text-on-surface font-mono text-xs"
            >
              298
            </button>

            <button
              onClick={() => setCurrentPage(p => Math.min(298, p + 1))}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-outline hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
            <button
              onClick={() => setCurrentPage(298)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-outline hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">last_page</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
