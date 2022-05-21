import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import SignUp from "./pages/SignUp";
import City from "./pages/City";
import NotFound from "./pages/NotFound";

export const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid="location-display">{location.pathname}</div>;
};

function App() {
  return (
    <div className="App">
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="city" element={<City />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
