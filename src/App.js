import { Route, Routes } from "react-router-dom";
import DetailsForSupervisor from "./components/DetailsForSupervisor";
import TablePrincipal from "./components/TablePrincipal";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<TablePrincipal />} />
      <Route path="/:supervisor" element={<DetailsForSupervisor />} />
    </Routes>
  );
};

export default App;

// import {
//   useReactTable,
//   getCoreRowModel,
//   // getPaginationRowModel,
//   getFilteredRowModel,
//   getExpandedRowModel,
//   flexRender,
//   getGroupedRowModel,
// } from "@tanstack/react-table";
// import { useEffect, useState } from "react";

// import "./App.css";
// import { useColumns } from "./hooks/useColumns";
// import { resultData, sumForZone, sumSubTotalZone } from "./utils/helpers";

// const App = () => {
//   const [data, setData] = useState(resultData);
//   const [expanded, setExpanded] = useState({});
//   const [grouping, setGrouping] = useState([]);
//   const { columns } = useColumns();

//   useEffect(() => {
//     setData(
//       data.map((_, i) => {
//         return {
//           name: "Zona",
//           subRows: data[i].subRows.map((el) => {
//             return sumSubTotalZone(el, sumForZone, data);
//           }),
//         };
//       })
//     );
//   }, []);

//   const table = useReactTable({
//     data,
//     columns,
//     state: {
//       grouping,
//       expanded,
//     },
//     onGroupingChange: setGrouping,
//     onExpandedChange: setExpanded,
//     getSubRows: (row) => row.subRows,
//     getCoreRowModel: getCoreRowModel(),
//     getGroupedRowModel: getGroupedRowModel(),
//     //TODO: ¿paginar o no paginar?
//     // getPaginationRowModel: getPaginationRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getExpandedRowModel: getExpandedRowModel(),
//     debugTable: true,
//   });

//   useEffect(() => {
//     table.setPageSize(30);
//   }, []);

//   return (
//     <>
//       <table>
//         <thead>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header, i) => {
//                 return (
//                   <th key={i} colSpan={header.colSpan}>
//                     {header.isPlaceholder ? null : (
//                       <div>
//                         {flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                       </div>
//                     )}
//                   </th>
//                 );
//               })}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map((row, i) => {
//             return (
//               <tr key={i}>
//                 {row.getVisibleCells().map((cell, i) => {
//                   console.log();
//                   return (
//                     <td
//                       {...{
//                         key: cell.id,
//                         style: {
//                           background: cell.row.getIsGrouped()
//                             ? "red"
//                             : cell.getIsAggregated()
//                             ? "#d4d4d4"
//                             : cell.getIsPlaceholder()
//                             ? "yellow"
//                             : "white",
//                         },
//                       }}
//                     >
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </td>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//         <tfoot>
//           {table.getFooterGroups().map((group, i) => (
//             <tr key={i}>
//               {group.headers.map((foot, i) => {
//                 return (
//                   <th key={i} colSpan={foot.colSpan}>
//                     {
//                       <div>
//                         {flexRender(
//                           foot.column.columnDef.footer,
//                           foot.getContext()
//                         )}
//                       </div>
//                     }
//                   </th>
//                 );
//               })}
//             </tr>
//           ))}
//         </tfoot>
//       </table>
//       <div className="h-2" />
//       <div className="flex items-center gap-2">
//         <select
//           value={table.getState().pagination.pageSize}
//           onChange={(e) => {
//             table.setPageSize(Number(e.target.value));
//           }}
//         >
//           {[20, 30, 40, 50].map((pageSize) => (
//             <option key={pageSize} value={pageSize}>
//               Show {pageSize}
//             </option>
//           ))}
//         </select>
//       </div>
//     </>
//   );
// };

// export default App;
