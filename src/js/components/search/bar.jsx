import React from "react";

export default ({findObjects,searchFilter,updateSearchFilter}) =>
  <div className="search-bar container">
    <input
      className="form-control form-control-lg"
      type="text"
      placeholder="Search all the things"
      value={searchFilter.term || ''}
      onChange={(e) => updateSearchFilter({term: e.target.value})}
      onKeyPress={(e) => e.key === 'Enter' && findObjects()}
      />
  </div>
