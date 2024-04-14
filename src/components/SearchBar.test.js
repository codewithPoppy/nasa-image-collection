import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import {
  SEARCH_TEXT,
  YEAR_END_LABEL,
  YEAR_START_LABEL,
} from "../utils/constants";
import SearchBar from "./SearchBar";

// Mocking constants
jest.mock("../utils/constants", () => ({
  QUERY_ERROR_MESSAGE: "Please enter a query",
  SEARCH_TEXT: "Search",
  YEAR_END_ERROR_MESSAGE: "Invalid end year",
  YEAR_END_LABEL: "End Year",
  YEAR_START_ERROR_MESSAGE: "Invalid start year",
  YEAR_START_LABEL: "Start Year",
}));

const mockReducer = (
  state = { search: { query: "", yearStart: "", yearEnd: "" } },
  action
) => state;
const store = createStore(mockReducer);

describe("SearchBar Component", () => {
  const mockOnSearch = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  })
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <SearchBar onSearch={mockOnSearch} />
      </Provider>
    );
    expect(screen.getByLabelText(SEARCH_TEXT)).toBeInTheDocument();
  });

  it("submits form with input values", async () => {
    render(
      <Provider store={store}>
        <SearchBar onSearch={mockOnSearch} />
      </Provider>
    );
    userEvent.type(screen.getByLabelText(SEARCH_TEXT), "Mars");
    userEvent.type(screen.getByLabelText(YEAR_START_LABEL), "2000");
    userEvent.type(screen.getByLabelText(YEAR_END_LABEL), "2020");
    fireEvent.submit(screen.getByRole("button"));

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith(
        {
          query: "Mars",
          yearStart: "2000",
          yearEnd: "2020",
        },
        1
      );
    });
  });

  it("validates year input correctly", async () => {
    render(
      <Provider store={store}>
        <SearchBar onSearch={mockOnSearch} />
      </Provider>
    );
    userEvent.type(screen.getByLabelText("Start Year"), "1899");
    fireEvent.blur(screen.getByLabelText("Start Year"));
    expect(await screen.findByText("Invalid start year")).toBeInTheDocument();
  });
});
