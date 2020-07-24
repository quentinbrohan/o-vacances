import { connect } from 'react-redux';

import ActivityEdit from 'src/components/ActivityEdit';

import { updateActivityField, editActivity, checkActivity } from 'src/actions/trip';

const mapStateToProps = (state) => ({
  activities: state.trip.trip.activities,
  activityTitle: state.trip.activityTitle,
  activityDescritption: state.trip.activityDescription,
  activityStartDate: state.trip.activityStartDate,
  activityEndDate: state.trip.activityEndDate,
  activityCategory: state.trip.activityCategory,
  activityId: state.trip.activityId,
});

const mapDispatchToProps = (dispatch) => ({
  changeField: (newValue, name) => {
    dispatch(updateActivityField(newValue, name));
  },

  handleEditActivity: () => {
    dispatch(editActivity());
  },

  checkActivityId: (id) => {
    dispatch(checkActivity(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityEdit);