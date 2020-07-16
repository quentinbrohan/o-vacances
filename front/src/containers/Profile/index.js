import { connect } from 'react-redux';

import { deleteDisabledInput } from 'src/actions/settings';
import { fetchUser, editUser, updateUserField } from 'src/actions/user';

// === on importe le composant de présentation
import Profile from 'src/components/Profile';

const mapStateToProps = (state) => ({

  isDisabled: state.settings.isDisabled,
  email: state.user.email,
  password: state.user.password,
  info: state.user.info,

});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({

  deleteDisabledInput: (status) => {
    dispatch(deleteDisabledInput(status));
  },

  fetchUser: () => {
    dispatch(fetchUser());
  },

  handleEditUser: () => {
    dispatch(editUser());
  },

  changeField: (newValue, name) => {
    dispatch(updateUserField(newValue, name));
  },
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
