export type PortalMode = 'student' | 'admin';

export type StudentAppId =
  | 'trang-chu-tong-quan'
  | 'thong-tin-ca-nhan'
  | 'phong-o-hien-tai'
  | 'dang-ky-chuyen-phong'
  | 'hop-dong-luu-tru'
  | 'hoa-don-thanh-toan'
  | 'bao-hong-phan-anh-su-co'
  | 'thong-bao'
  | 'lich-su-yeu-cau';

export interface Roommate {
  id: string;
  bed: string;
  name: string;
  role: string;
  faculty: string;
  phone: string;
  inRoom: boolean;
  isMe?: boolean;
}

export interface StudentInfo {
  fullName: string;
  studentId: string;
  faculty: string;
  className: string;
  cohort: string;
  phone: string;
  room: string;
  roomNumber: string;
  building: string;
  zone: string;
  bedSlot: string;
  isLeader: boolean;
  contract: {
    id: string;
    daysLeft: number;
    expiryDate: string;
    renewalStartDate: string;
  };
  roommates: Roommate[];
  roomSpecs: {
    airConditioner: string;
    waterHeater: string;
    electricMeter: string;
    waterMeter: string;
  };
}

export interface StudentBill {
  id: string;
  month: string;
  period: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid';
  statusText: string;
  electricKwh: number;
  waterM3: number;
}

export interface StudentTicket {
  id: string;
  title: string;
  category: string;
  timeSent: string;
  ktvName: string;
  ktvNote: string;
  status: 'in_progress' | 'completed';
  statusText: string;
  rating?: number;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  details?: {
    code?: string;
    wish?: string;
    status?: string;
    note?: string;
  };
}

export type MicroAppId =
  | 'overview'
  | 'account-management'
  | 'roles-permissions'
  | 'system-catalogs'
  | 'fee-tariffs'
  | 'audit-logs'
  | 'system-reports'
  | 'system-configuration'
  | 'security-alerts';

export interface AuditLog {
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

export interface SecurityAlert {
  id: string;
  severity: 'high' | 'medium' | 'info' | 'success';
  severityLabel: string;
  title: string;
  ip: string;
  actionTaken: string;
  timeAgo: string;
  status: 'active' | 'resolved';
}

export interface TariffItem {
  id: string;
  name: string;
  zone: string;
  price: number | string;
  unit: string;
  desc: string;
}

export interface SystemStats {
  accounts: {
    total: number;
    newThisWeek: number;
    students: number;
    studentsPercent: string;
    staff: number;
    technicians: number;
    admins: number;
  };
  occupancy: {
    occupied: number;
    totalSlots: number;
    rate: string;
    totalRooms: number;
    zones: string;
    availableRooms: number;
  };
  infrastructure: {
    uptime: string;
    uptimeDays: number;
    cluster: string;
    cpuLoad: number;
    ramUsed: string;
    ramPercent: number;
    dbQueries: string;
    apiLatency: string;
  };
  iot: {
    electricityMeters: { total: number; online: number; percent: string; disconnectedArea: string };
    waterMeters: { total: number; online: number; percent: string; warning: string };
    rfidGates: { total: number; online: number; percent: string; delay: string };
  };
  cronJobs: Array<{
    name: string;
    progress: number;
    note: string;
    status: string;
  }>;
}
