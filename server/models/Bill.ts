import mongoose, { Schema, Document } from 'mongoose';

export interface IBill extends Document {
  billId: string;
  studentId: string;
  month: string;
  period: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid';
  statusText: string;
  electricKwh: number;
  waterM3: number;
}

const BillSchema = new Schema<IBill>(
  {
    billId: { type: String, required: true, unique: true },
    studentId: { type: String, required: true },
    month: { type: String, required: true },
    period: { type: String, default: '' },
    amount: { type: Number, required: true },
    dueDate: { type: String, required: true },
    status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
    statusText: { type: String, default: 'Chưa nộp' },
    electricKwh: { type: Number, default: 0 },
    waterM3: { type: Number, default: 0 },
  },
  { timestamps: true }
);

BillSchema.index({ studentId: 1, status: 1 });

export const Bill = mongoose.model<IBill>('Bill', BillSchema);
