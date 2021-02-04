import jwtDecode from 'jwt-decode';
import LocalStorageUtil from './LocalStorageUtil';

export const localStorageUtil = new LocalStorageUtil();

// eslint-disable-next-line consistent-return
export const getCurrentUserId = () => {
  const token = localStorageUtil.getFromLocalStorage('authToken');
  if (token) {
    const jwtData = jwtDecode(token);
    const currentUser = jwtData.userId;
    return currentUser;
  }
  return null;
};

export const isAuthTokenStillValid = (token) => {
  if (token) {
    const jwtData = jwtDecode(token);
    // Check if JWT exp date > actual Date
    if (jwtData.exp * 1000 > new Date().getTime()) {
      // Fetch user
      return true;
    }
    return false;
  }
  return false;
};

// eslint-disable-next-line import/prefer-default-export
