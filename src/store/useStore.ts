import { create } from 'zustand';
import {
  AuditLog,
  SecurityAlert,
  SystemStats,
  TariffItem,
  StudentInfo,
  StudentBill,
  StudentTicket
} from '../core/types';
import { api } from '../core/api';

export type UserRole = 'student' | 'manager' | 'technician' | 'admin';

interface StoreState {
  // Auth & Session
  isAuthenticated: boolean;
  currentRole: UserRole;
  userName: string;
  userEmail: string;
  lang: 'VIE' | 'ENG';

  // Global Modals
  commandPaletteOpen: boolean;
  notificationDrawerOpen: boolean;
  toastMessage: string | null;

  // Student Modals & Floating
  aiChatOpen: boolean;
  reportFaultOpen: boolean;
  paymentOpen: boolean;
  rulesOpen: boolean;
  meterOpen: boolean;
  leaveOpen: boolean;

  // Admin Modals
  addUserOpen: boolean;
  backupOpen: boolean;
  tariffModalOpen: boolean;
  quickConfigOpen: boolean;
  ticketModalOpen: boolean;
  selectedAuditLog: AuditLog | null;

  // Mobile navigation drawer
  mobileMenuOpen: boolean;

  // Data
  stats: SystemStats;
  auditLogs: AuditLog[];
  tariffs: TariffItem[];
  securityAlerts: SecurityAlert[];
  studentInfo: StudentInfo;
  studentBills: StudentBill[];
  studentTickets: StudentTicket[];

  // Actions
  login: (role: UserRole, identifier?: string) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
  setLang: (lang: 'VIE' | 'ENG') => void;
  showToast: (msg: string) => void;
  hideToast: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setNotificationDrawerOpen: (open: boolean) => void;
  setAiChatOpen: (open: boolean) => void;
  setReportFaultOpen: (open: boolean) => void;
  setPaymentOpen: (open: boolean) => void;
  setRulesOpen: (open: boolean) => void;
  setMeterOpen: (open: boolean) => void;
  setLeaveOpen: (open: boolean) => void;
  setAddUserOpen: (open: boolean) => void;
  setBackupOpen: (open: boolean) => void;
  setTariffModalOpen: (open: boolean) => void;
  setQuickConfigOpen: (open: boolean) => void;
  setTicketModalOpen: (open: boolean) => void;
  setSelectedAuditLog: (log: AuditLog | null) => void;
  setTariffs: (tariffs: TariffItem[]) => void;

  // Async data actions
  loadAllData: () => Promise<void>;
  toggleLock: (logId: string) => Promise<void>;
  blockIp: (alertId: string, ip: string) => Promise<void>;
  payStudentBill: (billId: string, method?: string) => Promise<void>;
  createStudentTicket: (category: string, description: string) => Promise<void>;
}

export const useStore = create<StoreState>((set, get) => ({
  // Defaults
  isAuthenticated: true,
  currentRole: 'student',
  userName: 'Đặng Hoàng Nam',
  userEmail: 'nam.dh@student.vnu.edu.vn',
  lang: 'VIE',

  commandPaletteOpen: false,
  notificationDrawerOpen: false,
  toastMessage: null,

  aiChatOpen: false,
  reportFaultOpen: false,
  paymentOpen: false,
  rulesOpen: false,
  meterOpen: false,
  leaveOpen: false,

  addUserOpen: false,
  backupOpen: false,
  tariffModalOpen: false,
  quickConfigOpen: false,
  ticketModalOpen: false,
  selectedAuditLog: null,

  mobileMenuOpen: false,

  stats: {
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
  },
  auditLogs: [],
  tariffs: [],
  securityAlerts: [],

  studentInfo: {
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
  },
  studentBills: [],
  studentTickets: [],

  login: (role, identifier) => {
    let name = 'Đặng Hoàng Nam';
    let email = 'nam.dh@student.vnu.edu.vn';
    if (role === 'admin') {
      name = 'TS. Trần Minh Khoa';
      email = 'root@dorm.edu.vn';
    } else if (role === 'manager') {
      name = 'Nguyễn Văn Hoàng';
      email = 'hoang.nv@dorm.edu.vn';
    } else if (role === 'technician') {
      name = 'Nguyễn Văn Hùng';
      email = 'hung.nv@tech.dorm.edu.vn';
    } else if (identifier) {
      name = identifier.includes('@') ? identifier.split('@')[0] : identifier;
    }

    set({
      isAuthenticated: true,
      currentRole: role,
      userName: name,
      userEmail: email
    });
    get().showToast(`Đăng nhập thành công với vai trò ${role.toUpperCase()}!`);
  },

  logout: () => {
    set({ isAuthenticated: false });
    get().showToast('Đã đăng xuất khỏi hệ thống SmartDorm.');
  },

  setRole: (role) => {
    set({ currentRole: role });
  },

  setLang: (lang) => {
    set({ lang });
  },

  showToast: (msg) => {
    set({ toastMessage: msg });
    setTimeout(() => {
      if (get().toastMessage === msg) {
        set({ toastMessage: null });
      }
    }, 3500);
  },

  hideToast: () => set({ toastMessage: null }),

  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  setNotificationDrawerOpen: (open) => set({ notificationDrawerOpen: open }),
  setAiChatOpen: (open) => set({ aiChatOpen: open }),
  setReportFaultOpen: (open) => set({ reportFaultOpen: open }),
  setPaymentOpen: (open) => set({ paymentOpen: open }),
  setRulesOpen: (open) => set({ rulesOpen: open }),
  setMeterOpen: (open) => set({ meterOpen: open }),
  setLeaveOpen: (open) => set({ leaveOpen: open }),
  setAddUserOpen: (open) => set({ addUserOpen: open }),
  setBackupOpen: (open) => set({ backupOpen: open }),
  setTariffModalOpen: (open) => set({ tariffModalOpen: open }),
  setQuickConfigOpen: (open) => set({ quickConfigOpen: open }),
  setTicketModalOpen: (open) => set({ ticketModalOpen: open }),
  setSelectedAuditLog: (log) => set({ selectedAuditLog: log }),
  setTariffs: (tariffs) => set({ tariffs }),

  loadAllData: async () => {
    try {
      const [s, l, t, a, sInfo, sBills, sTickets] = await Promise.all([
        api.getStats(),
        api.getAuditLogs(),
        api.getTariffs(),
        api.getSecurityAlerts(),
        api.getStudentInfo(),
        api.getStudentBills(),
        api.getStudentTickets()
      ]);
      set({
        stats: s || get().stats,
        auditLogs: l?.items || get().auditLogs,
        tariffs: t || get().tariffs,
        securityAlerts: a || get().securityAlerts,
        studentInfo: sInfo || get().studentInfo,
        studentBills: sBills || get().studentBills,
        studentTickets: sTickets || get().studentTickets
      });
    } catch (e) {
      console.warn('Zustand loadAllData error', e);
    }
  },

  toggleLock: async (logId: string) => {
    await api.toggleLock(logId);
    await get().loadAllData();
    get().showToast('Đã cập nhật trạng thái khóa tài khoản!');
  },

  blockIp: async (alertId: string, ip: string) => {
    await api.blockIp(alertId, ip);
    set((state) => ({
      securityAlerts: state.securityAlerts.map((a) =>
        a.id === alertId ? { ...a, status: 'resolved', actionTaken: `Đã chặn IP ${ip} trên WAF` } : a
      )
    }));
    get().showToast(`Đã chặn vĩnh viễn IP ${ip} trên tường lửa WAF!`);
  },

  payStudentBill: async (billId: string, method: string = 'VNPay') => {
    await api.payBill(billId, method);
    set((state) => ({
      studentBills: state.studentBills.map((b) =>
        b.id === billId ? { ...b, status: 'paid', statusText: 'Đã nộp' } : b
      )
    }));
    get().showToast(`Thanh toán hóa đơn thành công qua ${method}!`);
  },

  createStudentTicket: async (category: string, description: string) => {
    const res = await api.createStudentTicket(category, description);
    if (res?.ticket) {
      set((state) => ({
        studentTickets: [res.ticket, ...state.studentTickets]
      }));
    }
    get().showToast('Đã gửi báo hỏng thiết bị tới kỹ thuật viên KTX!');
  }
}));
