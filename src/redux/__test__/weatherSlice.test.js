import reducer from "../weatherSlice";

test("should return the initial state", () => {
  expect(reducer(undefined, {})).toEqual({
    APIkey: sessionStorage.getItem("APIkey") || "",
    weatherData: [],
    status: "idle",
    error: "",
  });
});
