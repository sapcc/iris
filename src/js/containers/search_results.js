import SearchResults from '../components/search/results'
import { connect } from  'react-redux';
import { loadObject } from '../actions/objects'
import { extendHistory } from '../actions/search'

export default connect(
  (state ) => (
    {
      search: state.search
    }
  ),
  (dispatch,ownProps) => {
    console.log('ownProps',ownProps)
    return {
      showObjectDetails: (id) => {
        ownProps.history.push(`/objects/${id}`)
      }
    }
  }
)(SearchResults);
