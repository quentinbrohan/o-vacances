import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const authenticate = () => {
  const email = 'quentin@gmail.com';
  const password = 'quentin';
  return axios
    .post('http://localhost:8000/api/login_check', {
      password,
      email,
    }, {
      withCredentials: true,
    // config,
    })
    .then((response) => response.data.token)
    .then((token) => {
      window.localStorage.setItem('authToken', token);
      axios.defaults.headers.Authorization = `Bearer + ${token}`;
    })
    .catch((error) => {
      console.warn(error);
    });
};

export const logOutUser = () => {
  window.localStorage.removeItem('authToken');
  delete axios.defaults.headers.Authorization;
};

export const checkAuth = () => {
// Check if token exist
  const token = window.localStorage.getItem('authToken');
  // If token still valid
  if (token) {
    const jwtData = jwtDecode(token);
    if (jwtData.exp * 1000 > new Date().getTime()) {
      axios.defaults.headers.Authorization = `Bearer + ${token}`;
      console.log('Token valide');
      // console.log(axios.defaults.headers.Authorization);
    }
    else {
      logOutUser();
    }
  }
};
