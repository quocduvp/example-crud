import { Types } from 'mongoose';
import { OrderModel } from '../../models/order.model';
import { ICreateOrder } from '../../types/order.type';

class OrderService {
  private static _instance: OrderService;
  public static getInstance() {
    return this._instance || (this._instance = new this());
  }

  async list(userId: string) {
    return OrderModel.find(
      {
        user: userId,
      },
      null,
      {
        sort: '-createdAt',
      },
    );
  }

  async details(_id: string) {
    return OrderModel.findOne({
      _id,
    });
  }

  async create(payload: ICreateOrder) {
    const order = new OrderModel();
    order.user = new Types.ObjectId(payload.user);
    order.code = await this.randomCode();
    order.amount = payload.amount;
    order.interestRate = payload.interestRate;
    order.accruedAmount = await this.calcAccruedAmount(
      order.interestRate,
      order.amount,
    );
    return order.save();
  }

  private async randomCode() {
    // limit 5 digit
    const randCode = String(
      Math.floor(Math.random() * (99999 - 10000)) + 10000,
    );
    // check uniqe value in DB
    const order = await OrderModel.findOne({ code: randCode });
    if (order) {
      return this.randomCode();
    }
    return randCode;
  }

  // calculate accrued amount per year
  private async calcAccruedAmount(interestRate: number, amount: number) {
    const accruedAmount = [];
    for (let i = 1; i <= 12; i++) {
      const A = amount * Math.pow(1 + interestRate / 100, i);
      accruedAmount.push(Math.floor(A));
    }
    return accruedAmount;
  }
}

export default OrderService.getInstance();
