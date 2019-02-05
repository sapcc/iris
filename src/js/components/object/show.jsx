import React from "react";
import ReactJson from 'react-json-view'
import { Link } from 'react-router-dom'

const availableRelations = {
  'projects': [{name: 'Project1', id:'e9141fb24eee4b3e9f25ae69cda31132'}],
  'ips': [
    {'address':'10.0.0.1', project_id: 'e9141fb24eee4b3e9f25ae69cda31132'},
    {'address':'20.0.0.1', project_id: 'e9141fb24eee4b3e9f25ae69cda31132'},
    {'address':'30.0.0.1', project_id: '2'},
  ],
  'users':[
    {'name':'User1', project_id: 'e9141fb24eee4b3e9f25ae69cda31132', id: '1'},
    {'name':'User2', project_id: 'e9141fb24eee4b3e9f25ae69cda31132', id: '2'},
    {'name':'User3', project_id: 'e9141fb24eee4b3e9f25ae69cda31132', id: '3'},
    {'name':'User4', project_id: '2', id: '4'},
    {'name':'User5', project_id: '3', id: '5'},
  ]
}

export default class ObjectShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = { relations: [props.item.object_type] }
  }

  addRelation = (name) => {
    if(!name) return
    const relations = this.state.relations.slice()
    relations.push(name)
    this.setState({relations})
  }

  relationItems = (name) => {
    if(name===this.props.item.object_type) {
      return [this.props.item]
    }
    const relations = availableRelations[name]
    if(relations) return relations.filter(rel => 
      rel.project_id===this.props.item.project_id ||
      rel.id===this.props.item.project_id
    )
    return []
  }

  render(){
    return(
      <div className="container-fluid">

        <select onChange={(e) => this.addRelation(e.target.value)} defaultValue={null}>
          <option value={null}>Add Relation</option>
          {Object.keys(availableRelations).filter(a => !this.state.relations.find(u => a == u)).map((type,index) => <option key={index} value={type}>{type}</option>)}
        </select>  

        <table className="table">
          <thead>
            <tr>
              {this.state.relations.map((type,index) => <th key={index}>{type}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              {this.state.relations.map(type => 
                <td key={type}>
                  {this.relationItems(type).map((obj,index) => 
                    <React.Fragment key={index}>{obj.name || obj.address}<br/></React.Fragment>
                  )} 
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
