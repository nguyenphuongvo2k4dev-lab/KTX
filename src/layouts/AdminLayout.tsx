import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Sidebar as AdminSidebar } from '../components/shell/Sidebar';
import { TopHeader as AdminTopHeader } from '../components/shell/TopHeader';
import { CommandPalette } from '../components/shell/CommandPalette';
import { NotificationDrawer } from '../components/shell/NotificationDrawer';
import { AddUserModal } from '../components/modals/AddUserModal';
import { BackupModal } from '../components/modals/BackupModal';
import { TariffEditModal } from '../components/modals/TariffEditModal';
import { AuditDetailModal } from '../components/modals/AuditDetailModal';
import { QuickConfigModal } from '../components/modals/QuickConfigModal';
import { MaintenanceTicketModal } from '../components/modals/MaintenanceTicketModal';
import { MicroAppId } from '../core/types';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    mobileMenuOpen,
    setMobileMenuOpen,
    commandPaletteOpen,
    setCommandPaletteOpen,
    notificationDrawerOpen,
    setNotificationDrawerOpen,
    addUserOpen,
    setAddUserOpen,
    backupOpen,
    setBackupOpen,
    tariffModalOpen,
    setTariffModalOpen,
    quickConfigOpen,
    setQuickConfigOpen,
    ticketModalOpen,
    setTicketModalOpen,
    selectedAuditLog,
    setSelectedAuditLog,
    tariffs,
    setTariffs,
    securityAlerts,
    blockIp,
    toggleLock,
    loadAllData,
    setRole
  } = useStore();

  const pathToAdminId = (path: string): MicroAppId => {
    if (path.includes('/accounts')) return 'account-management';
    if (path.includes('/roles')) return 'roles-permissions';
    if (path.includes('/catalogs')) return 'system-catalogs';
    if (path.includes('/tariffs')) return 'fee-tariffs';
    if (path.includes('/audit')) return 'audit-logs';
    if (path.includes('/reports')) return 'system-reports';
    if (path.includes('/config')) return 'system-configuration';
    if (path.includes('/security')) return 'security-alerts';
    return 'overview';
  };

  const adminIdToPath = (id: MicroAppId): string => {
    switch (id) {
      case 'account-management': return '/admin/accounts';
      case 'roles-permissions': return '/admin/roles';
      case 'system-catalogs': return '/admin/catalogs';
      case 'fee-tariffs': return '/admin/tariffs';
      case 'audit-logs': return '/admin/audit';
      case 'system-reports': return '/admin/reports';
      case 'system-configuration': return '/admin/config';
      case 'security-alerts': return '/admin/security';
      default: return '/admin/overview';
    }
  };

  const activeAlertsCount = securityAlerts.filter(a => a.status === 'active').length;

  return (
    <div className="min-h-screen bg-background font-sans text-on-surface antialiased">
      {/* Admin Sidebar */}
      <AdminSidebar
        currentPath={pathToAdminId(location.pathname)}
        onNavigate={(id) => {
          navigate(adminIdToPath(id));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        alertCount={activeAlertsCount}
      />

      {/* Admin Top Header */}
      <AdminTopHeader
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onToggleNotifications={() => setNotificationDrawerOpen(!notificationDrawerOpen)}
        notificationCount={activeAlertsCount}
      />

      {/* Main Outlet */}
      <div className="lg:pl-72 min-h-screen flex flex-col">
        <main className="w-full pt-16 px-4 sm:px-6 lg:px-8 py-6 flex-1 max-w-[1600px]">


          <Outlet />
        </main>
      </div>

      {/* Modals & Drawers */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={(id) => navigate(adminIdToPath(id))}
      />

      <NotificationDrawer
        isOpen={notificationDrawerOpen}
        onClose={() => setNotificationDrawerOpen(false)}
        alerts={securityAlerts}
        onBlockIp={blockIp}
        onViewAllSecurity={() => navigate('/admin/security')}
      />

      <AddUserModal
        isOpen={addUserOpen}
        onClose={() => setAddUserOpen(false)}
        onUserAdded={loadAllData}
      />

      <BackupModal
        isOpen={backupOpen}
        onClose={() => setBackupOpen(false)}
      />

      <TariffEditModal
        isOpen={tariffModalOpen}
        onClose={() => setTariffModalOpen(false)}
        tariffs={tariffs}
        onTariffsUpdated={setTariffs}
      />

      <AuditDetailModal
        log={selectedAuditLog}
        onClose={() => setSelectedAuditLog(null)}
        onToggleLock={async (id) => {
          await toggleLock(id);
          setSelectedAuditLog(null);
        }}
      />

      <QuickConfigModal
        isOpen={quickConfigOpen}
        onClose={() => setQuickConfigOpen(false)}
      />

      <MaintenanceTicketModal
        isOpen={ticketModalOpen}
        onClose={() => setTicketModalOpen(false)}
      />
    </div>
  );
};
