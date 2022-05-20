import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "./pages/SignUp";
import City from "./pages/City";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="city" element={<City />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
