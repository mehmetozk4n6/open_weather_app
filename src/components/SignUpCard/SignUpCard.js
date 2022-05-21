import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCity,
  errorSelector,
  statusSelector,
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
    }
  }, [status, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("APIkey", apikey);
    dispatch(fetchCity("Ankara"));
  };

  return (
    <div className="signUpCard">
      <form onSubmit={(e) => handleSubmit(e)}>
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
        />
        {error && (
          <>
            <h4 style={{ color: "red" }}>! {error}</h4>
            <h4 style={{ color: "red" }}>! HATALI API KEY</h4>
          </>
        )}
        <br />
        <button type="submit">Giriş</button>
      </form>
    </div>
  );
}

export default SignUpCard;
