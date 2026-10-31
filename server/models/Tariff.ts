import mongoose, { Schema, Document } from 'mongoose';

export interface ITariff extends Document {
  tariffId: string;
  name: string;
  zone: string;
  price: number | string;
  unit: string;
  desc: string;
}

const TariffSchema = new Schema<ITariff>(
  {
    tariffId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    zone: { type: String, required: true },
    price: { type: Schema.Types.Mixed, required: true },
    unit: { type: String, required: true },
    desc: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Tariff = mongoose.model<ITariff>('Tariff', TariffSchema);
