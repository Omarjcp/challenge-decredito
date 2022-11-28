import React, { useState, useRef, useMemo } from "react";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { detailsIngresadas } from "../DB/detailsIngresadas";
import { useColumnsDetails } from "../hooks/useColumns";
import { useParams } from "react-router-dom";
import { filterForKey } from "../utils/helpers";

const DetailsForSupervisor = () => {
  const { supervisor } = useParams();
  const containerStyle = useMemo(() => ({ width: "100%", height: "98vh" }), []);
  const gridStyle = useMemo(() => ({ height: "98vh", width: "100%" }), []);

  const [rowData, setRowData] = useState(
    filterForKey(detailsIngresadas, "NomSupervisor", supervisor)
  );

  const { columnDefsDetails } = useColumnsDetails();

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      resizable: true,
      flex: 1,
      minWidth: 140,
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefsDetails}
          defaultColDef={defaultColDef}
          groupDisplayType={"groupRows"}
          rowSelection={"single"}
          animateRows={true}
          suppressAggFuncInHeader={true}
          columnHoverHighlight={true}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default DetailsForSupervisor;
