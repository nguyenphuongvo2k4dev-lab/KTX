import mongoose, { Schema, Document } from 'mongoose';

export interface ISecurityAlert extends Document {
  alertId: string;
  severity: 'high' | 'medium' | 'info' | 'success';
  severityLabel: string;
  title: string;
  ip: string;
  actionTaken: string;
  timeAgo: string;
  status: 'active' | 'resolved';
}

const SecurityAlertSchema = new Schema<ISecurityAlert>(
  {
    alertId: { type: String, required: true, unique: true },
    severity: {
      type: String,
      enum: ['high', 'medium', 'info', 'success'],
      required: true,
    },
    severityLabel: { type: String, required: true },
    title: { type: String, required: true },
    ip: { type: String, required: true },
    actionTaken: { type: String, required: true },
    timeAgo: { type: String, required: true },
    status: {
      type: String,
      enum: ['active', 'resolved'],
      default: 'active',
    },
  },
  { timestamps: true }
);

SecurityAlertSchema.index({ status: 1 });
SecurityAlertSchema.index({ severity: 1 });

export const SecurityAlert = mongoose.model<ISecurityAlert>('SecurityAlert', SecurityAlertSchema);
