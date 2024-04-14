import React from "react";
import { Card } from "antd";

const Image = ({ image }) => {
  return (
    <Card hoverable>
      <img src={image.href} alt={image.title} />
      <p>{image.title}</p>
    </Card>
  );
};

export default Image;