import {jwtDecode as decode} from 'jwt-decode';

export const jwtDecode = ({token}) => {
  try {
    const decodedToken = decode(token);

    const currentData = Date.now();

    const isTokenExpired = currentData > decodedToken.exp * 1000;

    return {success: true, isTokenExpired, decodedToken};
  } catch (err) {
    return {success: false, err};
  }
};
