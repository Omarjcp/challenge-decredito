import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";

import { preRequest } from "../DB/preRequest";
import { useColumns } from "../hooks/useColumns";

const TablePrincipal = () => {
  const navigate = useNavigate();
  const containerStyle = useMemo(() => ({ width: "auto", height: "97vh" }), []);
  const gridStyle = useMemo(() => ({ height: "97vh", width: "auto" }), []);

  const [rowData, setRowData] = useState(preRequest);

  const { columnDefs } = useColumns();

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      resizable: true,
      flex: 1,
      minWidth: 100,
    };
  }, []);

  const onSelectionChanged = (param) => {
    if (param.node.field === "NomSucursal") {
      navigate(`/${param.node.key}`);
    } else {
      console.log("No es supervisor");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          groupDisplayType={"groupRows"}
          rowSelection={"single"}
          groupIncludeFooter={true}
          groupIncludeTotalFooter={true}
          animateRows={true}
          suppressAggFuncInHeader={true}
          columnHoverHighlight={true}
          onCellClicked={onSelectionChanged}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default TablePrincipal;
