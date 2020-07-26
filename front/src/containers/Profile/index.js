import { connect } from 'react-redux';

import { deleteDisabledInput, addImagePreview } from 'src/actions/settings';
import {
  fetchUser,
  editUser,
  updateUserField,
  editUserImage,
} from 'src/actions/user';

// === on importe le composant de présentation
import Profile from 'src/components/Profile';

const mapStateToProps = (state) => ({

  isDisabled: state.settings.isDisabled,
  email: state.user.email,
  password: state.user.password,
  info: state.user.info,
  lastname: state.user.lastname,
  firstname: state.user.firstname,
  avatar: state.user.avatar,
  file: state.settings.file,
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

  handleEditUserImage: () => {
    dispatch(editUserImage());
  },

  changeField: (newValue, name) => {
    dispatch(updateUserField(newValue, name));
  },

  addImagePreview: (url) => {
    dispatch(addImagePreview(url));
  },

});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
