import { connect } from 'react-redux';

import Trip from 'src/components/Trip';

import {
  fetchTrip,
  saveTrip,
  // updateUserDisponibilities,
  modifyUserDisponibilities,
  newUserDisponibilities,
  deleteTrip,
  fetchDisponibilities,
} from 'src/actions/trip';

const mapStateToProps = (state) => ({
  trip: state.trip.trip,
  isLoading: state.trip.isLoading,
  isCreator: state.trip.isCreator,
  isOwnUser: state.trip.isOwnUser,
  tripPassword: state.trip.tripPassword,
  userDisponibilities: state.trip.userDisponibilities,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTrip: (tripId) => {
    dispatch(fetchTrip(tripId));
  },
  fetchDisponibilities: (tripId) => {
    dispatch(fetchDisponibilities(tripId));
  },
  saveTrip: () => {
    dispatch(saveTrip());
  },
  // changeUserDisponibilities: (startDate, endDate) => {
  //   dispatch(updateUserDisponibilities(startDate, endDate));
  // },
  reviseUserDisponibilities: (startDate, endDate) => {
    dispatch(modifyUserDisponibilities(startDate, endDate));
  },
  addUserDisponibilities: (startDate, endDate) => {
    dispatch(newUserDisponibilities(startDate, endDate));
  },
  handleDelete: () => {
    dispatch(deleteTrip());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Trip);
