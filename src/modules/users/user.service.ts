import { IUserInput } from '../../types/user.type';
import { validatePhoneNumber } from '../../utils/validation';
import { UserModel } from '../../models/user.model';
import { GENDER } from '../../constants';

class UserService {
  private static _instance: UserService;
  public static getInstance() {
    return this._instance || (this._instance = new this());
  }

  async list() {
    const users = await UserModel.find({}, null, {
      sort: '-createdAt',
      populate: {
        path: 'orders',
        select: 'amount',
      },
    });
    const userObjs = users.map((user) => {
      const userObj = user.toJSON({
        virtuals: true,
      });
      userObj.totalAmount = user.orders.reduce((a, b) => {
        return a + b.amount;
      }, 0);
      return userObj;
    });
    return userObjs;
  }

  async details(_id: string) {
    const user = await UserModel.findOne({
      _id,
    }).populate('orders', 'amount');
    if (!user) {
      return null;
    }
    const userObj = user.toJSON({
      virtuals: true,
    });
    userObj.totalAmount = user.orders.reduce((a, b) => {
      return a + b.amount;
    }, 0);
    return userObj;
  }

  async create(payload: IUserInput) {
    const user = new UserModel();
    user.fullName = payload.fullName;
    user.phone = await validatePhoneNumber(payload.phone);
    if (payload.age) {
      user.age = payload.age;
    }
    user.gender =
      payload.gender || GENDER[payload.gender]
        ? GENDER[payload.gender]
        : GENDER.OTHER;
    return await user.save();
  }

  async update(_id: string, payload: IUserInput) {
    const user = await UserModel.findOne({
      _id,
    });
    if (!user) {
      throw new Error('User not found');
    }
    if (payload.fullName) {
      user.fullName = payload.fullName;
    }
    if (payload.phone) {
      user.phone = await validatePhoneNumber(payload.phone);
    }
    if (payload.age) {
      user.age = payload.age;
    }
    if (payload.gender) {
      user.gender = GENDER[payload.gender]
        ? GENDER[payload.gender]
        : GENDER.OTHER;
    }
    return await user.save();
  }
}

export default UserService.getInstance();
