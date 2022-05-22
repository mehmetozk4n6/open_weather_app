// app.test.js
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import "@testing-library/jest-dom";

import App, { LocationDisplay } from "./app";

test("full app rendering/navigating", async () => {
  const history = createMemoryHistory();
  render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    </Provider>
  );
  // verify page content for expected route
  expect(screen.getByText(/geçerli/i)).toBeInTheDocument();
});

test("landing on a city page", () => {
  const history = createMemoryHistory();
  history.push("/city/");
  render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    </Provider>
  );

  expect(screen.getByText(/Şehir/i)).toBeInTheDocument();
});

test("landing on a bad page", () => {
  const history = createMemoryHistory();
  history.push("/some/bad/route");
  render(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>
  );

  expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
});

test("rendering a component that uses useLocation", () => {
  const history = createMemoryHistory();
  const route = "/some-route";
  history.push(route);
  render(
    <Router location={history.location} navigator={history}>
      <LocationDisplay />
    </Router>
  );

  expect(screen.getByTestId("location-display")).toHaveTextContent(route);
});
