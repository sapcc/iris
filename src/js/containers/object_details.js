import ObjectDetails from '../components/object/details'
import { connect } from  'react-redux';
import { loadObjectOnce } from '../actions/objects'
import { loadDependenciesOnce } from '../actions/dependencies'
import { extendHistory } from '../actions/search'

export default connect(
  (state,ownProps ) => {
    let item, dependencies;
    let id = ownProps.match && ownProps.match.params && ownProps.match.params.id
    if (id) {
      item = state.objects.find(item => item.id==id)
      dependencies = state.dependencies[id]
    }

    let objectHistory = []
    for(let id of state.search.history) {
      let obj = state.objects.find(i => i.id==id)
      if(obj) objectHistory.push(obj)
    }

    return { id, item, dependencies, objectHistory }
  },
  (dispatch,ownProps) => {
    let id = ownProps.match && ownProps.match.params && ownProps.match.params.id
    return {
      loadObjectOnce: () => dispatch(loadObjectOnce(id)),
      loadDependenciesOnce: () => dispatch(loadDependenciesOnce(id)),
      showObjectDetails: (dependentId) => ownProps.history.push(`/objects/${dependentId}`),
      extendHistory: () => dispatch(extendHistory(id))
    }
  }
)(ObjectDetails);
