import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCity,
  errorSelector,
  statusSelector,
  cleanErrorMessage,
} from "../../redux/weatherSlice";

function SignUpCard() {
  const error = useSelector(errorSelector);
  const status = useSelector(statusSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [apikey, setApikey] = useState("");

  // APIKEY varsa City'ye yönlendirir
  useEffect(() => {
    if (sessionStorage.getItem("APIkey")) {
      dispatch(fetchCity("Ankara"));
    }
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      navigate("city");
      dispatch(cleanErrorMessage());
    }
  }, [status, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("APIkey", apikey);
    dispatch(fetchCity("Ankara"));
  };

  return (
    <>
      <div className="signUpCard">
        <form onSubmit={(e) => handleSubmit(e)} id="form">
          <p>
            <i>
              Lütfen https://openweathermap.org/ sitesi için geçerli bir Api Key
              giriniz.
            </i>
          </p>
          <label htmlFor="API">
            <b>API Key:</b>
          </label>
          <input
            id="API"
            onChange={(e) => setApikey(e.target.value)}
            placeholder="KEY"
            className="mb-4"
            aria-label="api-input"
          />
          {error && (
            <>
              <h4 style={{ color: "red" }}>! HATALI API KEY</h4>
            </>
          )}
          <br />
          <button type="submit" id="submit">
            Giriş
          </button>
        </form>
      </div>
    </>
  );
}

export default SignUpCard;
