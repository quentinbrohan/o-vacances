import { connect } from 'react-redux';

// === on importe le composant de présentation
import Profile from 'src/components/Profile';

const mapStateToProps = (state) => ({

  isDisabled: state.settings.isDisabled,

});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({


});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
