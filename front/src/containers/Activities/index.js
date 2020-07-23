import { connect } from 'react-redux';
import { deleteActivity } from 'src/actions/trip';

import Activities from 'src/components/Activities';

const mapStateToProps = (state) => ({
  activities: state.trip.trip.activities,
});

const mapDispatchToProps = (dispatch) => ({
  handleDelete: () => {
    dispatch(deleteActivity());
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
