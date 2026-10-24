import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { StudentSidebar } from '../components/student/StudentSidebar';
import { StudentHeader } from '../components/student/StudentHeader';
import { StudentAiChatDrawer } from '../components/student/StudentAiChatDrawer';
import { StudentReportFaultModal } from '../components/modals/StudentReportFaultModal';
import { StudentPaymentModal } from '../components/modals/StudentPaymentModal';
import { StudentRoomRulesModal } from '../components/modals/StudentRoomRulesModal';
import { StudentMeterModal } from '../components/modals/StudentMeterModal';
import { StudentOvernightLeaveModal } from '../components/modals/StudentOvernightLeaveModal';

export const StudentLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    mobileMenuOpen,
    setMobileMenuOpen,
    aiChatOpen,
    setAiChatOpen,
    reportFaultOpen,
    setReportFaultOpen,
    paymentOpen,
    setPaymentOpen,
    rulesOpen,
    setRulesOpen,
    meterOpen,
    setMeterOpen,
    leaveOpen,
    setLeaveOpen,
    loadAllData,
    setRole
  } = useStore();

  // Map route to sidebar item
  const pathToNavId = (path: string): any => {
    if (path.includes('/profile')) return 'thong-tin-ca-nhan';
    if (path.includes('/room')) return 'phong-o-hien-tai';
    if (path.includes('/transfer')) return 'dang-ky-chuyen-phong';
    if (path.includes('/contract')) return 'hop-dong-luu-tru';
    if (path.includes('/bills')) return 'hoa-don-thanh-toan';
    if (path.includes('/faults')) return 'bao-hong-phan-anh-su-co';
    if (path.includes('/notifications')) return 'thong-bao';
    if (path.includes('/history')) return 'lich-su-yeu-cau';
    return 'trang-chu-tong-quan';
  };

  const navIdToPath = (id: string): string => {
    switch (id) {
      case 'thong-tin-ca-nhan': return '/student/profile';
      case 'phong-o-hien-tai': return '/student/room';
      case 'dang-ky-chuyen-phong': return '/student/transfer';
      case 'hop-dong-luu-tru': return '/student/contract';
      case 'hoa-don-thanh-toan': return '/student/bills';
      case 'bao-hong-phan-anh-su-co': return '/student/faults';
      case 'thong-bao': return '/student/notifications';
      case 'lich-su-yeu-cau': return '/student/history';
      default: return '/student/overview';
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-on-surface antialiased">
      {/* Student Sidebar */}
      <StudentSidebar
        currentPath={pathToNavId(location.pathname)}
        onNavigate={(id) => {
          navigate(navIdToPath(id));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        onSwitchPortal={() => {
          setRole('admin');
          navigate('/admin/overview');
        }}
        onOpenRules={() => setRulesOpen(true)}
      />

      {/* Student Header */}
      <StudentHeader
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        onOpenNotifications={() => navigate('/student/notifications')}
        onSwitchPortal={() => {
          setRole('admin');
          navigate('/admin/overview');
        }}
      />

      {/* Main Outlet */}
      <div className="lg:pl-72 min-h-screen flex flex-col">
        <main className="w-full pt-16 px-4 sm:px-8 py-8 flex-1 max-w-[1600px]">
          <Outlet />
        </main>
      </div>

      {/* Floating AI Chat Assistant & Trigger FAB */}
      <StudentAiChatDrawer
        isOpen={aiChatOpen}
        onToggle={() => setAiChatOpen(!aiChatOpen)}
        onClose={() => setAiChatOpen(false)}
      />

      {/* Modals */}
      <StudentReportFaultModal
        isOpen={reportFaultOpen}
        onClose={() => setReportFaultOpen(false)}
        onTicketCreated={loadAllData}
      />

      <StudentPaymentModal
        isOpen={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        onPaymentSuccess={loadAllData}
      />

      <StudentRoomRulesModal
        isOpen={rulesOpen}
        onClose={() => setRulesOpen(false)}
      />

      <StudentMeterModal
        isOpen={meterOpen}
        onClose={() => setMeterOpen(false)}
      />

      <StudentOvernightLeaveModal
        isOpen={leaveOpen}
        onClose={() => setLeaveOpen(false)}
      />
    </div>
  );
};
