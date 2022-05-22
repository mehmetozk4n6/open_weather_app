import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";

import SignUpCard from "../SignUpCard";

describe("SignUp Card Testleri", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <SignUpCard />
        </Router>
      </Provider>
    );
  });

  it("should change the input value", () => {
    userEvent.type(screen.getByLabelText("api-input"), "asdfgh");

    expect(screen.getByLabelText("api-input")).toHaveValue("asdfgh");
  });
});
