import ObjectHistory from './history'
import ObjectShow from './show'
import React from 'react'

export default class ObjectDetails extends React.Component {

  state = {}
  static getDerivedStateFromProps(props, state){
    props.extendHistory()
    if(!props.item) props.loadObjectOnce()
    if(!props.dependencies) props.loadDependenciesOnce()
    return state
  }

  render() {
    if(this.props.dependencies)console.log('dependencies',this.props.dependencies,Object.keys(this.props.dependencies.items))
    return(
      <React.Fragment>
        {this.props.objectHistory &&
          <ObjectHistory
            objectHistory={this.props.objectHistory}
            currentItem={this.props.item}/>
        }

        {!this.props.item || this.props.item.isFetching ?
          <React.Fragment><span className='spinner'></span> Loading...</React.Fragment>
          : this.props.item.loadError ?
            <p className='text text-danger'>{this.props.id}: {this.props.item.loadError}</p>
            :
            <ObjectShow
              item={this.props.item}
              dependencies={this.props.dependencies}/>
        }
      </React.Fragment>
    )
  }
}
