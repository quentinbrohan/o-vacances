import { connect } from 'react-redux';

// === on importe le composant de présentation
import Header from 'src/components/Header';

import { logOut } from 'src/actions/user';

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => {
    dispatch(logOut());
  },
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(Header);
