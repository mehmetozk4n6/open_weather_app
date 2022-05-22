import { render, screen } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import NotFound from "../NotFound";

describe("Not Found testleri", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
  });

  it("should have Not Found text", () => {
    const notfound = screen.getByText(/not found/i);
    expect(notfound).toBeInTheDocument();
  });
});
