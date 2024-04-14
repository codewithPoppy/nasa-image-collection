import { CameraOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Card, Pagination } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { LOADING_TEXT, NO_RESULT_TEXT, PAGE_SIZE } from "../utils/constants";

const SearchResults = ({ onSearch, onShowDetail }) => {
  const results = useSelector((state) => state.search.results);
  const loading = useSelector((state) => state.search.loading);
  const pageNum = useSelector((state) => state.search.pageNum);
  const totalCount = useSelector((state) => state.search.totalCount);
  const query = useSelector((state) => state.search.query);
  const yearStart = useSelector((state) => state.search.yearStart);
  const yearEnd = useSelector((state) => state.search.yearEnd);

  const handleShowDetail = (nasaId) => {
    onShowDetail(nasaId);
  };

  return (
    <div>
      {loading ? (
        <p>{LOADING_TEXT}</p>
      ) : (
        <>
          {results.length > 0 ? (
            <>
              <div>
                <Pagination
                  responsive={true}
                  showSizeChanger={false}
                  current={pageNum}
                  pageSize={PAGE_SIZE}
                  total={totalCount}
                  onChange={(page) => {
                    onSearch({ query, yearStart, yearEnd }, page);
                  }}
                />
              </div>
              <div className="search-results">
                {results.map((result, idx) => (
                  <Card
                    key={idx}
                    hoverable
                    onClick={() => handleShowDetail(result.data[0].nasa_id)}
                  >
                    <img
                      src={result.links[0].href}
                      alt={result.data[0].title}
                    />
                    <div className="card-content">
                      <h3>{result.data[0].title}</h3>
                      {result.data[0].location ? (
                        <p>
                          <EnvironmentOutlined /> {result.data[0].location}
                        </p>
                      ) : (
                        <></>
                      )}
                      {result.data[0].photographer ? (
                        <p>
                          <CameraOutlined /> {result.data[0].photographer}
                        </p>
                      ) : (
                        <></>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <p>{NO_RESULT_TEXT}</p>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
