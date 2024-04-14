import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Card, Col, Image, Row, Tag } from "antd";
import axios from "axios";
import moment from "moment";

import {
  BACK_LABEL,
  DATE_LABEL,
  KEYWORDS_LABEL,
  LOADING_TEXT,
  PHOTOGRAPHER_LABEL,
} from "../utils/constants";
import api from "./../services/api";
import "../scss/ShowPage.scss";

const Show = () => {
  const navigate = useNavigate();
  const { nasaId } = useParams();
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make API
    axios
      .all([api.get(`/search?nasa_id=${nasaId}`), api.get(`/asset/${nasaId}`)])
      .then(
        axios.spread((...data) => {
          setResult({
            ...data[0].data.collection.items[0].data[0],
            href:
              data[1].data.collection.items[1]?.href ||
              data[1].data.collection.items[0].href,
          });
          setLoading(false);
        })
      )
      .catch((err) => {
        alert(err.message);
      });
  }, [nasaId]);

  return (
    <div className="show">
      {loading ? (
        <p>{LOADING_TEXT}</p>
      ) : (
        <>
          <Row gutter={16}>
            <Col span={12}>
              <Button onClick={() => navigate(-1)}>
                <ArrowLeftOutlined />
                {BACK_LABEL}
              </Button>
              <Card hoverable>
                <Image src={result.href} alt={result.title} />
              </Card>
            </Col>
            <Col span={12}>
              <Card title={result.title}>
                <p>{result.description}</p>
                {result.keywords ? (
                  <p>
                    <b>{KEYWORDS_LABEL}</b>
                    {result.keywords.map((keyword) => (
                      <Tag key={keyword} bordered={false} color="processing">
                        {keyword}
                      </Tag>
                    ))}
                  </p>
                ) : (
                  <></>
                )}
                {result.date_created ? (
                  <p>
                    <b>{DATE_LABEL}</b>{" "}
                    {moment(result.date_created).format("YYYY-MM-DD")}
                  </p>
                ) : (
                  <></>
                )}
                {result.photographer || result.secondary_creator ? (
                  <p>
                    <b>{PHOTOGRAPHER_LABEL}</b>
                    {result.photographer || result.secondary_creator}
                  </p>
                ) : (
                  <></>
                )}
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Show;
