import { connect } from 'react-redux';

import TripForm from 'src/components/TripForm';

import { newTrip, updateTripFormField } from 'src/actions/trip';

import { addImagePreview } from 'src/actions/settings';

const mapStateToProps = (state) => ({
  file: state.settings.file,
  title: state.trip.title,
  description: state.trip.description,
  startDate: state.trip.startDate,
  endDate: state.trip.endDate,
  password: state.trip.password,
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
