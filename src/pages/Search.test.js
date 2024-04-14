import { fireEvent, screen, waitFor } from "@testing-library/react";
import React from "react";
import { renderWithProviders } from "../utils/test-utils";
import Search from "./Search";

jest.mock("../components/SearchBar", () => ({ onSearch }) => (
  <button
    onClick={() =>
      onSearch({ query: "moon", yearStart: "2020", yearEnd: "2021" }, 1)
    }
  >
    Search
  </button>
));
jest.mock("../components/SearchResults", () => ({ onShowDetail }) => (
  <div onClick={() => onShowDetail("nasa_1")}>SearchResults</div>
));

jest.mock("../services/api", () => ({
  get: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn().mockReturnValue({}),
  useDispatch: () => mockDispatch,
}));

describe("Search", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  })
  beforeEach(() => {
    mockDispatch.mockClear();
    jest.resetAllMocks();
  });

  it("should render SearchBar and SearchResults components", () => {
    renderWithProviders(<Search />);
    expect(screen.getByText("SearchResults")).toBeInTheDocument();
  });

  it("handleShowDetail should be called on onShowDetail event", async () => {
    renderWithProviders(<Search />);
    fireEvent.click(screen.getByText("SearchResults"));
    await waitFor(() => {
      expect(mockNavigate).toBeCalled();
    });
  });

  it("onSearch should dispatch actions and call API", async () => {
    const api = require("../services/api");
    api.get.mockResolvedValue({
      data: {
        collection: {
          items: [],
          metadata: { total_hits: 10 },
        },
      },
    });

    renderWithProviders(<Search />);

    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(mockDispatch).toBeCalledTimes(8);
    });
    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith("/search", {
        params: {
          q: "moon",
          media_type: "image",
          page_size: 12,
          page: 1,
          year_start: "2020",
          year_end: "2021",
        },
      });
    });
  });

  it("onSearch should alert message when error occured", async () => {
    const api = require("../services/api");
    api.get.mockRejectedValue(new Error("Error"));
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    renderWithProviders(<Search />);

    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(mockDispatch).toBeCalledTimes(5);
    });
    await waitFor(() => {
      expect(alertSpy).toBeCalled();
    });
  });
});
