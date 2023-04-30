import React from 'react';
import Footer from '../src/components/Footer/Footer';
import BlackHeader from '../src/components/UI/BlackHeader';
import Beans from '../src/components/UI/Beans';
import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("Footer", () => {
  it("renders the BlackHeader component", () => {
    const { getByTestId } = render(<MemoryRouter>
        <Footer />
      </MemoryRouter>);
    const blackHeader = getByTestId("black-header");
    expect(blackHeader).toBeInTheDocument();
  });

  it("renders the Beans component", () => {
    const { getByTestId } = render(<MemoryRouter>
        <Footer />
      </MemoryRouter>);
    const beans = getByTestId("beans");
    expect(beans).toBeInTheDocument();
  });

  it("renders the footer-bottom div", () => {
    const { getByTestId } = render(<MemoryRouter>
        <Footer />
      </MemoryRouter>);
    const footerBottom = getByTestId("footer-bottom");
    expect(footerBottom).toBeInTheDocument();
  });
});