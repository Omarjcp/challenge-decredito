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
