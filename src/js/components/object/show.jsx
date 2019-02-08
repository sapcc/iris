import React, {
  useState
} from "react";
import ReactJson from 'react-json-view'
import {
  Link
} from 'react-router-dom'
import {
  FormGroup,
  Input,
  Col,
  UncontrolledTooltip,
  Card,
  CardTitle,
  CardHeader,
  CardText,
  CardBody,
  CardColumns
} from 'reactstrap';

export default ({
  item,
  dependencies
}) => {
  const [relations, setRelations] = useState([])

  const addRelation = (name) => {
    if (!name || name.length === 0) return
    const newRelations = relations.slice()
    newRelations.push(name)
    setRelations(newRelations)
  }

  const removeRelation = (name) => {
    if (!name || name.length === 0) return
    const index = relations.indexOf(name)
    if (index < 0) return
    let newRelations = relations.slice()
    newRelations.splice(index, 1)
    setRelations(newRelations)
  }

  const relationItems = (name) => {
    const items = dependencies.isFetching ? [] : dependencies.items[name]
    return items || []
  }

  const filterRelations = () => {
    if (dependencies.isFetching || !dependencies.items) return

    return Object.keys(dependencies.items).filter(a =>
      !relations.find(u => a == u)
    )
  }


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
                  <Input type="select" onChange={(e) => addRelation(e.target.value)} value=''>
                    <option value=''>Add Relation</option>
                    {filterRelations().map((type,index) => 
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
        {relations.map(type =>
          <Card key={type}>
            <CardHeader>
              {type}
            <span className="float-right clickable close-icon" onClick={(e) => removeRelation(type)}>
              <i className="fa fa-times text-info"></i>
            </span>
          </CardHeader>
          <CardBody>
            <ul>
              {relationItems(type).map((obj,index) => 
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
