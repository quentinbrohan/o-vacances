import { connect } from 'react-redux';

import ActivityForm from 'src/components/ActivityForm';

import { updateActivityField, editActivity } from 'src/actions/trip';

const mapStateToProps = (state) => ({
  activities: state.trip.trip.activities,
  activityTitle: state.trip.activityTitle,
  activityDescritption: state.trip.activityDescription,
  activityStartDate: state.trip.activityStartDate,
  activityEndDate: state.trip.activityEndDate,
  activityCategory: state.trip.activityCategory,

});

const mapDispatchToProps = (dispatch) => ({
  changeField: (newValue, name) => {
    dispatch(updateActivityField(newValue, name));
  },

  handleAddActivity: () => {
    dispatch(editActivity());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityForm);
