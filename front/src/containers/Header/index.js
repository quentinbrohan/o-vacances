import { connect } from 'react-redux';

// === on importe le composant de présentation
import Header from 'src/components/Header';

import { logOut } from 'src/actions/user';
import { logOutTrip } from 'src/actions/trip';

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => {
    dispatch(logOut());
    dispatch(logOutTrip());
  },
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(Header);
