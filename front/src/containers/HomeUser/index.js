import { connect } from 'react-redux';

import HomeUser from 'src/components/HomeUser';

import {
  fetchTrips,
  saveTrips,
} from 'src/actions/trip';

const mapStateToProps = (state) => ({
  trips: state.trip.trips,
  isLoading: state.trip.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTrips: () => {
    dispatch(fetchTrips());
  },
  saveTrips: () => {
    dispatch(saveTrips());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeUser);
