import { connect } from 'react-redux';

import Trip from 'src/components/Trip';

import { updateSuggestionField, addSuggestion } from 'src/actions/trip';

const mapStateToProps = (state) => ({
  infos: state.user.infos,
  suggestionContent: state.trip.suggestionContent,
});

const mapDispatchToProps = (dispatch) => ({
  changeSuggestion: (newValue, suggestionContent) => {
    dispatch(updateSuggestionField(newValue, suggestionContent));
  },
  handleSuggestion: () => {
    dispatch(addSuggestion());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Trip);
