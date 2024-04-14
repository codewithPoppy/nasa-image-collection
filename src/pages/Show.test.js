import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import axios from "axios";
import Show from "./Show";
import { BACK_LABEL } from "../utils/constants";

// Setup common properties for tests
const mockNavigate = jest.fn();
const mockUseParams = jest.fn();

// Mock necessary modules
jest.mock("axios", () => ({
  __esModule: true,
  default: {
    ...jest.requireActual("axios"),
    all: jest.fn(),
  },
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useParams: () => mockUseParams,
}));

jest.mock("../services/api", () => ({
  get: jest.fn(),
}));

describe("Show Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  })
  beforeEach(() => {
    mockUseParams.mockReturnValue({ nasaId: "12345" });
    mockNavigate.mockImplementation(jest.fn());
    axios.all.mockImplementation(() =>
      Promise.resolve([
        {
          data: {
            collection: {
              items: [
                {
                  data: [
                    {
                      title: "Example Title",
                      description: "Example Description",
                      date_created: "2022-01-01",
                      keywords: ["Space", "NASA"],
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          data: {
            collection: { items: [{ href: "http://example.com/image.jpg" }] },
          },
        },
      ])
    );
  });

  it("renders and displays data correctly after API call", async () => {
    render(<Show />);
    await screen.findByText("Example Title");
    expect(screen.getByText("Example Description")).toBeInTheDocument();
    expect(screen.getByText("Space")).toBeInTheDocument();
    expect(screen.getByText("NASA")).toBeInTheDocument();
    expect(screen.getByText("2022-01-01")).toBeInTheDocument();
    expect(screen.getByAltText("Example Title")).toHaveAttribute(
      "src",
      "http://example.com/image.jpg"
    );
  });

  it("handles API errors gracefully", async () => {
    axios.all.mockImplementation(() => Promise.reject(new Error("API Error")));
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    render(<Show />);
    await waitFor(() => {
      expect(alertSpy).toBeCalled();
    });
  });

  it("navigates back when back button is clicked", async () => {
    render(<Show />);
    await screen.findByText(BACK_LABEL);
    const backButton = screen.getByText(BACK_LABEL);
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
