import React from "react";
import { Highlighter } from '../../lib/highlighter'

export default ({handleClick,item,searchTerm=''}) => {
  let type = item.object_type=='recordset' ? `recordset ${item.type}` : item.object_type
  let details = item.object_type=='recordset' ? `zone id: ${item.zone_id} zone name: ${item.zone_name}` : item.description

  return(
    <tr className="search-result" onClick={(e) => {e.preventDefault(); handleClick(item.id)}}>
      <td>{type}</td>
      <td><Highlighter search={searchTerm}>{item.name}</Highlighter></td>
      <td>
        <span className="u-text-info">
          <Highlighter search={searchTerm}>{details}</Highlighter>
        </span>
      </td>
      <td>{item.region}</td>
      <td>
        {item.domain_name}<br/>
        <span className="u-text-info-dark font-weight-lightest u-text-small">{item.domain_id}</span>
      </td>
      <td>
        {item.project_name}<br/>
        <span className="u-text-info-dark font-weight-lightest u-text-small">{item.project_id}</span>
      </td>
    </tr>
  )
}
