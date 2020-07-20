import { connect } from 'react-redux';

// === on importe le composant de présentation
import Header from 'src/components/Header';

const mapStateToProps = (state) => ({
  isLogged: state.user.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(Header);