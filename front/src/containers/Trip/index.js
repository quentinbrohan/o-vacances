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
  isLoading: state.trip.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  changeSuggestion: (newValue, suggestionContent) => {
    dispatch(updateSuggestionField(newValue, suggestionContent));
  },
  handleSuggestion: () => {
    dispatch(addSuggestion());
  },
  fetchTrip: (tripId) => {
    dispatch(fetchTrip(tripId));
  },
  saveTrip: () => {
    dispatch(saveTrip());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Trip);
