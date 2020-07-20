import { connect } from 'react-redux';

import Trip from 'src/components/Trip';

import {
  fetchTrip,
  saveTrip,
  updateUserDisponibilities,
  modifyUserDisponibilities,
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
  saveTrip: () => {
    dispatch(saveTrip());
  },
  changeDisponibilities: (startDate, endDate) => {
    dispatch(updateUserDisponibilities(startDate, endDate));
  },
  reviseDisponibilities: () => {
    dispatch(modifyUserDisponibilities());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Trip);
