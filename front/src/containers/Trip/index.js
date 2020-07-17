import { connect } from 'react-redux';

import Trip from 'src/components/Trip';

import {
  fetchTrip,
  saveTrip,
} from 'src/actions/trip';

const mapStateToProps = (state) => ({
  trip: state.trip.trip,
  isLoading: state.trip.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTrip: (tripId) => {
    dispatch(fetchTrip(tripId));
  },
  saveTrip: () => {
    dispatch(saveTrip());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Trip);
