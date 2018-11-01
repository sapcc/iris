import React from "react";
import ReactJson from 'react-json-view'
import { Link } from 'react-router-dom'

export default ({item,dependencies}) =>
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-3">
        <dl className="row">
          <dt className="col-md-3">Name</dt>
          <dd className="col-md-9">
            { item.name
              ?
              <strong>{item.name}</strong>
              :
              <span>n/a</span>
            }
          </dd>

          <dt className="col-md-3">ID</dt>
          <dd className="col-md-9">{item.id}</dd>

          <dt className="col-md-3">Type</dt>
          <dd className="col-md-9">{item.object_type}</dd>

          <dt className="col-md-3">Region</dt>
          <dd className="col-md-9">{item.region}</dd>

          {item.domain_name
            ?
            <React.Fragment>
              <dt className="col-md-3">Domain</dt>
              <dd className="col-md-9">{item.domain_name} <span className="u-text-info u-text-small">({item.domain_id})</span></dd>
            </React.Fragment>
            :
            null
          }

          {item.project_name
            ?
            <React.Fragment>
              <dt className="col-md-3">Project</dt>
              <dd className="col-md-9">{item.project_name} <span className="u-text-info u-text-small">({item.project_id})</span></dd>
            </React.Fragment>
            :
            null
          }
        </dl>

      </div>
      <div className="col">
        <h6>Details</h6>
        <ReactJson src={item} collapsed={1}/>
      </div>
      <div className="col">
        <h6>Dependencies</h6>
        {!dependencies || dependencies.isFetching
          ?
          <React.Fragment>
            <span className='spinner'></span> Loading...
          </React.Fragment>
          :
          <ul className="fa-ul u-list-align-left">
            {Object.keys(dependencies.items).map((type,index) =>
              <li key={index}>
                <span className="fa-li" ><i className="fas fa-caret-down"></i></span>
                <span>{type} ({dependencies.items[type].length})</span>
                <ul className="content-list">
                  {dependencies.items[type].map((subitem) =>
                    <li key={subitem.id}>
                      <Link to={`/objects/${subitem.id}`}>{subitem.name}</Link>
                    </li>
                  )}
                </ul>
              </li>
            )}
          </ul>
        }
      </div>
    </div>

  </div>
