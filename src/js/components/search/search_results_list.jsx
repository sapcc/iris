import React from "react";
import ReactJson from 'react-json-view'

const item = {
  "status":"ACTIVE",
  "description":null,
  "links":{
  "self":"https://dns-3.qa-de-1.cloud.sap:443/v2/zones/1d4954f6-922b-4356-a423-e8981e911d97/recordsets/a04c0068-3d0d-4c79-aa56-d95946f03ef7"
},
  "created_at":"2018-04-09T07:39:11.000000",
  "updated_at":"2018-10-24T07:41:55.000000",
  "records":[
    "10.236.36.157"
  ],
  "zone_id":"1d4954f6-922b-4356-a423-e8981e911d97",
  "version":3,
  "ttl":1800,
  "action":"NONE",
  "zone_name":"net.cloud.sap.",
  "project_id":"e9141fb24eee4b3e9f25ae69cda31132",
  "type":"A",
  "id":"a04c0068-3d0d-4c79-aa56-d95946f03ef7",
  "name":"davidtest1.net.cloud.sap.",
  "cached_object_type":"recordset",
  "search_label":"zone_id: 1d4954f6-922b-4356-a423-e8981e911d97 zone_name: net.cloud.sap.",
  "scope":{
  "domain_id":"2bac466eed364d8a92e477459e908736",
    "domain_name":"monsoon3",
    "project_id":"e9141fb24eee4b3e9f25ae69cda31132",
    "project_name":"cc-demo"
  }
}

export default () =>
  <div className="search-results container-fluid">
    <h6 className="u-text-info">Found 3 results</h6>

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
          <td className="u-table-cell-snug">fixed ip</td>
          <td>
            eu-de-1 <br />
            monsoon3 <span className="u-text-info u-text-small">(ec213443e8834473b579f7bea9e8c194)</span> <br />
            cc-demo <span className="u-text-info u-text-small">(4d0477a019414ee08ad0fd11b777eee2)</span>
          </td>
          <td>
            <ReactJson src={item} collapsed={1}/>
          </td>
          <td>
            <button className="btn btn-primary btn-sm">Show dependencies</button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
