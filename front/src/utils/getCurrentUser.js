import jwtDecode from 'jwt-decode';

export default () => {
  const token = window.localStorage.getItem('authToken');
  if (token) {
    const jwtData = jwtDecode(token);
    const currentUser = jwtData.userId;
    return currentUser;
  }
};
