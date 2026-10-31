import mongoose, { Schema, Document } from 'mongoose';

export interface IAuditLog extends Document {
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

const AuditLogSchema = new Schema<IAuditLog>(
  {
    time: { type: String, required: true },
    date: { type: String, required: true },
    user: {
      name: { type: String, required: true },
      role: { type: String, required: true },
      email: { type: String, required: true },
      avatarInitials: { type: String, default: '' },
      avatarBg: { type: String, default: '' },
    },
    action: { type: String, required: true },
    actionType: {
      type: String,
      enum: ['create', 'update_price', 'lock', 'perm', 'special'],
      required: true,
    },
    detail: { type: String, required: true },
    targetId: { type: String, required: true },
    ip: { type: String, required: true },
    device: { type: String, required: true },
    status: {
      type: String,
      enum: ['success', 'locked', 'approved'],
      default: 'success',
    },
    statusText: { type: String, required: true },
    payload: { type: Schema.Types.Mixed, default: null },
  },
  { timestamps: true }
);

// Indexes for filtering
AuditLogSchema.index({ 'user.role': 1 });
AuditLogSchema.index({ actionType: 1 });
AuditLogSchema.index({ createdAt: -1 });

export const AuditLog = mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
