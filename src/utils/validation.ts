import PhoneNumber from 'awesome-phonenumber';
import { PHONE_CODE, COUNTRY_CODE } from '../constants';

export const validatePhoneNumber = (phoneNumber: string) => {
  const phone = new PhoneNumber(phoneNumber, COUNTRY_CODE);
  if (!phone.isValid()) {
    throw new Error('Invalid phone number');
  }
  return phone.getNumber().replace(PHONE_CODE, '0');
};
