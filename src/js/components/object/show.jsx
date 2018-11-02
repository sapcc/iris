import React from "react";
import ReactJson from 'react-json-view'
import { Link } from 'react-router-dom'

export default ({item,dependencies}) =>
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-4">
        <dl className="row">
          <dt className="col-lg-2">Name</dt>
          <dd className="col-lg-10">
            { item.name
              ?
              <strong>{item.name}</strong>
              :
              <span>n/a</span>
            }
          </dd>

          <dt className="col-lg-2">ID</dt>
          <dd className="col-lg-10"><span className="u-text-info-dark font-weight-lightest">{item.id}</span></dd>

          <dt className="col-lg-2">Type</dt>
          <dd className="col-lg-10">{item.object_type}</dd>

          <dt className="col-lg-2">Region</dt>
          <dd className="col-lg-10">{item.region}</dd>

          {item.domain_name &&
            <React.Fragment>
              <dt className="col-lg-2">Domain</dt>
              <dd className="col-lg-10">{item.domain_name} <br /> <span className="u-text-info-dark font-weight-lightest">{item.domain_id}</span></dd>
            </React.Fragment>

          }

          {item.project_name &&
            <React.Fragment>
              <dt className="col-lg-2">Project</dt>
              <dd className="col-lg-10">{item.project_name} <br /> <span className="u-text-info-dark font-weight-lightest">{item.project_id}</span></dd>
            </React.Fragment>
          }
        </dl>

      </div>
      <div className="col">
        <h6>Details</h6>
        <ReactJson src={item} collapsed={1}/>
      </div>
      <div className="col-md-3">
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
                <ul className="fa-ul u-list-align-left">
                  {dependencies.items[type].map((subitem) =>
                    <li key={subitem.id}>
                      <Link to={`/objects/${subitem.id}`}>
                        <span className="fa-li" ><i className="fal fa-square fa-xxs"></i></span>
                        {subitem.name}
                      </Link>
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
