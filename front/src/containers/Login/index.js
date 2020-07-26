import { connect } from 'react-redux';

// === on importe le composant de présentation
import Login from 'src/components/Login';

import { updateUserField, logIn } from 'src/actions/user';

const mapStateToProps = (state) => ({

  email: state.user.email,
  password: state.user.password,
  isAuthenticated: state.user.isAuthenticated,
  error: state.error.error,
});

const mapDispatchToProps = (dispatch) => ({

  changeField: (newValue, name) => {
    dispatch(updateUserField(newValue, name));
  },
  handleLogin: () => {
    dispatch(logIn());
  },
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(Login);
