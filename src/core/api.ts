import { AuditLog, SecurityAlert, SystemStats, TariffItem } from './types';

export const api = {
  async getStats(): Promise<SystemStats> {
    try {
      const res = await fetch('/api/stats');
      if (!res.ok) throw new Error('Failed to fetch stats');
      return await res.json();
    } catch {
      // Fallback data
      return {
        accounts: { total: 4120, newThisWeek: 142, students: 3450, studentsPercent: '83.7%', staff: 48, technicians: 22, admins: 4 },
        occupancy: { occupied: 3450, totalSlots: 3640, rate: '94.8%', totalRooms: 406, zones: 'Khu A, B, C, D', availableRooms: 21 },
        infrastructure: { uptime: '99.98%', uptimeDays: 30, cluster: 'Cụm Kubernetes ĐHQG TPHCM', cpuLoad: 18, ramUsed: '6.8 / 16G', ramPercent: 42.5, dbQueries: '420 req/s', apiLatency: '28 ms' },
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
      };
    }
  },

  async getAuditLogs(params?: { role?: string; actionType?: string; search?: string }): Promise<{ total: number; displayCount: number; items: AuditLog[] }> {
    try {
      const query = new URLSearchParams();
      if (params?.role) query.set('role', params.role);
      if (params?.actionType) query.set('actionType', params.actionType);
      if (params?.search) query.set('search', params.search);
      
      const res = await fetch(`/api/audit-logs?${query.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch logs');
      return await res.json();
    } catch {
      return {
        total: 1489,
        displayCount: 5,
        items: []
      };
    }
  },

  async toggleLock(logId: string) {
    const res = await fetch('/api/audit-logs/toggle-lock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: logId })
    });
    return res.json();
  },

  async getTariffs(): Promise<TariffItem[]> {
    try {
      const res = await fetch('/api/tariffs');
      if (!res.ok) throw new Error('Failed to fetch tariffs');
      return await res.json();
    } catch {
      return [];
    }
  },

  async updateTariffs(tariffs: TariffItem[]) {
    const res = await fetch('/api/tariffs', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updatedTariffs: tariffs })
    });
    return res.json();
  },

  async getSecurityAlerts(): Promise<SecurityAlert[]> {
    try {
      const res = await fetch('/api/security-alerts');
      if (!res.ok) throw new Error('Failed to fetch alerts');
      return await res.json();
    } catch {
      return [];
    }
  },

  async blockIp(alertId: string, ip: string) {
    const res = await fetch('/api/security-alerts/block-ip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alertId, ip })
    });
    return res.json();
  },

  async triggerBackup() {
    const res = await fetch('/api/backup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    return res.json();
  },

  async createUser(userData: { fullName: string; email: string; role: string; room?: string; studentId?: string }) {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return res.json();
  },

  // Student Portal Methods
  async getStudentInfo() {
    try {
      const res = await fetch('/api/student/info');
      if (!res.ok) throw new Error('Failed to fetch student info');
      return await res.json();
    } catch {
      return {
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
      };
    }
  },

  async getStudentBills() {
    try {
      const res = await fetch('/api/student/bills');
      if (!res.ok) throw new Error('Failed to fetch bills');
      return await res.json();
    } catch {
      return [
        { id: 'BILL-10-2024', month: 'Tháng 10/2024', period: 'Tiền phòng + Điện + Nước', amount: 685000, dueDate: '25/10/2024', status: 'pending', statusText: 'Chưa nộp', electricKwh: 142, waterM3: 16 },
        { id: 'BILL-09-2024', month: 'Tháng 09/2024', period: 'Tiền phòng + Điện + Nước', amount: 620000, dueDate: '20/09/2024', status: 'paid', statusText: 'Đã nộp', electricKwh: 128, waterM3: 14 },
        { id: 'BILL-08-2024', month: 'Tháng 08/2024', period: 'Tiền phòng + Phí cơ sở vật chất', amount: 650000, dueDate: '22/08/2024', status: 'paid', statusText: 'Đã nộp', electricKwh: 135, waterM3: 15 }
      ];
    }
  },

  async payBill(billId: string, method: string = 'VNPay') {
    const res = await fetch('/api/student/pay-bill', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ billId, method })
    });
    return res.json();
  },

  async getStudentTickets() {
    try {
      const res = await fetch('/api/student/tickets');
      if (!res.ok) throw new Error('Failed to fetch tickets');
      return await res.json();
    } catch {
      return [
        { id: 'SC-9102', title: 'Bóng đèn tuýp LED ban công bị chập chờn', category: 'Hệ thống điện & Chiếu sáng', timeSent: 'Hôm qua 16:30', ktvName: 'Trần Văn Nam', ktvNote: 'Dự kiến thay bóng tuýp mới lúc 14:00 chiều nay', status: 'in_progress', statusText: 'Kỹ thuật đang xử lý' },
        { id: 'SC-8419', title: 'Khóa van vòi xịt vệ sinh bị rò nước', category: 'Vòi nước, Lavabo, Bồn cầu', timeSent: '05/10/2024', ktvName: 'Lê Văn Hùng', ktvNote: 'Đã thay zoăng cao su và van áp lực mới', status: 'completed', statusText: 'Đã hoàn thành', rating: 5 }
      ];
    }
  },

  async createStudentTicket(category: string, description: string) {
    const res = await fetch('/api/student/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, description })
    });
    return res.json();
  },

  async sendStudentAiChat(message: string) {
    const res = await fetch('/api/student/ai-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    return res.json();
  }
};
