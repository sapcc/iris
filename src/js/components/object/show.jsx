import React from "react";
import ReactJson from 'react-json-view'
import {
  Link
} from 'react-router-dom'
import {
  FormGroup,
  Input,
  Col,
  Label,
  UncontrolledTooltip,
  Card,
  Button,
  CardImg,
  CardTitle,
  CardHeader,
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
        
        <Card className="text-center">
          <CardBody>
            <CardTitle>{item.object_type}</CardTitle>
            <CardText>{item.name}</CardText>
            
            {!dependencies || dependencies.isFetching 
                ? <span className="spinner"/>
                :
                <React.Fragment>
                  <FormGroup row className="justify-content-md-center">
                    <Col sm={3}>
                    <Input type="select" onChange={(e) => this.addRelation(e.target.value)} value=''>
                      <option value=''>Add Relation</option>
                      {this.filterRelations().map((type,index) => 
                        <option key={index} value={type}>{type}</option>
                      )}
                    </Input>  
                  </Col>
                  </FormGroup>
                </React.Fragment>
            }
          </CardBody>
        </Card>
        <br />

        <CardColumns>
          {this.state.relations.map(type =>
            <Card key={type}>
              <CardHeader>
                {type}
              <span className="float-right clickable close-icon" onClick={(e) => this.removeRelation(type)}>
                <i className="fa fa-times text-info"></i>
              </span>
            </CardHeader>
            <CardBody>
              <ul>
                {this.relationItems(type).map((obj,index) => 
                  <li key={index}>
                    <span id={`tooltip-${type}-${index}`}>{obj.name}</span>
                      <br/>
                      <span className="small text-info">{obj._path}</span>
                    </li>  
                  )}
                </ul>
              </CardBody>
            </Card>
          )}
        </CardColumns>
                  
          

      </div>
    )
  }
}
