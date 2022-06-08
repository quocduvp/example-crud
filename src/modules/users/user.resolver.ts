import userService from './user.service';

class UserResolver {
  Query = {};
  Mutation = {};
  constructor() {
    this.Query = {
      listUsers: this.listUsers,
      getUser: this.getUser,
    };
    this.Mutation = {
      createUser: this.create,
      updateUser: this.update,
    };
  }
  private static _instance: UserResolver;
  public static getInstance() {
    return this._instance || (this._instance = new this());
  }

  private async listUsers() {
    return userService.list();
  }

  private async getUser(parent: any, { _id }: any) {
    return userService.details(_id);
  }

  private async create(parent: any, args: any) {
    const { payload } = args;
    const newUser = await userService.create(payload);
    return newUser;
  }

  private async update(parent: any, args: any) {
    const { _id, payload } = args;
    const newUser = await userService.update(_id, payload);
    return newUser;
  }
}

export default UserResolver.getInstance();
