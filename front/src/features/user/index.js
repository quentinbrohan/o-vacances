import { createSlice } from '@reduxjs/toolkit';
import { tripApi } from 'src/services/trip';
import { userApi } from 'src/services/user';
import LocalStorageUtil from 'src/utils/LocalStorageUtil';

export const localStorageUtil = new LocalStorageUtil();

const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  avatar: '',
  info: {},
  role: ['ROLE_VISITOR'],
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Immutable state created by Immer
    // https://redux-toolkit.js.org/tutorials/intermediate-tutorial#mutable-update-logic
    // https://github.com/immerjs/immer
    LOG_IN_USER: (state) => {
      state.isAuthenticated = true;
    },
    LOG_OUT_USER: (state) => {
      state.isAuthenticated = false;
      state.role = initialState.role;
    },
  },
  extraReducers: (builder) => {
    builder
      // getTripsByUserId
      .addMatcher(tripApi.endpoints.getTripsByUserId.matchFulfilled, (state, action) => {
        const {
          firstname, lastname, email, avatar, info,
        } = action.payload.result;

        state.firstname = firstname;
        state.lastname = lastname;
        state.email = email;
        state.avatar = avatar;
        state.info = info;
        state.role = ['ROLE_USER'];
        state.isAuthenticated = true;
      })
      // Login
      .addMatcher(userApi.endpoints.logIn.matchFulfilled, (state, action) => {
        const { token } = action.payload.result;
        localStorageUtil.setInLocalStorage(token, 'authToken');
        state.isAuthenticated = true;
      })
      // CurrentUserInfo
      .addMatcher(userApi.endpoints.getCurrentUserInfo.matchFulfilled, (state, action) => {
        const {
          firstname, lastname, email, avatar, info, roles,
        } = action.payload.result;

        state.firstname = firstname;
        state.lastname = lastname;
        state.email = email;
        state.avatar = avatar;
        state.info = info;
        state.role = [...roles];
        state.isAuthenticated = true;
      })
      // EditUserInfo
      .addMatcher(userApi.endpoints.editUserInfo.matchFulfilled, (state, action) => {
        console.log('fulfilled', action);
        const { firstname, lastname, email } = action.payload.result;
        state.firstname = firstname;
        state.lastname = lastname;
        state.email = email;
      })
      // EditUserAvatar
      .addMatcher(userApi.endpoints.editUserAvatar.matchFulfilled, (state, action) => {
        console.log('fulfilled', action);
        const { avatar } = action.payload.result;
        state.avatar = avatar;
      });
  },
});

export default userSlice.reducer;

export const selectCurrentUser = (state) => state.user;

export const {
  LOG_IN_USER,
  LOG_OUT_USER,
} = userSlice.actions;

export const logInUser = () => (dispatch) => {
  dispatch(LOG_IN_USER());
};

export const logOutUser = () => (dispatch) => {
  localStorageUtil.removeLocalStorage('authToken');
  dispatch(LOG_OUT_USER());
};

// // TODO: Look RHF file upload
// export const editUserImage = () => (dispatch) => {
//   const imageInput = document.querySelector('#profile-field-input.profile-image');
//   const file = imageInput.files[0];

//   const formData = new FormData();

//   const config = {
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'multipart/form-data',
//     },
//   };

//   axios
//     .put(`${API_URL}/api/v0/users/${getCurrentUserId()}/upload`, formData, config)
//     .then((response) => {
//       console.log(response);
//       dispatch(TOAST_SUCCESS('Photo sauvegardée !'));
//       // save new avatar URL in store.
//       dispatch(SAVE_USER_IMAGE(response.data));
//     })
//     .catch((error) => {
//       console.warn(error);
//     });
// };
