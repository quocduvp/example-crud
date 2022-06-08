import { model, Schema, Types } from 'mongoose';
import { Order } from './order.model';

export interface User {
  _id: Types.ObjectId;
  fullName: string;
  phone: string;
  age: number;
  gender: string;
  orders?: [Order];
  totalAmount?: number; // total amount in orders
}

const UserSchema = new Schema<User>(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, min: 1, max: 130 },
    gender: String,
  },
  {
    timestamps: {
      createdAt: true,
    },
    strict: true,
  },
);

UserSchema.virtual('orders', {
  ref: 'orders',
  localField: '_id',
  foreignField: 'user',
});

export const UserModel = model<User>('users', UserSchema);
