import { BrowserRouter, Routes, Route } from "react-router-dom";

import Building from "./Pages/Building";
import Apartment from "./Pages/Apartment";
import Home from "./Pages/Home";
import RegisterBuilding from "./Pages/RegisterBuilding";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/building" element={<Building />} />
        <Route path="/apartment/:id" element={<Apartment />} />
        <Route path="/register-building" element={<RegisterBuilding />} />
        {/* <Route path="/apartment/details" element={<Home />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
