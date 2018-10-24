import { connect } from  'react-redux';
import App from '../components/app';
import { login, logout } from '../actions/auth'

export default connect(
  (state ) => (
    { profile: state.profile }
  ),
  (dispatch) => (
    {
      login: (authParams) => dispatch(login(authParams)),
      logout: () => dispatch(logout())
    }
  )
)(App);
