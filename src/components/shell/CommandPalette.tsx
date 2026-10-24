import React, { useState, useEffect } from 'react';
import { MicroAppId } from '../../core/types';
import { eventBus, EVENTS } from '../../core/bus';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: MicroAppId) => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: string;
  icon: string;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands: CommandItem[] = [
    {
      id: 'cmd-overview',
      title: 'Đi tới Tổng quan hệ thống',
      category: 'Điều hướng',
      icon: 'grid_view',
      action: () => { onNavigate('overview'); onClose(); }
    },
    {
      id: 'cmd-users',
      title: 'Quản lý tài khoản người dùng & sinh viên',
      category: 'Điều hướng',
      icon: 'manage_accounts',
      action: () => { onNavigate('account-management'); onClose(); }
    },
    {
      id: 'cmd-roles',
      title: 'Ma trận phân quyền & vai trò RBAC',
      category: 'Điều hướng',
      icon: 'admin_panel_settings',
      action: () => { onNavigate('roles-permissions'); onClose(); }
    },
    {
      id: 'cmd-tariffs',
      title: 'Danh mục biểu phí phòng, điện, nước',
      category: 'Điều hướng',
      icon: 'payments',
      action: () => { onNavigate('fee-tariffs'); onClose(); }
    },
    {
      id: 'cmd-audit',
      title: 'Tra cứu nhật ký kiểm toán hệ thống (Audit Trail)',
      category: 'Điều hướng',
      icon: 'receipt_long',
      action: () => { onNavigate('audit-logs'); onClose(); }
    },
    {
      id: 'cmd-security',
      title: 'Xem trung tâm cảnh báo an ninh & WAF',
      category: 'Điều hướng',
      icon: 'shield',
      action: () => { onNavigate('security-alerts'); onClose(); }
    },
    {
      id: 'act-add-user',
      title: '+ Thêm tài khoản mới (Sinh viên / Cán bộ)',
      category: 'Hành động nhanh',
      icon: 'person_add',
      action: () => { onClose(); eventBus.emit(EVENTS.OPEN_ADD_USER); }
    },
    {
      id: 'act-backup',
      title: 'Sao lưu cơ sở dữ liệu tức thì (Snapshot S3)',
      category: 'Hành động nhanh',
      icon: 'cloud_sync',
      action: () => { onClose(); eventBus.emit(EVENTS.OPEN_BACKUP); }
    },
    {
      id: 'act-tariffs-edit',
      title: 'Cập nhật bảng giá biểu phí học kỳ mới',
      category: 'Hành động nhanh',
      icon: 'price_change',
      action: () => { onClose(); eventBus.emit(EVENTS.OPEN_TARIFFS); }
    },
    {
      id: 'act-quick-config',
      title: 'Cấu hình nhanh tham số hệ thống & cụm K8s',
      category: 'Hành động nhanh',
      icon: 'tune',
      action: () => { onClose(); eventBus.emit(EVENTS.OPEN_QUICK_CONFIG); }
    }
  ];

  const filteredCommands = commands.filter(c =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search header */}
        <div className="flex items-center px-4 py-3.5 border-b border-surface-container-high gap-3">
          <span className="material-symbols-outlined text-primary text-[24px]">search</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Gõ lệnh tìm kiếm tài khoản, tác vụ, cài đặt..."
            className="w-full bg-transparent border-none outline-none text-on-surface text-base placeholder:text-outline"
            autoFocus
          />
          <kbd className="px-2 py-0.5 text-xs bg-surface-container-high rounded text-outline font-mono">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-2">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-on-surface-variant text-sm">
              Không tìm thấy lệnh hoặc chức năng phù hợp với &quot;{query}&quot;
            </div>
          ) : (
            <div className="space-y-1">
              {filteredCommands.map((cmd) => (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-surface-container-low text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-outline group-hover:text-primary text-[20px]">
                      {cmd.icon}
                    </span>
                    <div>
                      <div className="text-sm font-medium text-on-surface group-hover:text-primary">
                        {cmd.title}
                      </div>
                      <div className="text-[11px] text-outline">{cmd.category}</div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-outline text-[18px] opacity-0 group-hover:opacity-100 transition-opacity">
                    arrow_forward
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Footer hint */}
        <div className="px-4 py-2 bg-surface-container-low/70 border-t border-surface-container-high flex items-center justify-between text-xs text-outline">
          <span>SmartDorm Spotlight Search</span>
          <div className="flex items-center gap-2">
            <span>Dùng phím <kbd className="font-mono text-[10px] bg-white px-1.5 py-0.5 rounded border border-outline-variant/30">↑</kbd> <kbd className="font-mono text-[10px] bg-white px-1.5 py-0.5 rounded border border-outline-variant/30">↓</kbd> để di chuyển</span>
          </div>
        </div>
      </div>
    </div>
  );
};
