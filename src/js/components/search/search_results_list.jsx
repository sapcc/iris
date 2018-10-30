import React from "react";


export default () =>
  <div className="search-results container-fluid">
    <h6 className="u-text-info">Found 3 results</h6>

    <table className="table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Name / ID</th>
          <th>Details</th>
          <th>Region</th>
          <th>Domain</th>
          <th>Project</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Recordset A</td>
          <td><span className="u-text-highlight">twogo.c.eu-de-1.cloud.sap</span></td>
          <td><span className="u-text-info">zone_id: 572e0062-5223-4d69-b718-6b1fee2bd642 zone_name: <span className="u-text-highlight">twogo.c.eu-de-1.cloud.sap.</span></span></td>
          <td>
            eu-de-1
          </td>
          <td>
            hcp03 <span className="u-text-info u-text-small">(ec213443e8834473b579f7bea9e8c194)</span>
          </td>
          <td>
            twogo-lab <span className="u-text-info u-text-small">(4d0477a019414ee08ad0fd11b777eee2)</span>
          </td>
        </tr>
        <tr>
          <td>Recordset SOA</td>
          <td><span className="u-text-highlight">twogo.c.eu-de-1.cloud.sap</span></td>
          <td><span className="u-text-info">zone_id: 572e0062-5223-4d69-b718-6b1fee2bd642 zone_name: <span className="u-text-highlight">twogo.c.eu-de-1.cloud.sap.</span></span></td>
          <td>
            eu-de-1
          </td>
          <td>
            hcp03 <span className="u-text-info u-text-small">(ec213443e8834473b579f7bea9e8c194)</span>
          </td>
          <td>
            twogo-lab <span className="u-text-info u-text-small">(4d0477a019414ee08ad0fd11b777eee2)</span>
          </td>
        </tr>
        <tr>
          <td>Zone</td>
          <td><span className="u-text-highlight">twogo.c.eu-de-1.cloud.sap</span></td>
          <td><span className="u-text-info">email: david.hoeller@sap.com pool_id: 794ccc2c-d751-44fe-b57f-8894c9f5c842</span></td>
          <td>
            eu-de-1
          </td>
          <td>
            hcp03 <span className="u-text-info u-text-small">(ec213443e8834473b579f7bea9e8c194)</span>
          </td>
          <td>
            twogo-lab <span className="u-text-info u-text-small">(4d0477a019414ee08ad0fd11b777eee2)</span>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
