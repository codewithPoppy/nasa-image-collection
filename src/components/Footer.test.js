import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Footer from "./Footer";

// Mock the constants
jest.mock("../utils/constants", () => ({
  FOOTER_TEXT1: "Powered by ",
  FOOTER_TEXT2: "NASA Image Library",
}));

describe("Footer Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  })
  it("renders without crashing", () => {
    render(<Footer />);
    expect(screen.getByText("Powered by")).toBeInTheDocument();
    expect(screen.getByText("NASA Image Library")).toBeInTheDocument();
  });

  it("contains correct link with attributes", () => {
    render(<Footer />);
    const linkElement = screen.getByText("NASA Image Library");
    expect(linkElement).toHaveAttribute("href", "https://images.nasa.gov/");
    expect(linkElement).toHaveAttribute("target", "_blank");
    expect(linkElement).toHaveAttribute("rel", "noopener noreferrer");
  });
});
