import React from "react";
import { Link } from 'react-router-dom'

export default ({objectHistory,currentItem}) => {
  const label = (item) => item.name || item.floating_ip_address || item.object_type

  return(
    <div className="container-fluid">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {objectHistory.map((item,index) =>
            currentItem && currentItem.id==item.id
            ? <li key={index} className="breadcrumb-item active" aria-current="page">{label(item)}</li>
            : <li key={index} className="breadcrumb-item">
                <Link to={`/objects/${item.id}`}>{label(item)}</Link>
              </li>
          )}
        </ol>
      </nav>
    </div>
  )
}
