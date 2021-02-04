import { createApi, fetchBaseQuery } from '@rtk-incubator/rtk-query';
import { API_URL } from 'src/constants';
import { headersFormData } from 'src/services';
import LocalStorageUtil from 'src/utils/LocalStorageUtil';
import { getCurrentUserId, isAuthTokenStillValid } from 'src/utils/user';

export const localStorageUtil = new LocalStorageUtil();

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
    prepareHeaders: (headers) => {
      const token = localStorageUtil.getFromLocalStorage('authToken');
      if (isAuthTokenStillValid(token)) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  entityTypes: ['User'],
  endpoints: (build) => ({
    logIn: build.mutation({
      query: (credentials) => ({
        url: '/api/login_check',
        method: 'POST',
        body: credentials,
      }),
    }),
    signIn: build.mutation({
      query: (SigninCredentials) => ({
        url: '/users/register',
        method: 'POST',
        body: SigninCredentials,
        headers: {
          withCredentials: false,
        },
      }),
    }),
    getCurrentUserInfo: build.query({
      query: () => `/api/v0/users/${getCurrentUserId()}/profil`,
      provides: () => [{ type: 'User', id: getCurrentUserId() }],
    }),
    editUserInfo: build.mutation({
      query: (userInfo) => ({
        url: `/api/v0/users/${getCurrentUserId()}/edit`,
        method: 'PATCH',
        body: { ...userInfo, password: null },
      }),
    }),
    editUserAvatar: build.mutation({
      query: () => {
        const avatarInput = document.querySelector('#profileAvatarInput');
        const file = avatarInput.files[0];

        const formData = new FormData();
        formData.append('file', file);
        // TODO: FIXME: ERROR 500 - Notice: Undefined variable: fichier
        return {
          url: `/api/v0/users/${getCurrentUserId()}/upload`,
          method: 'PUT',
          body: formData,
          headers: headersFormData,
        };
      },
      onSuccess(_, { dispatch }, result) {
        dispatch(
          userApi.util.updateQueryResult('getCurrentUserInfo', _, (draft) => ({
            ...draft,
            ...result,
          })),
        );
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLogInMutation,
  useSignInMutation,
  useGetCurrentUserInfoQuery,
  useEditUserInfoMutation,
  useEditUserAvatarMutation,
} = userApi;

export const {
  endpoints: {
    logIn, signIn, getCurrentUserInfo, editUserInfo, editUserAvatar,
  },
} = userApi;
