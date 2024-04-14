import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import api from "../services/api";

import "../scss/SearchPage.scss";
import {
  setLoading,
  setPageNum,
  setQuery,
  setResults,
  setTotalCount,
  setYearEnd,
  setYearStart,
} from "../store/search";

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowDetail = (nasaId) => {
    navigate(`/show/${nasaId}`);
  };

  const onSearch = (params, page) => {
    // Make API call using axios
    dispatch(setPageNum(page));
    dispatch(setQuery(params.query));
    dispatch(setYearStart(params.yearStart));
    dispatch(setYearEnd(params.yearEnd));
    const searchParam = {
      q: params.query,
      media_type: "image",
      page_size: 12,
      page,
    };
    if (params.yearStart) searchParam.year_start = params.yearStart;
    if (params.yearEnd) searchParam.year_end = params.yearEnd;
    dispatch(setLoading(true));
    api
      .get("/search", {
        params: searchParam,
      })
      .then((res) => {
        dispatch(setResults(res.data.collection.items));
        dispatch(setLoading(false));
        dispatch(setTotalCount(res.data.collection.metadata.total_hits));
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="search">
      <SearchBar onSearch={onSearch} />
      <SearchResults onSearch={onSearch} onShowDetail={handleShowDetail} />
    </div>
  );
};

export default Search;
