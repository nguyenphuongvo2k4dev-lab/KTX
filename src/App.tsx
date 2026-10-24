/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';

// Layouts
import { StudentLayout } from './layouts/StudentLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Pages
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

// Student Views
import { StudentOverviewApp } from './micro-apps/student-overview/StudentOverviewApp';
import {
  StudentProfileView,
  StudentRoomTransferView,
  StudentContractView,
  StudentBillsView,
  StudentFaultsView,
  StudentNotificationsView,
  StudentHistoryView
} from './micro-apps/student-overview/StudentSecondaryViews';

// Admin Views
import { OverviewApp as AdminOverviewApp } from './micro-apps/overview/OverviewApp';
import { AccountsApp } from './micro-apps/accounts/AccountsApp';
import { RolesApp } from './micro-apps/roles/RolesApp';
import { CatalogsApp } from './micro-apps/catalogs/CatalogsApp';
import { TariffsApp } from './micro-apps/tariffs/TariffsApp';
import { AuditApp } from './micro-apps/audit/AuditApp';
import { ReportsApp } from './micro-apps/reports/ReportsApp';
import { ConfigApp } from './micro-apps/config/ConfigApp';
import { SecurityApp } from './micro-apps/security/SecurityApp';

// Global Toast Banner
const GlobalToast: React.FC = () => {
  const { toastMessage, hideToast } = useStore();
  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-bottom-5 duration-200 border border-outline-variant/30 max-w-md">
      <span className="material-symbols-outlined text-[18px] text-secondary">info</span>
      <span>{toastMessage}</span>
      <button onClick={hideToast} className="ml-auto hover:opacity-80">
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  );
};

export default function App() {
  const {
    loadAllData,
    stats,
    auditLogs,
    tariffs,
    securityAlerts,
    setSelectedAuditLog,
    studentInfo,
    studentBills,
    studentTickets,
    setReportFaultOpen,
    setPaymentOpen,
    setRulesOpen,
    setMeterOpen,
    setLeaveOpen,
    blockIp
  } = useStore();

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  return (
    <BrowserRouter>
      <GlobalToast />
      <Routes>
        {/* Authentication Route (code_0e6eb243.html) */}
        <Route path="/login" element={<LoginPage />} />
        {/* Registration & Activation Route (code_2eb1172b.html) */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Student Portal Routes (code_e4ce4486.html) */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<Navigate to="/student/overview" replace />} />
          <Route
            path="overview"
            element={
              <StudentOverviewApp
                info={studentInfo}
                bills={studentBills}
                tickets={studentTickets}
                onOpenReportFault={() => setReportFaultOpen(true)}
                onOpenPayBill={() => setPaymentOpen(true)}
                onOpenRules={() => setRulesOpen(true)}
                onOpenMeter={() => setMeterOpen(true)}
                onOpenLeave={() => setLeaveOpen(true)}
              />
            }
          />
          <Route path="profile" element={<StudentProfileView info={studentInfo} />} />
          <Route
            path="room"
            element={
              <StudentOverviewApp
                info={studentInfo}
                bills={studentBills}
                tickets={studentTickets}
                onOpenReportFault={() => setReportFaultOpen(true)}
                onOpenPayBill={() => setPaymentOpen(true)}
                onOpenRules={() => setRulesOpen(true)}
                onOpenMeter={() => setMeterOpen(true)}
                onOpenLeave={() => setLeaveOpen(true)}
              />
            }
          />
          <Route path="transfer" element={<StudentRoomTransferView />} />
          <Route path="contract" element={<StudentContractView info={studentInfo} />} />
          <Route
            path="bills"
            element={
              <StudentBillsView
                bills={studentBills}
                onOpenPayBill={() => setPaymentOpen(true)}
              />
            }
          />
          <Route
            path="faults"
            element={
              <StudentFaultsView
                tickets={studentTickets}
                onOpenReportFault={() => setReportFaultOpen(true)}
              />
            }
          />
          <Route path="notifications" element={<StudentNotificationsView />} />
          <Route path="history" element={<StudentHistoryView tickets={studentTickets} />} />
        </Route>

        {/* Admin Console Routes (code_c9b2d1a9.html) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/overview" replace />} />
          <Route
            path="overview"
            element={
              <AdminOverviewApp
                stats={stats}
                auditLogs={auditLogs}
                tariffs={tariffs}
                securityAlerts={securityAlerts}
                onOpenAuditDetail={(log) => setSelectedAuditLog(log)}
                onRefreshLogs={loadAllData}
              />
            }
          />
          <Route path="accounts" element={<AccountsApp />} />
          <Route path="roles" element={<RolesApp />} />
          <Route path="catalogs" element={<CatalogsApp />} />
          <Route path="tariffs" element={<TariffsApp tariffs={tariffs} />} />
          <Route
            path="audit"
            element={
              <AuditApp
                auditLogs={auditLogs}
                onOpenAuditDetail={(log) => setSelectedAuditLog(log)}
                onRefreshLogs={loadAllData}
              />
            }
          />
          <Route path="reports" element={<ReportsApp />} />
          <Route path="config" element={<ConfigApp />} />
          <Route
            path="security"
            element={<SecurityApp alerts={securityAlerts} onBlockIp={blockIp} />}
          />
        </Route>

        {/* Default / Fallback: Go to Student Portal by default */}
        <Route path="/" element={<Navigate to="/student/overview" replace />} />
        <Route path="*" element={<Navigate to="/student/overview" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
