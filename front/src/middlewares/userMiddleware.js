import axios from 'axios';

import {
  LOG_IN,
  saveUser,
} from 'src/actions/user';

const userMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case LOG_IN: {
      const { email, password } = store.getState().user;

      // withCredentials : autorisation d'accéder au cookie
      axios.post('http://localhost:8000/user', {
        email,
        password,
      }, {
        withCredentials: true,
      })
        .then((response) => {
          store.dispatch(saveUser(response.data.info, response.data.logged));
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }

    default:
      // on passe l'action au suivant (middleware suivant ou reducer)
      next(action);
  }
};
export default userMiddleware;
