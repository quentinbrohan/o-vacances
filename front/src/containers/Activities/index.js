import { connect } from 'react-redux';

import Activities from 'src/components/Activities';

const mapStateToProps = (state) => ({
  activities: state.trip.trip.activities,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
