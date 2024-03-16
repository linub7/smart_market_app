import { JwtPayload, jwtDecode } from 'jwt-decode';

import { grantAccessTokenHandler } from '@api/auth';
import { Keys, getFromAsyncStorage, saveToAsyncStorage } from './asyncStorage';

export const shouldRefreshToken = (token: string): boolean => {
  const decodedToken = jwtDecode<JwtPayload>(token);
  const expirationDate = decodedToken.exp! * 1000;
  return Date.now() > expirationDate;
};

export const getNewTokens = async () => {
  let newAccessToken = '';
  let newRefreshToken = '';
  const accessToken = await getFromAsyncStorage(Keys.AUTH_ACCESS_TOKEN);
  const refreshToken = await getFromAsyncStorage(Keys.AUTH_REFRESH_TOKEN);

  newAccessToken = accessToken!;
  newRefreshToken = refreshToken!;

  if (shouldRefreshToken(accessToken!)) {
    console.log('expire');
    const { err, data } = await grantAccessTokenHandler(refreshToken!);
    if (err) {
      console.log(err);
      return;
    }
    newAccessToken = data?.data?.tokens?.accessToken;
    newRefreshToken = data?.data?.tokens?.refreshToken;
    await saveToAsyncStorage(Keys.AUTH_ACCESS_TOKEN, newAccessToken);
    await saveToAsyncStorage(Keys.AUTH_REFRESH_TOKEN, newRefreshToken);
  }
  return { newAccessToken, newRefreshToken };
};
