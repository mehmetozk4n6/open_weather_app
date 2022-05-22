import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";

import CitySelector from "../CitySelector";

describe("City Selector Testleri", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <CitySelector />
        </Router>
      </Provider>
    );
  });

  it("should change the input value", () => {
    expect(screen.getByText("Şehir Seçiniz"));
  });
});
