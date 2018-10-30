import React from "react";

export const Highlighter = ({search,children=''}) => {
  let text = children.toString()
  let start = text.indexOf(search)

  if(start<0) return children

  return(
    <React.Fragment>
      {text.substr(0,start)}
      <span className="u-text-highlight">{text.substr(start,search.length)}</span>
      {text.substr(start+search.length,text.length)}
    </React.Fragment>
  )
}
