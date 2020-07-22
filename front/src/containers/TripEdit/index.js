import { connect } from 'react-redux';

import TripEdit from 'src/components/TripEdit';

import { addImagePreview } from 'src/actions/settings';
import { updateTripEditField, modifyTrip } from 'src/actions/trip';

const mapStateToProps = (state) => ({
  file: state.settings.file,
  title: state.trip.trip.title,
  description: state.trip.trip.description,
  startDate: state.trip.trip.startDate,
  endDate: state.trip.trip.endDate,
  password: state.trip.trip.password,
  location: state.trip.trip.location,
  image: state.trip.trip.image,
});

const mapDispatchToProps = (dispatch) => ({
  addImagePreview: (url) => {
    dispatch(addImagePreview(url));
  },
  changeField: (newValue, name) => {
    dispatch(updateTripEditField(newValue, name));
  },
  handleTripEdit: () => {
    dispatch(modifyTrip());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TripEdit);
