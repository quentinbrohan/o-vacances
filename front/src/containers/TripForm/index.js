import { connect } from 'react-redux';

import TripForm from 'src/components/TripForm';

import { newTrip } from 'src/actions/trip';

import { addImagePreview } from 'src/actions/settings';

const mapStateToProps = (state) => ({
  file: state.settings.file,

});

const mapDispatchToProps = (dispatch) => ({
  addImagePreview: (url) => {
    dispatch(addImagePreview(url));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TripForm);
