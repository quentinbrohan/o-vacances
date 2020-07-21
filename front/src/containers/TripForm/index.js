import { connect } from 'react-redux';

import TripForm from 'src/components/TripForm';

import { newTrip, updateTripFormField } from 'src/actions/trip';

import { addImagePreview } from 'src/actions/settings';

const mapStateToProps = (state) => ({
  file: state.settings.file,
  newTrip: {
    title: state.trip.newTrip.title,
    description: state.trip.newTrip.description,
    startDate: state.trip.newTrip.startDate,
    endDate: state.trip.newTrip.endDate,
    password: state.trip.newTrip.password,
  },
});

const mapDispatchToProps = (dispatch) => ({
  addImagePreview: (url) => {
    dispatch(addImagePreview(url));
  },
  changeField: (newValue, name) => {
    dispatch(updateTripFormField(newValue, name));
  },
  handleTripForm: () => {
    // dispatch(newTrip(image?))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TripForm);
