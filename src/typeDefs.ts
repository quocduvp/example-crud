import { gql } from 'apollo-server-core';
import orderTypedef from './modules/orders/order.typedef';
import userTypedef from './modules/users/user.typedef';

export default gql`
  ${userTypedef}
  ${orderTypedef}
`;
