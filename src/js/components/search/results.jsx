import React from "react";
import Item from './item'

export default ({search, showObjectDetails}) =>
  search.isFetching ?
    <React.Fragment><span className='spinner'></span> Loading...</React.Fragment>
    : search.receivedAt &&
    <div className="search-results container-fluid">
      <h6 className="u-text-info">Found {search.items.length} results</h6>

      {search.items.length>0 &&
        <table className="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Name / ID</th>
              <th width='30%'>Details</th>
              <th>Region</th>
              <th>Domain</th>
              <th>Project</th>
            </tr>
          </thead>
          <tbody>
            {search.items.map((item,index) =>
              <Item
                key={index}
                handleClick={(id) => showObjectDetails(id)}
                searchTerm={(search.filter || {}).term}
                item={item}/>
            )}
          </tbody>
        </table>
      }
    </div>
