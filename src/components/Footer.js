import React from "react";
import { Layout } from "antd";

import { FOOTER_TEXT1, FOOTER_TEXT2 } from "../utils/constants";
import "../scss/Footer.scss";

const Footer = () => {
  return (
    <Layout.Footer className="footer">
      <div className="container">
        <p>
          {FOOTER_TEXT1}
          <a
            href="https://images.nasa.gov/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {FOOTER_TEXT2}
          </a>
        </p>
      </div>
    </Layout.Footer>
  );
};

export default Footer;
