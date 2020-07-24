import { connect } from 'react-redux';
import { deleteActivity, checkActivity } from 'src/actions/trip';

import Activities from 'src/components/Activities';

const mapStateToProps = (state) => ({
  activities: state.trip.trip.activities,
  activityId: state.trip.activityId,
});

const mapDispatchToProps = (dispatch) => ({
  deleteActivity: () => {
    dispatch(deleteActivity());
  },

  checkActivityId: (id) => {
    dispatch(checkActivity(id));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
