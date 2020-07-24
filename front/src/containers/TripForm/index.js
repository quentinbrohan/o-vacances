import { connect } from 'react-redux';

import TripForm from 'src/components/TripForm';

import { addTrip, updateTripFormField } from 'src/actions/trip';

import { addImagePreview } from 'src/actions/settings';

const mapStateToProps = (state) => ({
  file: state.settings.file,
  title: state.trip.title,
  name: state.trip.name,
  description: state.trip.description,
  startDate: state.trip.startDate,
  endDate: state.trip.endDate,
  password: state.trip.password,
  location: state.trip.location,
});

const mapDispatchToProps = (dispatch) => ({
  addImagePreview: (url) => {
    dispatch(addImagePreview(url));
  },
  changeField: (newValue, name) => {
    dispatch(updateTripFormField(newValue, name));
  },
  handleTripForm: (formData) => {
    dispatch(addTrip(formData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TripForm);
