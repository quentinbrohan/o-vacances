import { connect } from 'react-redux';

import TripAuth from 'src/components/TripAuth';

import { checkTripAuth, updateTripFormField } from 'src/actions/trip';

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  password: state.trip.password,
});

const mapDispatchToProps = (dispatch) => ({
  changeField: (newValue, name) => {
    dispatch(updateTripFormField(newValue, name));
  },
  handleTripAuth: (tripId) => {
    dispatch(checkTripAuth(tripId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TripAuth);
