import React from "react";

export default ({findObjects,searchFilter}) =>
  <div className="search-bar container">
    <input
      className="form-control form-control-lg"
      type="text"
      placeholder="Search all the things"
      value={searchFilter.term || ''}
      onChange={(e) => findObjects({term: e.target.value})}
      />
  </div>
