import { connect } from 'react-redux';

import TripAuth from 'src/components/Trip/TripAuth';

import { checkTripAuth, updateTripFormField } from 'src/actions/trip';
import { logIn } from 'src/actions/user';

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  password: state.trip.password,
  email: state.trip.password,
});

const mapDispatchToProps = (dispatch) => ({
  changeField: (newValue, name) => {
    dispatch(updateTripFormField(newValue, name));
  },
  handleTripAuth: (tripId) => {
    dispatch(checkTripAuth(tripId));
  },
  handleLogin: () => {
    dispatch(logIn());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TripAuth);
