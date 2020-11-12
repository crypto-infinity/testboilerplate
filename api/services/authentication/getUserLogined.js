import pkg from 'apollo-server-express';
import { verify } from '~/helpers/jwt.helper';
import { getUserById } from '~/repository/user.repository';

const { AuthenticationError } = pkg;

export default async function getUserLogined(bearerToken) {
  if (bearerToken) {
    try {
      const token = bearerToken.split(' ');
      if (!token[1] || token[0] !== 'Bearer') {
        return null;
      }
      const { user } = verify(token[1]);
      const userInfo = await getUserById(user.id);
      return {
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
      };
    } catch (error) {
      throw new AuthenticationError('Authentication failure');
    }
  }
  return null;
}