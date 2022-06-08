import OrderResolver from './modules/orders/order.resolver';
import UserResolver from './modules/users/user.resolver';
export default {
  Query: {
    ...UserResolver.Query,
    ...OrderResolver.Query,
  },
  Mutation: {
    ...UserResolver.Mutation,
    ...OrderResolver.Mutation,
  },
};
