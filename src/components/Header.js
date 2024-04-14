import { Layout } from "antd";
import React from "react";

import { HEADER_TEXT } from "../utils/constants";
import "../scss/Header.scss";

const Header = () => {
  return (
    <Layout.Header className="header">
      <div className="container">
        <h1>{HEADER_TEXT}</h1>
      </div>
    </Layout.Header>
  );
};

export default Header;
