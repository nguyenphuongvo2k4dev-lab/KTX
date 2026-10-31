import mongoose, { Schema, Document } from 'mongoose';

export interface IRoommate {
  id: string;
  bed: string;
  name: string;
  role: string;
  faculty: string;
  phone: string;
  inRoom: boolean;
  isMe?: boolean;
}

export interface IStudent extends Document {
  studentId: string;
  fullName: string;
  faculty: string;
  className: string;
  cohort: string;
  phone: string;
  email: string;
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
  roommates: IRoommate[];
  roomSpecs: {
    airConditioner: string;
    waterHeater: string;
    electricMeter: string;
    waterMeter: string;
  };
  role: 'student' | 'manager' | 'technician' | 'admin';
  status: 'active' | 'suspended' | 'pending';
  passwordHash: string;
}

const RoommateSchema = new Schema<IRoommate>(
  {
    id: String,
    bed: String,
    name: String,
    role: String,
    faculty: String,
    phone: String,
    inRoom: { type: Boolean, default: false },
    isMe: { type: Boolean, default: false },
  },
  { _id: false }
);

const StudentSchema = new Schema<IStudent>(
  {
    studentId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    faculty: { type: String, default: '' },
    className: { type: String, default: '' },
    cohort: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, required: true, unique: true },
    room: { type: String, default: '' },
    roomNumber: { type: String, default: '' },
    building: { type: String, default: '' },
    zone: { type: String, default: '' },
    bedSlot: { type: String, default: '' },
    isLeader: { type: Boolean, default: false },
    contract: {
      id: { type: String, default: '' },
      daysLeft: { type: Number, default: 0 },
      expiryDate: { type: String, default: '' },
      renewalStartDate: { type: String, default: '' },
    },
    roommates: { type: [RoommateSchema], default: [] },
    roomSpecs: {
      airConditioner: { type: String, default: '' },
      waterHeater: { type: String, default: '' },
      electricMeter: { type: String, default: '' },
      waterMeter: { type: String, default: '' },
    },
    role: {
      type: String,
      enum: ['student', 'manager', 'technician', 'admin'],
      default: 'student',
    },
    status: {
      type: String,
      enum: ['active', 'suspended', 'pending'],
      default: 'active',
    },
    passwordHash: { type: String, default: '' },
  },
  { timestamps: true }
);

StudentSchema.index({ studentId: 1 });
StudentSchema.index({ email: 1 });
StudentSchema.index({ role: 1, status: 1 });

export const Student = mongoose.model<IStudent>('Student', StudentSchema);
