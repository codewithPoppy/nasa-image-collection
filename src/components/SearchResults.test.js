import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchResults from "./SearchResults";
import { renderWithProviders } from "./../utils/test-utils";
import { LOADING_TEXT, NO_RESULT_TEXT } from "../utils/constants";

// Mocking constants
jest.mock("../utils/constants", () => ({
  LOADING_TEXT: "Loading...",
  NO_RESULT_TEXT: "No results found.",
  PAGE_SIZE: 10,
}));

const initialState = {
  search: {
    results: [],
    loading: false,
    pageNum: 1,
    totalCount: 0,
    query: "",
    yearStart: "",
    yearEnd: "",
  },
};

describe("SearchResults Component", () => {
  const mockOnSearch = jest.fn();
  const mockOnShowDetail = jest.fn();
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  })

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays loading text when loading", () => {
    renderWithProviders(
      <SearchResults onSearch={mockOnSearch} onShowDetail={mockOnShowDetail} />,
      {
        preloadedState: {
          search: { ...initialState.search, loading: true },
        },
      }
    );
    expect(screen.getByText(LOADING_TEXT)).toBeInTheDocument();
  });

  it("displays no results text when there are no results", () => {
    renderWithProviders(
      <SearchResults onSearch={mockOnSearch} onShowDetail={mockOnShowDetail} />,
      {
        preloadedState: initialState,
      }
    );
    expect(screen.getByText(NO_RESULT_TEXT)).toBeInTheDocument();
  });

  it("renders results and handles pagination", () => {
    renderWithProviders(
      <SearchResults onSearch={mockOnSearch} onShowDetail={mockOnShowDetail} />,
      {
        preloadedState: {
          search: {
            ...initialState.search,
            results: [
              {
                data: [{ nasa_id: "123", title: "A Cool Star" }],
                links: [{ href: "url_to_image" }],
              },
            ],
            totalCount: 100,
          },
        },
      }
    );

    expect(screen.getByText("A Cool Star")).toBeInTheDocument();
    fireEvent.click(screen.getByText("2"));
    expect(mockOnSearch).toHaveBeenCalledWith(
      { query: "", yearStart: "", yearEnd: "" },
      2
    );
  });

  it("clicking on a result card calls onShowDetail", () => {
    renderWithProviders(
      <SearchResults onSearch={mockOnSearch} onShowDetail={mockOnShowDetail} />,
      {
        preloadedState: {
          search: {
            ...initialState.search,
            results: [
              {
                data: [{ nasa_id: "123", title: "A Cool Star" }],
                links: [{ href: "url_to_image" }],
              },
            ],
            totalCount: 1,
          },
        },
      }
    );

    fireEvent.click(screen.getByText("A Cool Star"));
    expect(mockOnShowDetail).toHaveBeenCalledWith("123");
  });
});
