import mongoose, { Schema, Document } from 'mongoose';

export interface ITicket extends Document {
  ticketId: string;
  studentId: string;
  title: string;
  category: string;
  timeSent: string;
  ktvName: string;
  ktvNote: string;
  status: 'in_progress' | 'completed';
  statusText: string;
  rating?: number;
}

const TicketSchema = new Schema<ITicket>(
  {
    ticketId: { type: String, required: true, unique: true },
    studentId: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    timeSent: { type: String, required: true },
    ktvName: { type: String, default: 'Ban Kỹ thuật KTX' },
    ktvNote: { type: String, default: '' },
    status: { type: String, enum: ['in_progress', 'completed'], default: 'in_progress' },
    statusText: { type: String, default: 'Đang tiếp nhận' },
    rating: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true }
);

TicketSchema.index({ studentId: 1, status: 1 });

export const Ticket = mongoose.model<ITicket>('Ticket', TicketSchema);
