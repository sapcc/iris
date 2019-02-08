import React from "react";
import ReactJson from 'react-json-view'
import {
  Link
} from 'react-router-dom'
import {
  UncontrolledTooltip,
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardGroup,
  CardSubtitle,
  CardBody,
  CardColumns
} from 'reactstrap';

export default class ObjectShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      relations: []
    }
  }

  addRelation = (name) => {
    if (!name || name.length === 0) return
    const relations = this.state.relations.slice()
    relations.push(name)
    this.setState({
      relations
    })
  }

  removeRelation = (name) => {
    if (!name || name.length === 0) return
    const index = this.state.relations.indexOf(name)
    if (index < 0) return
    let relations = this.state.relations.slice()
    relations.splice(index, 1)
    this.setState({
      relations
    })
  }

  relationItems = (name) => {
    const {
      dependencies
    } = this.props

    const relations = dependencies.isFetching ? [] : dependencies.items[name]
    return relations || []
  }

  filterRelations = () => {
    if (this.props.dependencies.isFetching || !this.props.dependencies.items) return

    return Object.keys(this.props.dependencies.items).filter(a =>
      !this.state.relations.find(u => a == u)
    )
  }

  render() {
    const {
      item,
      dependencies
    } = this.props

    return (
      <div className="container-fluid">
        {!dependencies || dependencies.isFetching 
            ? <span className="spinner"/>
            :
            <select onChange={(e) => this.addRelation(e.target.value)} value=''>
              <option value=''>Add Relation</option>
              {this.filterRelations().map((type,index) => 
                <option key={index} value={type}>{type}</option>
              )}
            </select>  
        }
        <div className="row">
          <Card className="text-center">
            <CardBody>
              <CardTitle>{item.object_type}</CardTitle>
              <CardText>{item.name}</CardText>
            </CardBody>
          </Card>
        </div>
          
        <CardColumns>
          {this.state.relations.map(type =>
            <Card key={type}>
              <CardBody>
                <CardTitle>
                  {type}
                </CardTitle>
                <CardText>
                  {this.relationItems(type).map((obj,index) => 
                    <React.Fragment key={index}>
                        <span id={`tooltip-${type}-${index}`}>{obj.name}</span>
                        <br/>
                        <span className="small text-info">{obj._path}</span>
                        <br />
                        
                    </React.Fragment>  
                  )}
                </CardText>
              </CardBody>
            </Card>
          )}
        </CardColumns>

      </div>
    )
  }
}

/*
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
                  <React.Fragment key={index}>
                    <div>
                      <span id={`tooltip-${type}-${index}`}>{obj.name}</span>
                      <br/>
                      <span className="small text-info">{obj._path}</span>
                                              
                      <UncontrolledTooltip placement="top" target={`tooltip-${type}-${index}`}>
                        <table>  
                          <tbody>
                            <tr>
                              <th>Path</th>
                              <td>{obj._path}</td>
                            </tr>
                          </tbody>
                        </table>
                      </UncontrolledTooltip>

                    </div>
                  </React.Fragment>
                )} 
              </td>
            )}
          </tr>
        </tbody>
      </table>
      */
