import { connect } from 'react-redux';

import Signin from 'src/components/Signin';

import { updateUserField, signIn } from 'src/actions/user';

const mapStateToProps = (state) => ({
  firstname: state.user.firstname,
  lastname: state.user.lastname,
  email: state.user.email,
  password: state.user.password,
  error: state.error.error,
  isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  changeField: (newValue, name) => {
    dispatch(updateUserField(newValue, name));
  },
  handleSignin: () => {
    dispatch(signIn());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
