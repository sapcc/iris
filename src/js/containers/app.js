import { connect } from  'react-redux';
import App from '../components/app';
import { login, logout } from '../actions/auth'
import { findObjects, updateSearchFilter } from '../actions/search'

export default connect(
  (state ) => (
    {
      profile: state.profile,
      search: state.search
    }
  ),
  (dispatch) => (
    {
      login: (authParams) => dispatch(login(authParams)),
      logout: () => dispatch(logout()),
      updateSearchFilter: (filter) => {dispatch(updateSearchFilter(filter))},
      findObjects: () => dispatch(findObjects())
    }
  )
)(App);
