import orderService from './order.service';
// import userService from './user.service';

class OrderResolver {
  Query = {};
  Mutation = {};
  constructor() {
    this.Query = {
      listOrders: this.listOrders,
      getOrder: this.getOrder,
    };
    this.Mutation = {
      createOrder: this.create,
    };
  }
  private static _instance: OrderResolver;
  public static getInstance() {
    return this._instance || (this._instance = new this());
  }

  private async listOrders(parent: any, args: any) {
    const { user } = args;
    const orders = await orderService.list(user);
    return orders;
  }

  private async getOrder(parent: any, args: any) {
    const { _id } = args;
    const order = await orderService.details(_id);
    return order;
  }

  private async create(parent: any, args: any) {
    const { payload } = args;
    const newOrder = await orderService.create(payload);
    return newOrder;
  }
}

export default OrderResolver.getInstance();
