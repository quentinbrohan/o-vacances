import { connect } from 'react-redux';

import SuggestionForm from 'src/components/Trip/SuggestionForm';

import {
  updateSuggestionField,
  addSuggestion,
} from 'src/actions/trip';

const mapStateToProps = (state) => ({
  suggestionDescription: state.trip.suggestionDescription,
  suggestionTitle: state.trip.suggestionTitle,
});

const mapDispatchToProps = (dispatch) => ({
  changeField: (newValue, name) => {
    dispatch(updateSuggestionField(newValue, name));
  },
  handleSuggestion: () => {
    dispatch(addSuggestion());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionForm);
