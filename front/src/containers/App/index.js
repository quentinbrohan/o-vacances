import { connect } from 'react-redux';

import App from 'src/components/App';

import { checkAuthentication } from 'src/actions/user';

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  checkAuth: () => {
    dispatch(checkAuthentication());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
