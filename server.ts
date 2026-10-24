import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// In-memory data store for the KTX SmartDorm Admin System
interface AuditLog {
  id: string;
  time: string;
  date: string;
  user: {
    name: string;
    role: string;
    email: string;
    avatarInitials: string;
    avatarBg: string;
  };
  action: string;
  actionType: 'create' | 'update_price' | 'lock' | 'perm' | 'special';
  detail: string;
  targetId: string;
  ip: string;
  device: string;
  status: 'success' | 'locked' | 'approved';
  statusText: string;
  payload?: Record<string, any>;
}

let auditLogs: AuditLog[] = [
  {
    id: 'LOG-001',
    time: '10:42:15',
    date: '24/10/2024',
    user: {
      name: 'TS. Trần Minh Khoa',
      role: 'SuperAdmin',
      email: 'root@dorm.edu.vn',
      avatarInitials: 'TK',
      avatarBg: 'bg-primary'
    },
    action: 'Thay đổi phân quyền',
    actionType: 'perm',
    detail: 'Gán vai trò Quản lý Khu B cho CB Nguyễn Văn Hoàng',
    targetId: 'USR_MNG_9904',
    ip: '10.240.12.5 (Nội bộ)',
    device: 'macOS • Chrome 129',
    status: 'success',
    statusText: 'Thành công',
    payload: {
      assignedRole: 'Quản lý Khu B',
      targetUser: 'Nguyễn Văn Hoàng',
      grantedPermissions: ['manage_rooms', 'view_students', 'dispatch_maintenance']
    }
  },
  {
    id: 'LOG-002',
    time: '09:18:02',
    date: '24/10/2024',
    user: {
      name: 'Lê Hồng Phúc',
      role: 'Kế toán',
      email: 'phuc.lh@dorm.edu.vn',
      avatarInitials: 'LH',
      avatarBg: 'bg-secondary'
    },
    action: 'Cập nhật biểu phí',
    actionType: 'update_price',
    detail: 'Điều chỉnh định mức nước sinh hoạt khối năm 2024',
    targetId: 'TARIFF_WAT_24',
    ip: '10.240.14.88 (Văn phòng)',
    device: 'Windows • Edge 128',
    status: 'success',
    statusText: 'Thành công',
    payload: {
      catalog: 'Nước Sinh Hoạt',
      oldRate: '7,500 đ/m³',
      newRate: '8,500 đ/m³',
      approvedBy: 'Hội đồng Quản lý KTX'
    }
  },
  {
    id: 'LOG-003',
    time: '08:05:40',
    date: '24/10/2024',
    user: {
      name: 'Security Daemon',
      role: 'Hệ thống',
      email: 'auth-guard@internal',
      avatarInitials: 'SYS',
      avatarBg: 'bg-surface-container-high text-on-surface'
    },
    action: 'Khóa tài khoản tạm thời',
    actionType: 'lock',
    detail: 'Ngắt phiên sinh viên nhập sai mật khẩu 6 lần liên tiếp',
    targetId: 'SV_2112450',
    ip: '115.79.138.22 (Viettel 4G)',
    device: 'Android 14 • Mobile App',
    status: 'locked',
    statusText: 'Đã khóa 30m',
    payload: {
      failedAttempts: 6,
      lockDurationMinutes: 30,
      clientLocation: 'TP. Thủ Đức, TP.HCM'
    }
  },
  {
    id: 'LOG-004',
    time: '07:30:11',
    date: '24/10/2024',
    user: {
      name: 'Đặng Ngọc Hải',
      role: 'Trưởng ban QL',
      email: 'hai.dn@dorm.edu.vn',
      avatarInitials: 'ĐH',
      avatarBg: 'bg-surface-tint'
    },
    action: 'Phê duyệt đặc cách',
    actionType: 'special',
    detail: 'Đặc cách phòng diện sinh viên khuyết tật vượt cấp (Phòng A102)',
    targetId: 'ROOM_A_102',
    ip: '10.240.10.12 (Văn phòng BQL)',
    device: 'Windows • Chrome 129',
    status: 'approved',
    statusText: 'Đã duyệt',
    payload: {
      room: 'A102 (Tầng 1 - Cận cửa thoát hiểm)',
      studentName: 'Trần Văn An',
      studentCode: '2112009'
    }
  },
  {
    id: 'LOG-005',
    time: '06:45:00',
    date: '24/10/2024',
    user: {
      name: 'Batch Sync VNU',
      role: 'Tự động',
      email: 'sync-service@vnu.edu.vn',
      avatarInitials: 'SSO',
      avatarBg: 'bg-primary-container'
    },
    action: 'Tạo tài khoản tự động',
    actionType: 'create',
    detail: 'Đồng bộ danh sách 142 tân sinh viên khóa K24 diện ưu tiên',
    targetId: 'BATCH_K24_VNU',
    ip: '172.16.0.4 (VPC Gateway)',
    device: 'Cron Job • Linux Srv',
    status: 'success',
    statusText: 'Thành công (142/142)',
    payload: {
      batchId: 'BATCH_2024_OCT_K24',
      totalImported: 142,
      dataSource: 'Portal Tuyển sinh ĐHQG TP.HCM'
    }
  }
];

let tariffs = [
  {
    id: 'T-01',
    name: 'Phòng Tiêu Chuẩn',
    zone: 'Khu B, D',
    price: 650000,
    unit: '/tháng/sinh viên',
    desc: '4-6 SV/phòng (Giường tầng, quạt trần, WC khép kín)'
  },
  {
    id: 'T-02',
    name: 'Phòng CLC Máy Lạnh',
    zone: 'Khu A',
    price: 1200000,
    unit: '/tháng/sinh viên',
    desc: '2-4 SV/phòng (Máy lạnh Inverter, bàn học cao cấp)'
  },
  {
    id: 'T-03',
    name: 'Điện Sinh Hoạt KTX',
    zone: 'Theo EVN',
    price: 'Biểu giá Lũy tiến',
    unit: 'Bậc 1-6 chuẩn Bộ Công Thương',
    desc: 'Đo lường tự động qua công tơ thông minh Modbus-RTU'
  },
  {
    id: 'T-04',
    name: 'Nước Sinh Hoạt',
    zone: 'Cấp thủy',
    price: 8500,
    unit: '/m³ (Đã gồm phí BVMT)',
    desc: 'Phao giám sát rò rỉ nước tự động 24/7'
  }
];

let securityAlerts = [
  {
    id: 'SEC-409',
    severity: 'high',
    severityLabel: 'Cảnh báo cao',
    title: 'Phát hiện 12 lần đăng nhập thất bại liên tiếp vào tài khoản CBQL_KhuB',
    ip: '14.161.42.18',
    actionTaken: 'Hệ thống đã tự động khóa IP 60 phút',
    timeAgo: '14 phút trước',
    status: 'active'
  },
  {
    id: 'SEC-408',
    severity: 'info',
    severityLabel: 'Thông tin',
    title: 'Cấp quyền vai trò Manager mới cho tài khoản hoang.nv@dorm.edu.vn',
    ip: '10.240.12.5',
    actionTaken: 'Xác thực 2 yếu tố thành công',
    timeAgo: '1 giờ trước',
    status: 'resolved'
  },
  {
    id: 'SEC-407',
    severity: 'success',
    severityLabel: 'Thành công',
    title: 'Tự động sao lưu dữ liệu toàn bộ hệ thống Snapshot định kỳ 02:00 sáng thành công',
    ip: '172.16.0.4',
    actionTaken: 'Dung lượng: 14.2 GB S3 VNU-Cloud',
    timeAgo: '02:00 Hôm nay',
    status: 'resolved'
  },
  {
    id: 'SEC-406',
    severity: 'medium',
    severityLabel: 'Cảnh báo TB',
    title: 'Tần suất gửi truy vấn tra cứu hóa đơn bất thường từ dải IP KTX Khu C',
    ip: '115.79.138.99',
    actionTaken: 'Kích hoạt Cloudflare Rate-Limiting',
    timeAgo: '3 giờ trước',
    status: 'active'
  }
];

// API Endpoints
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    version: '2.4 Enterprise',
    uptime: '99.98%',
    serverTime: new Date().toISOString()
  });
});

app.get('/api/stats', (req, res) => {
  res.json({
    accounts: {
      total: 4120,
      newThisWeek: 142,
      students: 3450,
      studentsPercent: '83.7%',
      staff: 48,
      technicians: 22,
      admins: 4
    },
    occupancy: {
      occupied: 3450,
      totalSlots: 3640,
      rate: '94.8%',
      totalRooms: 406,
      zones: 'Khu A, B, C, D',
      availableRooms: 21
    },
    infrastructure: {
      uptime: '99.98%',
      uptimeDays: 30,
      cluster: 'Cụm Kubernetes ĐHQG TPHCM',
      cpuLoad: 18,
      ramUsed: '6.8 / 16G',
      ramPercent: 42.5,
      dbQueries: '420 req/s',
      apiLatency: '28 ms'
    },
    iot: {
      electricityMeters: { total: 406, online: 403, percent: '99.2%', disconnectedArea: '3 công tơ mất kết nối (Khu C)' },
      waterMeters: { total: 406, online: 401, percent: '98.8%', warning: '5 đồng hồ pin yếu (<10%)' },
      rfidGates: { total: 32, online: 32, percent: '100%', delay: '0 trễ lệch dữ liệu' }
    },
    cronJobs: [
      { name: 'Tính cước điện nước IoT (Batch)', progress: 78, note: 'Kỳ tháng 10/2024: 316 / 406 phòng hoàn tất', status: 'Đang chạy' },
      { name: 'Cổng gửi SMS / Email thông báo', progress: 99.9, note: 'Queue: 14 tin nhắn đang đợi chuyển', status: '99.9% Delivered' },
      { name: 'Bộ nhớ đệm Redis Cache', progress: 52.5, note: 'Hit rate: 94.2% - Không xảy ra nghẽn I/O', status: '2.1 GB / 4.0 GB' }
    ]
  });
});

app.get('/api/audit-logs', (req, res) => {
  const { role, actionType, search } = req.query;
  let results = [...auditLogs];

  if (role) {
    results = results.filter(log => log.user.role.toLowerCase().includes(String(role).toLowerCase()));
  }
  if (actionType) {
    results = results.filter(log => log.actionType === actionType);
  }
  if (search) {
    const q = String(search).toLowerCase();
    results = results.filter(log =>
      log.user.name.toLowerCase().includes(q) ||
      log.detail.toLowerCase().includes(q) ||
      log.targetId.toLowerCase().includes(q) ||
      log.ip.toLowerCase().includes(q)
    );
  }

  res.json({
    total: 1489,
    displayCount: results.length,
    items: results
  });
});

app.post('/api/audit-logs/toggle-lock', (req, res) => {
  const { id } = req.body;
  const log = auditLogs.find(l => l.id === id);
  if (!log) {
    return res.status(404).json({ error: 'Log not found' });
  }

  if (log.status === 'locked') {
    log.status = 'success';
    log.statusText = 'Đã mở khóa';
  } else {
    log.status = 'locked';
    log.statusText = 'Đã khóa';
  }

  res.json({ success: true, log });
});

// Student Portal Data & Endpoints
let studentBills = [
  {
    id: 'BILL-10-2024',
    month: 'Tháng 10/2024',
    period: 'Tiền phòng + Điện + Nước',
    amount: 685000,
    dueDate: '25/10/2024',
    status: 'pending',
    statusText: 'Chưa nộp',
    electricKwh: 142,
    waterM3: 16
  },
  {
    id: 'BILL-09-2024',
    month: 'Tháng 09/2024',
    period: 'Tiền phòng + Điện + Nước',
    amount: 620000,
    dueDate: '20/09/2024',
    status: 'paid',
    statusText: 'Đã nộp',
    electricKwh: 128,
    waterM3: 14
  },
  {
    id: 'BILL-08-2024',
    month: 'Tháng 08/2024',
    period: 'Tiền phòng + Phí cơ sở vật chất',
    amount: 650000,
    dueDate: '22/08/2024',
    status: 'paid',
    statusText: 'Đã nộp',
    electricKwh: 135,
    waterM3: 15
  }
];

let studentTickets = [
  {
    id: 'SC-9102',
    title: 'Bóng đèn tuýp LED ban công bị chập chờn',
    category: 'Hệ thống điện & Chiếu sáng',
    timeSent: 'Hôm qua 16:30',
    ktvName: 'Trần Văn Nam',
    ktvNote: 'Dự kiến thay bóng tuýp mới lúc 14:00 chiều nay',
    status: 'in_progress',
    statusText: 'Kỹ thuật đang xử lý'
  },
  {
    id: 'SC-8419',
    title: 'Khóa van vòi xịt vệ sinh bị rò nước',
    category: 'Vòi nước, Lavabo, Bồn cầu',
    timeSent: '05/10/2024',
    ktvName: 'Lê Văn Hùng',
    ktvNote: 'Đã thay zoăng cao su và van áp lực mới',
    status: 'completed',
    statusText: 'Đã hoàn thành',
    rating: 5
  }
];

app.get('/api/student/info', (req, res) => {
  res.json({
    fullName: 'Đặng Hoàng Nam',
    studentId: '22120045',
    faculty: 'Khoa CNTT & Truyền thông',
    className: 'CNTT-K22A',
    cohort: 'K22',
    phone: '0912 345 678',
    room: 'P.402 - Nhà B2 (Khu B)',
    roomNumber: '402',
    building: 'B2',
    zone: 'Khu B (Nam sinh viên)',
    bedSlot: 'G1',
    isLeader: true,
    contract: {
      id: 'HD-2024-8841',
      daysLeft: 74,
      expiryDate: '31/12/2024',
      renewalStartDate: '01/12/2024'
    },
    roommates: [
      { id: '1', bed: 'G1', name: 'Đặng Hoàng Nam', role: 'Bạn • Trưởng phòng', faculty: 'Khoa CNTT & Truyền thông • K22', phone: '0912 345 678', inRoom: true, isMe: true },
      { id: '2', bed: 'G2', name: 'Nguyễn Tiến Đạt', role: 'Sinh viên', faculty: 'Khoa Điện tử Viễn thông • K22', phone: '0984 112 334', inRoom: true },
      { id: '3', bed: 'G3', name: 'Lê Bảo Minh', role: 'Sinh viên', faculty: 'Khoa Kinh tế Đối ngoại • K23', phone: '0905 889 211', inRoom: true },
      { id: '4', bed: 'G4', name: 'Phạm Tuấn Hưng', role: 'Tân sinh viên', faculty: 'Khoa Khoa học Máy tính • K24', phone: '0977 441 902', inRoom: false }
    ],
    roomSpecs: {
      airConditioner: '12.000 BTU Inverter',
      waterHeater: 'Ariston 30L',
      electricMeter: '1,420 kWh (IoT)',
      waterMeter: '112 m³ (IoT)'
    }
  });
});

app.get('/api/student/bills', (req, res) => {
  res.json(studentBills);
});

app.post('/api/student/pay-bill', (req, res) => {
  const { billId, method } = req.body;
  const bill = studentBills.find(b => b.id === billId);
  if (bill) {
    bill.status = 'paid';
    bill.statusText = 'Đã nộp';
  }
  res.json({ success: true, message: `Thanh toán thành công qua ${method || 'VNPay'}! Hóa đơn đã được ghi nhận.` });
});

app.get('/api/student/tickets', (req, res) => {
  res.json(studentTickets);
});

app.post('/api/student/tickets', (req, res) => {
  const { category, description } = req.body;
  const newTicket = {
    id: `SC-${Math.floor(1000 + Math.random() * 9000)}`,
    title: description.slice(0, 45) + (description.length > 45 ? '...' : ''),
    category: category || 'Hệ thống điện & Chiếu sáng',
    timeSent: 'Vừa xong',
    ktvName: 'Ban Kỹ thuật KTX',
    ktvNote: 'Đã phân bổ cho kỹ thuật viên khu vực Nhà B2',
    status: 'in_progress' as const,
    statusText: 'Đang tiếp nhận'
  };
  studentTickets.unshift(newTicket);
  res.json({ success: true, ticket: newTicket });
});

app.post('/api/student/ai-chat', (req, res) => {
  const { message } = req.body;
  const msgLower = (message || '').toLowerCase();
  let reply = 'Chào bạn Nam! Mình đã ghi nhận câu hỏi. Bạn cần hỗ trợ thêm về hợp đồng, thanh toán hay báo hỏng phòng 402 không?';

  if (msgLower.includes('tiền điện') || msgLower.includes('hóa đơn') || msgLower.includes('tháng 10')) {
    reply = 'Hóa đơn tháng 10/2024 của phòng 402 là 685,000 đ (Điện 142 kWh, Nước 16 m³). Hạn nộp là ngày 25/10/2024 qua cổng VNPay/MoMo trên ứng dụng bạn nhé!';
  } else if (msgLower.includes('giới nghiêm') || msgLower.includes('nội quy') || msgLower.includes('mấy giờ')) {
    reply = 'Theo Nội quy KTX ĐHQG: Cổng tòa nhà khóa lúc 23:00 hàng ngày. Nếu cần về muộn do học tập hoặc công việc, bạn vui lòng bấm nút "Đăng ký tạm vắng qua đêm" trên ứng dụng trước 22:30 nhé!';
  } else if (msgLower.includes('chuyển phòng') || msgLower.includes('gia hạn')) {
    reply = 'Hồ sơ xin chuyển sang phòng B402 (#DK-24098) của bạn hiện đang chờ Quản lý Nguyễn Thu Trang phê duyệt. Dự kiến hoàn tất trước ngày 28/10/2024!';
  } else if (msgLower.includes('báo hỏng') || msgLower.includes('sửa')) {
    reply = 'Bạn có thể bấm nút "Gửi báo hỏng thiết bị" ở góc trên hoặc mô tả sự cố ngay tại đây, mình sẽ tạo phiếu điều động KTV đến phòng 402 hỗ trợ ngay!';
  }

  res.json({ reply, time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) });
});


app.put('/api/tariffs', (req, res) => {
  const { updatedTariffs } = req.body;
  if (Array.isArray(updatedTariffs)) {
    tariffs = updatedTariffs;
  }
  res.json({ success: true, tariffs });
});

app.get('/api/security-alerts', (req, res) => {
  res.json(securityAlerts);
});

app.post('/api/security-alerts/block-ip', (req, res) => {
  const { alertId, ip } = req.body;
  const alert = securityAlerts.find(a => a.id === alertId);
  if (alert) {
    alert.status = 'resolved';
    alert.actionTaken = `Đã chặn vĩnh viễn IP ${ip} trên tường lửa WAF`;
  }
  res.json({ success: true, message: `IP ${ip} đã được chặn trên WAF VNU-Cloud.` });
});

app.post('/api/backup', (req, res) => {
  const backupId = `SNAP_${Date.now()}`;
  res.json({
    success: true,
    backupId,
    timestamp: new Date().toISOString(),
    size: '14.28 GB',
    storageBucket: 's3://vnu-cloud-backup/smartdorm/snapshots/' + backupId,
    message: 'Sao lưu cơ sở dữ liệu hệ thống KTX hoàn tất 100% không gián đoạn.'
  });
});

app.post('/api/users', (req, res) => {
  const { fullName, email, role, room, studentId } = req.body;
  if (!fullName || !email) {
    return res.status(400).json({ error: 'Vui lòng điền đủ họ tên và email.' });
  }

  const newLog: AuditLog = {
    id: `LOG-00${auditLogs.length + 1}`,
    time: new Date().toLocaleTimeString('vi-VN'),
    date: new Date().toLocaleDateString('vi-VN'),
    user: {
      name: 'TS. Trần Minh Khoa',
      role: 'SuperAdmin',
      email: 'root@dorm.edu.vn',
      avatarInitials: 'TK',
      avatarBg: 'bg-primary'
    },
    action: 'Thêm tài khoản thủ công',
    actionType: 'create',
    detail: `Tạo tài khoản mới: ${fullName} (${role}) - Phòng: ${room || 'Chưa gán'}`,
    targetId: studentId || `USR_${Date.now().toString().slice(-4)}`,
    ip: '10.240.12.5 (Nội bộ)',
    device: 'macOS • Chrome 129',
    status: 'success',
    statusText: 'Đã kích hoạt',
    payload: { fullName, email, role, room, studentId }
  };

  auditLogs.unshift(newLog);
  res.json({ success: true, user: { fullName, email, role, room, studentId }, log: newLog });
});

async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

startServer();
