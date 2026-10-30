import { MicroAppId } from '../types';

type EventHandler = (data?: any) => void;

class EventBus {
  private events: Record<string, EventHandler[]> = {};

  on(event: string, handler: EventHandler) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(handler);
    return () => this.off(event, handler);
  }

  off(event: string, handler: EventHandler) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(h => h !== handler);
  }

  emit(event: string, data?: any) {
    if (!this.events[event]) return;
    this.events[event].forEach(handler => handler(data));
  }
}

export const eventBus = new EventBus();

export const EVENTS = {
  NAVIGATE: 'mfe:navigate',
  OPEN_ADD_USER: 'modal:open_add_user',
  OPEN_BACKUP: 'modal:open_backup',
  OPEN_TARIFFS: 'modal:open_tariffs',
  OPEN_QUICK_CONFIG: 'modal:open_quick_config',
  OPEN_AUDIT_DETAIL: 'modal:open_audit_detail',
  OPEN_TICKET: 'modal:open_ticket',
  TRIGGER_SEARCH: 'search:trigger',
  SHOW_TOAST: 'ui:show_toast',
  REFRESH_LOGS: 'data:refresh_logs',
  REFRESH_STATS: 'data:refresh_stats',
  REFRESH_TARIFFS: 'data:refresh_tariffs'
};
