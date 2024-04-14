import { Button, Form, Input } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import {
  QUERY_ERROR_MESSAGE,
  SEARCH_TEXT,
  YEAR_END_ERROR_MESSAGE,
  YEAR_END_LABEL,
  YEAR_START_ERROR_MESSAGE,
  YEAR_START_LABEL
} from "../utils/constants";

const SearchBar = ({ onSearch }) => {
  const [form] = Form.useForm();

  const { query, yearStart, yearEnd } = useSelector((state) => state.search);

  const handleSubmit = (values) => {
    onSearch(values, 1);
  };

  return (
    <Form
      form={form}
      className="search-bar"
      onFinish={handleSubmit}
      initialValues={{
        query,
        yearStart,
        yearEnd,
      }}
    >
      <Form.Item
        label={SEARCH_TEXT}
        name="query"
        rules={[{ required: true, message: QUERY_ERROR_MESSAGE }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={YEAR_START_LABEL}
        name="yearStart"
        rules={[
          {
            validator: (_, value) => {
              if (
                value &&
                (isNaN(value) ||
                  value < 1900 ||
                  value > new Date().getFullYear())
              ) {
                return Promise.reject(new Error(YEAR_START_ERROR_MESSAGE));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={YEAR_END_LABEL}
        name="yearEnd"
        rules={[
          {
            validator: (_, value) => {
              if (
                value &&
                (isNaN(value) ||
                  value < 1900 ||
                  value > new Date().getFullYear())
              ) {
                return Promise.reject(new Error(YEAR_END_ERROR_MESSAGE));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {SEARCH_TEXT}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SearchBar;
