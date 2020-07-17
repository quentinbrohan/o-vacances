import { connect } from 'react-redux';

import Trip from 'src/components/Trip';

import {
  updateSuggestionField,
  addSuggestion,
  fetchTrip,
  saveTrip,
} from 'src/actions/trip';

const mapStateToProps = (state) => ({
  trip: state.trip.trip,
  suggestionContent: state.trip.suggestionContent,
});

const mapDispatchToProps = (dispatch) => ({
  changeSuggestion: (newValue, suggestionContent) => {
    dispatch(updateSuggestionField(newValue, suggestionContent));
  },
  handleSuggestion: () => {
    dispatch(addSuggestion());
  },
  fetchTrip: () => {
    dispatch(fetchTrip());
  },
  saveTrip: () => {
    dispatch(saveTrip());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Trip);
