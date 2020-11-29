import jwtDecode from 'jwt-decode';

// eslint-disable-next-line consistent-return
const getCurrentUser = () => {
  const token = window.localStorage.getItem('authToken');
  if (token) {
    const jwtData = jwtDecode(token);
    const currentUser = jwtData.userId;
    return currentUser;
  }
};

// eslint-disable-next-line import/prefer-default-export
export const currentUserId = getCurrentUser();
