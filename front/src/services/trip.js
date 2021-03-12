import { createApi, fetchBaseQuery } from '@rtk-incubator/rtk-query';
import { API_URL } from 'src/constants';
import { headersFormData } from 'src/services';
import LocalStorageUtil from 'src/utils/LocalStorageUtil';
import { getCurrentUserId, isAuthTokenStillValid } from 'src/utils/user';

export const localStorageUtil = new LocalStorageUtil();

const getBase64 = (file) => new Promise((resolve) => {
  // let fileInfo;
  let baseURL = '';
  // Make new FileReader
  const reader = new FileReader();

  // Convert the file to base64 text
  reader.readAsDataURL(file);

  // on reader load somthing...
  reader.onload = () => {
    // Make a fileInfo Object
    baseURL = reader.result;
    resolve(baseURL);
  };
  // console.log(fileInfo);
});

// Define a service using a base URL and expected endpoints
export const tripApi = createApi({
  reducerPath: 'tripApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/v0/`,
    prepareHeaders: (headers) => {
      const token = localStorageUtil.getFromLocalStorage('authToken');

      if (isAuthTokenStillValid(token)) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  entityTypes: ['Trip', 'Activity', 'Suggestion', 'Disponibility'],
  endpoints: (build) => ({
    // Trip
    getTripsByUserId: build.query({
      query: () => `users/${getCurrentUserId()}/trips/`,
      provides: (result) => [
        ...result.trip.map(({ id }) => ({ type: 'Trip', id })),
        { type: 'Trip', id: 'LIST' },
      ],
    }),
    getTripById: build.query({
      query: (tripId) => `users/${getCurrentUserId()}/trips/${tripId}`,
      provides: (_, id) => [{ type: 'Trip', id }],
    }),
    loginTrip: build.mutation({
      query: (formValues) => {
        const { tripId, password } = formValues;

        return {
          url: `users/${getCurrentUserId()}/trips/${tripId}`,
          method: 'POST',
          body: { password },
        };
      },
      onSuccess({ tripId }, { dispatch }, result) {
        dispatch(
          tripApi.util.updateQueryResult('getTripById', tripId, (draft) => draft.push(result)),
        );
      },
    }),
    addTrip: build.mutation({
      query: (formValues) => {
        const {
          title,
          description,
          location,
          startDate,
          endDate,
          password,
          tripImageInput,
        } = formValues;

        return {
          url: `users/${getCurrentUserId()}/trips`,
          method: 'POST',
          body: {
            title,
            description,
            location,
            startDate,
            endDate,
            password,
            image: tripImageInput,
          },
        };
      },
      onSuccess(_, { dispatch }, result) {
        dispatch(
          tripApi.util.updateQueryResult('getTripsByUserId', _, (draft) => {
            draft.push(result);
          }),
        );
      },
      invalidates: [{ type: 'Trip', id: 'LIST' }],
    }),
    editTrip: build.mutation({
      query: (formValues) => {
        const {
          tripId,
          title,
          description,
          location,
          startDate,
          endDate,
          password,
          tripImageInput,
        } = formValues;

        // console.log({ tripImageInput });
        // const fileAsBase64 = (tripImageInput !== undefined && URL.createObjectURL(tripImageInput[0])) || null;
        // console.log({ fileAsBase64 });

        // const form = {
        //   title,
        //   description,
        //   location,
        //   startDate,
        //   endDate,
        //   password,
        //   image: tripImageInput,
        // };

        // const json = JSON.stringify(form);

        // const formData = new FormData();
        // formData.append('document', json);
        // if (tripImageInput) {
        //   formData.append('file', tripImageInput[0]);
        // }

        // // TODO: FIXME: Argument 1 passed to Symfony\Component\Serializer\Serializer::decode() must be of the type string, null given,
        return {
          url: `users/${getCurrentUserId()}/trips/${tripId}`,
          method: 'PATCH',
          body: {
            title,
            description,
            location,
            startDate,
            endDate,
            password,
            image: tripImageInput,
          },
          // headers: headersFormData,
        };
      },
      onSuccess({ tripId }, { dispatch }, result) {
        dispatch(
          tripApi.util.updateQueryResult('getTripById', tripId, (draft) => ({
            ...draft,
            ...result,
          })),
        );
      },
      invalidates: (_, id) => [{ type: 'Trip', id }],
    }),
    deleteTrip: build.mutation({
      query: (formValues) => {
        const { tripId } = formValues;

        return {
          url: `users/${getCurrentUserId()}/trips/${tripId}`,
          method: 'DELETE',
        };
      },
      onSuccess({ tripId }, { dispatch }) {
        dispatch(
          tripApi.util.updateQueryResult('getTripsByUserId', tripId, (draft) => draft.filter((trip) => trip.id !== tripId)),
        );
      },
      invalidates: (_, id) => [{ type: 'Trip', id }],
    }),
    // Disponibility
    addUserDisponibilities: build.mutation({
      query: (formValues) => {
        const { startDate, endDate, tripId } = formValues;

        return {
          url: `users/${getCurrentUserId()}/disponibilities`,
          method: 'POST',
          body: {
            startDate,
            endDate,
            trip: tripId,
          },
        };
      },
      invalidates: ['Suggestion'],
    }),
    editUserDisponibilities: build.mutation({
      query: (formValues) => {
        const {
          startDate, endDate, tripId, userDisponibilitiesId,
        } = formValues;

        return {
          url: `users/${getCurrentUserId()}/disponibilities/${userDisponibilitiesId}`,
          method: 'PATCH',
          body: {
            startDate,
            endDate,
            trip: tripId,
          },
        };
      },
      invalidates: (_, id) => [{ type: 'Disponibility', id }],
    }),
    // Activity
    // FormInput Controlled Select
    getActivitiesCategories: build.query({
      query: () => '/categories',
    }),
    getActivitiesByTripId: build.query({
      query: (tripId) => `/trips/${tripId}/activities`,
      provides: (result) => [
        ...result.map(({ id }) => ({ type: 'Activity', id })),
        { type: 'Activity', id: 'LIST' },
      ],
    }),
    addActivity: build.mutation({
      query: (formValues) => {
        const {
          tripId, title, category, description, startDate, endDate,
        } = formValues;

        return {
          url: `trips/${tripId}/activities`,
          method: 'POST',
          body: {
            title,
            category,
            description,
            startDate,
            endDate,
            trip: tripId,
            creator: getCurrentUserId(),
          },
        };
      },
      onSuccess({ tripId }, { dispatch }, result) {
        dispatch(
          tripApi.util.updateQueryResult('getActivitiesByTripId', tripId, (draft) => {
            draft.push(result);
          }),
        );
      },
      invalidates: [{ type: 'Activity', id: 'LIST' }],
    }),
    editActivity: build.mutation({
      query: (formValues) => {
        const {
          tripId, activityId, title, category, description, startDate, endDate,
        } = formValues;
        return {
          url: `trips/${tripId}/activities/${activityId}/edit`,
          method: 'PATCH',
          body: {
            title,
            category,
            description,
            startDate,
            endDate,
            trip: tripId,
            creator: getCurrentUserId(),
          },
        };
      },
      onSuccess({ tripId, activityId }, { dispatch }, result) {
        dispatch(
          tripApi.util.updateQueryResult('getActivitiesByTripId', tripId, (draft) => draft.map((activity) => (activity.id === activityId
            ? { ...result, createdAt: new Date().toISOString() }
            : activity))),
        );
      },
      invalidates: (_, id) => [{ type: 'Activity', id }],
    }),
    deleteActivity: build.mutation({
      query: (formValues) => {
        const { tripId, activityId } = formValues;

        return {
          url: `users/${getCurrentUserId()}/trips/${tripId}/activities/${activityId}/delete`,
          method: 'DELETE',
        };
      },
      onSuccess({ tripId, activityId }, { dispatch }) {
        dispatch(
          tripApi.util.updateQueryResult('getActivitiesByTripId', tripId, (draft) => draft.filter((activity) => activity.id !== activityId)),
        );
      },
      invalidates: (_, id) => [{ type: 'Activity', id }],
    }),
    // Suggestion
    getSuggestionsByTripId: build.query({
      query: (tripId) => `/trips/${tripId}/suggestions`,
      provides: (result) => [
        ...result.map(({ id }) => ({ type: 'Suggestion', id })),
        { type: 'Suggestion', id: 'LIST' },
      ],
    }),
    addSuggestion: build.mutation({
      query: (formValues) => {
        const { tripId, title, description } = formValues;

        return {
          url: `trips/${tripId}/suggestions/new`,
          method: 'POST',
          body: {
            title,
            description,
            trip: tripId,
            user: getCurrentUserId(),
          },
        };
      },
      onSuccess({ tripId }, { dispatch }, result) {
        dispatch(
          tripApi.util.updateQueryResult('getSuggestionsByTripId', tripId, (draft) => {
            draft.push({
              ...result,
              createdAt: new Date().toISOString(),
            });
          }),
        );
      },
      invalidates: [{ type: 'Suggestion', id: 'LIST' }],
    }),
    editSuggestion: build.mutation({
      query: (formValues) => {
        const {
          tripId, suggestionId, title, description,
        } = formValues;

        return {
          url: `users/${getCurrentUserId()}/trips/${tripId}/suggestions/${suggestionId}`,
          method: 'PATCH',
          body: {
            title,
            description,
            trip: tripId,
            creator: getCurrentUserId(),
          },
        };
      },
      onSuccess({ tripId, suggestionId }, { dispatch }, result) {
        dispatch(
          tripApi.util.updateQueryResult('getSuggestionsByTripId', tripId, (draft) => draft.map((suggestion) => (suggestion.id === suggestionId
            ? { ...result, createdAt: new Date().toISOString() }
            : suggestion))),
        );
      },
      invalidates: (_, id) => [{ type: 'Suggestion', id }],
    }),
    deleteSuggestion: build.mutation({
      query: (formValues) => {
        const { tripId, suggestionId } = formValues;

        return {
          url: `users/${getCurrentUserId()}/trips/${tripId}/suggestions/${suggestionId}/delete`,
          method: 'DELETE',
        };
      },
      onSuccess({ tripId, suggestionId }, { dispatch }) {
        dispatch(
          tripApi.util.updateQueryResult('getSuggestionsByTripId', tripId, (draft) => draft.filter((suggestion) => suggestion.id !== suggestionId)),
        );
      },
      invalidates: (_, id) => [{ type: 'Suggestion', id }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  // Trip
  useGetTripsByUserIdQuery,
  useGetTripByIdQuery,
  useLoginTripMutation,
  useAddTripMutation,
  useEditTripMutation,
  useDeleteTripMutation,
  // Disponibility
  useAddUserDisponibilitiesMutation,
  useEditUserDisponibilitiesMutation,
  // Activity
  useGetActivitiesCategoriesQuery,
  useGetActivitiesByTripIdQuery,
  useAddActivityMutation,
  useEditActivityMutation,
  useDeleteActivityMutation,
  // Suggestion
  useGetSuggestionsByTripIdQuery,
  useAddSuggestionMutation,
  useEditSuggestionMutation,
  useDeleteSuggestionMutation,
} = tripApi;
export const {
  endpoints: {
    // Trip
    getTripsByUserId,
    getTripById,
    loginTrip,
    addTrip,
    editTrip,
    deleteTrip,
    // Disponibility
    addUserDisponibilities,
    editUserDisponibilities,
    // Activity
    getActivitiesCategories,
    getActivitiesByTripId,
    addActivity,
    editActivity,
    deleteActivity,
    // Suggestion
    getSuggestionsByTripId,
    addSuggestion,
    editSuggestion,
    deleteSuggestion,
  },
} = tripApi;
