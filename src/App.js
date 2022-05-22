import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import SignUp from "./pages/SignUp";
import City from "./pages/City";
import NotFound from "./pages/NotFound/NotFound";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { statusSelector, errorSelector } from "./redux/weatherSlice";
import { useEffect } from "react";

export const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
};

function App() {
  const status = useSelector(statusSelector);
  const error = useSelector(errorSelector);
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  useEffect(() => {
    if (status === "loading") {
      Swal.showLoading();
    } else {
      Swal.close();
      if (error) {
        Toast.fire({
          icon: "error",
          title: `${error}`,
        });
      }
    }
  }, [status, error, Toast]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="city" element={<City />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* <LocationDisplay/> */}
    </div>
  );
}

export default App;
