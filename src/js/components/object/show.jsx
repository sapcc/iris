import React from "react";
import ReactJson from 'react-json-view'
import { Link } from 'react-router-dom'

export default ({item,dependencies}) =>
  <div className="search-results container-fluid">
    <table className="table">
      <thead>
        <tr>
          <th className="u-table-cell-snug">Type</th>
          <th className="u-table-cell-snug">Scope</th>
          <th>Metadata</th>
          <th>Dependencies</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="u-table-cell-snug">{item.object_type}</td>
          <td>
            {item.region}
            <br />
            {item.domain_name}}&nbsp;
            <span className="u-text-info u-text-small">({item.domain_id})</span>
            <br />
            {item.project_name} }&nbsp;
            <span className="u-text-info u-text-small">({item.project_id})</span>
          </td>
          <td>
            <ReactJson src={item} collapsed={1}/>
          </td>
          <td>
            {!dependencies || dependencies.isFetching
              ?
              <React.Fragment>
                <span className='spinner'></span> Loading...
              </React.Fragment>
              :
              <ul>
                {Object.keys(dependencies.items).map((type,index) =>
                  <li key={index}>
                    <span className="u-text-info">{type} ({dependencies.items[type].length})</span>
                    <ul>
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
          </td>
        </tr>
      </tbody>
    </table>

  </div>
