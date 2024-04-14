import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  yearStart: "",
  yearEnd: "",
  results: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setYearStart: (state, action) => {
      state.yearStart = action.payload;
    },
    setYearEnd: (state, action) => {
      state.yearEnd = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPageNum: (state, action) => {
      state.pageNum = action.payload;
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setQuery,
  setYearStart,
  setYearEnd,
  setResults,
  setLoading,
  setPageNum,
  setTotalCount,
  setError,
} = searchSlice.actions;

export default searchSlice.reducer;
