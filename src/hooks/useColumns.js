import { Button } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import {
  dictionaryClasification,
  dictionaryScoring,
  dictionaryTeams,
  dictionaryTypePlay,
} from "../utils/dictionary";

export const useColumnsDetails = () => {
  const [columnDefsDetails, setColumnDefsDetails] = useState([
    { field: "NomSupervisor", rowGroup: true, hide: true },
    {
      field: "Fecha",
      cellRenderer: (params) =>
        params.value && dayjs(params.value).format("DD/MM/YYYY"),
    },
    {
      field: "Solicitud",
    },
    {
      field: "Cliente",
    },
    {
      field: "NomVendedor",
    },
    {
      headerName: "Modelo",
      field: "Vehiculo",
    },
    {
      headerName: "Tipo Plan",
      field: "codigotipoplan",
      valueGetter: (param) =>
        dictionaryTypePlay[param.node.data.codigotipoplan],
    },
    {
      headerName: "Importe Total Cuota",
      field: "ImporteCuota",
      cellRenderer: (param) =>
        new Intl.NumberFormat("en-US").format(Number(param.value)),
    },
    {
      field: "Saldo",
      cellRenderer: (param) =>
        new Intl.NumberFormat("en-US").format(Number(param.value)),
    },
    {
      headerName: "Fecha Estimada Cancelacion",
      field: "FechaCancelacion",
      cellRenderer: (params) =>
        params.value && dayjs(params.value).format("DD/MM/YYYY"),
    },
    {
      headerName: "Tiene DNI",
      field: "Dni",
      cellRenderer: (params) => (
        <input
          type="checkbox"
          defaultChecked={!!params.value}
          checked={!!params.value}
        />
      ),
    },
    {
      headerName: "Tiene Servicio",
      field: "Servicio",
      cellRenderer: (params) => (
        <input
          type="checkbox"
          defaultChecked={!!params.value}
          checked={!!params.value}
        />
      ),
    },
    {
      headerName: "Tiene Anexos",
      field: "Anexos",
      cellRenderer: (params) => (
        <input
          type="checkbox"
          defaultChecked={!!params.value}
          checked={!!params.value}
        />
      ),
    },
    {
      headerName: "Estado Pre Scoring",
      field: "EstadoPrescoring",
      valueGetter: (param) =>
        dictionaryScoring[param.node.data.EstadoPrescoring],
    },
    {
      headerName: "Estado Scoring",
      field: "Estadoscoring",
      valueGetter: (param) => dictionaryScoring[param.node.data.Estadoscoring],
    },
    {
      headerName: " ",
      field: "Clasificacion",
    },
    {
      headerName: "Clasificacion",
      field: "Clasificacion",
      valueGetter: (param) =>
        dictionaryClasification[param.node.data.Clasificacion],
    },
    {
      headerName: "Tipo Precio",
      field: "TipoPrecio",
    },
    {
      headerName: "Valor del Vehículo",
      field: "Precio",
      cellRenderer: (param) =>
        new Intl.NumberFormat("en-US").format(Number(param.value)),
    },
    {
      headerName: "Debito Automático",
      field: "DebitoAutomatico",
      cellRenderer: (params) => (
        <input
          type="checkbox"
          defaultChecked={!!params.value}
          checked={!!params.value}
        />
      ),
    },
    {
      headerName: "Debito Automático Scoring",
      field: "DebitoAutomaticoScoring",
      cellRenderer: (params) => (
        <input
          type="checkbox"
          defaultChecked={!!params.value}
          checked={!!params.value}
        />
      ),
    },
    {
      headerName: "Fecha Ingreso a Terminal",
      field: "FechaIngresoTerminal",
      cellRenderer: (params) =>
        params.value && dayjs(params.value).format("DD/MM/YYYY"),
    },
    {
      headerName: "Supervisor",
      field: "NomSupervisor",
    },
    {
      headerName: "Mini Emprendedor",
      field: "EsMicro",
      cellRenderer: (params) => (
        <input
          type="checkbox"
          defaultChecked={!!params.value}
          checked={!!params.value}
        />
      ),
    },
    {
      headerName: "Oficial Plan Canje",
      field: "NombreOficialPC",
    },
    {
      headerName: " ",
      field: "button",
      cellRenderer: (param) => (
        <Button type="primary" size="small">
          Ver Operación
        </Button>
      ),
    },
  ]);

  return { columnDefsDetails };
};

export const useColumns = () => {
  const hashValueGetter = (params) => {
    const column = params.column.colId;
    return params.data[column] ? params.data[column] : 0;
  };

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: " ",
      children: [
        { field: "NombreZona", rowGroup: true, hide: true },
        {
          field: "EsMiniEmprendedor",
          rowGroup: true,
          hide: true,
          valueGetter: (param) =>
            dictionaryTeams[param.node.data.EsMiniEmprendedor],
        },
        { field: "NomSucursal", rowGroup: true, hide: true },
        {
          headerName: "Vendedor",
          field: "NomVendedor",
          minWidth: 250,
          cellRenderer: (params) => {
            return <span style={{ marginLeft: 60 }}>{params.value}</span>;
          },
        },
        {
          headerName: "Fecha Alta",
          field: "FechaAltaVendedor",
          cellRenderer: (params) =>
            params.value && dayjs(params.value).format("DD/MM/YYYY"),
        },
        {
          headerName: "Fecha Baja",
          field: "FechaBajaVendedor",
          cellRenderer: (params) =>
            params.value && dayjs(params.value).format("DD/MM/YYYY"),
        },
        {
          field: "Ingresadas",
          aggFunc: "sum",
          cellStyle: {
            backgroundColor: "violet",
          },
          valueGetter: hashValueGetter,
        },
        { field: "VentasMP", aggFunc: "sum", valueGetter: hashValueGetter },
        { field: "Crucescoring", aggFunc: "sum", valueGetter: hashValueGetter },
        { field: "Objetivo", aggFunc: "sum", valueGetter: hashValueGetter },
        {
          field: "Produccion",
          aggFunc: "sum",
          cellStyle: {
            backgroundColor: "lightgreen",
          },
          valueGetter: hashValueGetter,
        },
      ],
    },
    {
      headerName: "CLASIFICACIONES PENDIENTES",
      children: [
        {
          headerName: "2",
          field: "C2",
          aggFunc: "sum",
          valueGetter: hashValueGetter,
        },
        {
          headerName: "4",
          field: "C4",
          aggFunc: "sum",
          valueGetter: hashValueGetter,
        },
        {
          headerName: "5",
          field: "C5",
          aggFunc: "sum",
          valueGetter: hashValueGetter,
        },
        {
          headerName: "6",
          field: "C6",
          aggFunc: "sum",
          valueGetter: hashValueGetter,
        },
        {
          headerName: "7",
          field: "C7",
          aggFunc: "sum",
          valueGetter: hashValueGetter,
        },
        {
          headerName: "Sub Total",
          field: "subtotal1",
          aggFunc: "sum",
          cellStyle: {
            backgroundColor: "yellow",
          },
          valueGetter: "data.C2 + data.C4 + data.C5 + data.C6 + data.C7",
        },
        {
          headerName: "3",
          field: "C3",
          aggFunc: "sum",
          valueGetter: hashValueGetter,
        },
        {
          headerName: "8",
          field: "C8",
          aggFunc: "sum",
          valueGetter: hashValueGetter,
        },
        {
          headerName: "9",
          field: "C9",
          aggFunc: "sum",
          valueGetter: hashValueGetter,
        },
        {
          headerName: "Sub Total",
          field: "subtotal2",
          aggFunc: "sum",
          cellStyle: {
            backgroundColor: "orange",
          },
          valueGetter: "data.C3 + data.C8 + data.C9",
        },
        {
          headerName: "Anulada 3 + 7",
          field: "AnuladaTresYSiete",
          aggFunc: "sum",
          valueGetter: hashValueGetter,
        },
        {
          headerName: "Anulada Rechazada",
          field: "Anulada Rechazada",
          aggFunc: "sum",
          valueGetter: hashValueGetter,
        },
      ],
    },
    {
      headerName: "MESES ANTERIORES",
      children: [
        {
          headerName: "-1",
          field: "MesAnt",
          aggFunc: "sum",
          valueGetter: hashValueGetter,
        },
        {
          headerName: "-2",
          field: "MesAnt2",
          aggFunc: "sum",
          valueGetter: hashValueGetter,
        },
        {
          headerName: "-3",
          field: "MesAnt3",
          aggFunc: "sum",
          valueGetter: hashValueGetter,
        },
        {
          headerName: "PROM",
          field: "prom",
          aggFunc: "sum",
          valueGetter:
            "parseInt(data.MesAnt3 + data.MesAnt2 + data.MesAnt / 3)",
        },
      ],
    },
    {
      headerName: " ",
      children: [
        {
          headerName: "GB",
          field: "gb",
          aggFunc: "sum",
          valueGetter: "data.Produccion + data.Crucescoring",
        },
      ],
    },
  ]);

  return { columnDefs };
};
