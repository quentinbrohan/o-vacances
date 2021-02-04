import { createSlice } from '@reduxjs/toolkit';
import { tripApi } from 'src/services/trip';
import { isCurrentUserTripCreator } from 'src/utils/trip';
import { getCurrentUserId } from 'src/utils/user';

const initialState = {
  isLoading: true,
  isCreator: false,
  isOwnUser: false,
  hasTripAccess: false,
  userDisponibilities: [],
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    // Immutable state created by Immer
    // https://redux-toolkit.js.org/tutorials/intermediate-tutorial#mutable-update-logic
    // https://github.com/immerjs/immer
    // https://immerjs.github.io/immer/docs/update-patterns
  },
  extraReducers: (builder) => {
    builder
      // getTripById
      .addMatcher(tripApi.endpoints.getTripById.matchFulfilled, (state, action) => {
        const { disponibility: disponibilities, creator } = action.payload.result;

        state.hasTripAccess = true;
        state.isCreator = isCurrentUserTripCreator(creator.id);
        // eslint-disable-next-line array-callback-return
        disponibilities.filter((disponibilityOfUser) => {
          if (disponibilityOfUser.users[0].id === getCurrentUserId()) {
            state.userDisponibilities = disponibilityOfUser;
          }
        });
      })
      // loginTrip
      .addMatcher(tripApi.endpoints.loginTrip.matchFulfilled, (state, action) => {
        const { disponibility: disponibilities, creator } = action.payload.result;

        state.hasTripAccess = true;
        state.isCreator = isCurrentUserTripCreator(creator.id);
        // eslint-disable-next-line array-callback-return
        disponibilities.filter((disponibilityOfUser) => {
          if (disponibilityOfUser.users[0].id === getCurrentUserId()) {
            state.userDisponibilities = disponibilityOfUser;
          }
        });
      })
      // addUserDisponibilities
      .addMatcher(tripApi.endpoints.addUserDisponibilities.matchFulfilled, (state, action) => {
        const { result } = action.payload;

        state.userDisponibilities = result;
      })
      // editUserDisponibilities
      .addMatcher(tripApi.endpoints.editUserDisponibilities.matchFulfilled, (state, action) => {
        const { result } = action.payload;

        state.userDisponibilities = result;
      });
  },
});

export default tripSlice.reducer;

// export const {} = tripSlice.actions;
