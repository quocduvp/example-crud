import { startApolloServer } from '../src/main';
import { ApolloServer } from 'apollo-server-express';
import request from 'supertest';

describe('e2e module user', () => {
  let server: ApolloServer;
  let url: string;
  const inputUser = {
    fullName: 'Test User',
    phone: '0963999999',
    age: 18,
    gender: 'MALE',
  };

  let user;
  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    ({ server, url } = await startApolloServer());
  });

  afterAll(async () => {
    await server?.stop();
  });

  test('should start apollo server', async () => {
    expect(server).toBeDefined();
  });

  test('Create new user', async () => {
    const response = await request(url)
      .post('/')
      .send({
        query: `mutation user($payload: CreateUserInput!) {
            createUser(
                payload: $payload
            ) {
                _id
                fullName
                phone
                age
                gender
            }
        }`,
        variables: {
          payload: inputUser,
        },
      });
    const newUser = response.body.data?.createUser;
    expect(newUser).toBeDefined();
    expect(newUser.fullName).toBe(inputUser.fullName);
    user = newUser;
  });

  test('List users', async () => {
    const response = await request(url)
      .post('/')
      .send({
        query: `{
            listUsers {
                _id
                fullName
            }
        }`,
        variables: {},
      });
    expect(response.body.data?.listUsers).toBeDefined();
  });

  test('Get user', async () => {
    const response = await request(url)
      .post('/')
      .send({
        query: `query user($_id: ID!) {
            getUser(_id: $_id) {
                _id
                fullName
                phone
                age
                gender
            }
        }`,
        variables: {
          _id: user._id,
        },
      });
    expect(response.body.data?.getUser).toBeDefined();
  });

  test('Create new order', async () => {
    const response = await request(url)
      .post('/')
      .send({
        query: `mutation order($payload: CreateOrderInput!) {
            createOrder(
                payload: $payload
            ) {
                _id
                user
                code
                amount
                interestRate
                accruedAmount
            }
        }`,
        variables: {
          payload: {
            user: user._id,
            amount: 100,
            interestRate: 0.05,
          },
        },
      });
    const newOrder = response.body.data?.createOrder;
    expect(newOrder).toBeDefined();
    expect(newOrder.user).toBeDefined();
    expect(newOrder.amount >= 0).toEqual(true);
    expect(newOrder.code.length).toEqual(5);
    expect(newOrder.accruedAmount.length).toEqual(12);
  });
});
