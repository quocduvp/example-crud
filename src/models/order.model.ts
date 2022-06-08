import { model, Schema, Types } from 'mongoose';
import { User } from './user.model';

export interface Order {
  _id: Types.ObjectId;
  user: Types.ObjectId | User;
  code: string;
  amount: number;
  interestRate: number;
  accruedAmount: number[];
}

const OrderSchema = new Schema<Order>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    code: { type: String, required: true, unique: true },
    amount: { type: Number, required: true, min: 0 },
    interestRate: { type: Number, required: true, min: 0 },
    accruedAmount: [{ type: Number, min: 0 }],
  },
  { timestamps: true },
);

export const OrderModel = model<Order>('orders', OrderSchema);
