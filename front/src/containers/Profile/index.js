import { connect } from 'react-redux';

import { deleteDisabledInput } from 'src/actions/settings';

// === on importe le composant de présentation
import Profile from 'src/components/Profile';

const mapStateToProps = (state) => ({

  isDisabled: state.settings.isDisabled,

});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({

  deleteDisabledInput: (status) => {
    dispatch(deleteDisabledInput(status));
  },
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
