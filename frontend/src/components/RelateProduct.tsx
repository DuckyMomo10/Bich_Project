import { Card, Typography } from "antd";
// import React, { useState } from "react";
import imgProduct from "../assets/product.jpg"; // ảnh mặc định
import FormatCurrent from "../services/FormatCurrent";
import { ProductType } from "../types/Product";
import { Link } from "react-router-dom"; // Sửa lại import Link
const { Title } = Typography;

interface ExtendedProduct extends ProductType {
  oldPrice?: number;
}

const colors = ["#ad7a2b", "#775621", "#5e4318"];

const RelateProduct = ({ product }: { product: ExtendedProduct }) => {
  return (
    <div className="noto-card">
      <Card
        style={{ width: 200, height: 330, position: "relative", border: "none" }}
        bodyStyle={{paddingLeft: 5, paddingTop: 10}}
        cover={
          <div
            style={{ position: "relative", overflow: "hidden", height: 200 }}
          >
            <Link to={`/product/${product._id}`}>
              <img
                alt="Product"
                src={product.images[0] || imgProduct}
                className="transition-transform duration-300 hover:scale-105"
                style={{ width: "100%", height: 200, objectFit: "cover" }}
              />
            </Link>
          </div>
        }
      >
        <Title
          level={5}
          style={{ marginBottom: 0, display: "flex", fontWeight: "normal", fontSize: 11 }}
        >
          {product.name}
        </Title>
        <div className="price flex items-center gap-2" style={{ marginTop: 8 }}>
          <span
            className="line-through text-gray-400 text-[12px]"
            style={{ marginTop: 3 }}
          >
            <FormatCurrent price={product.oldPrice || product.price} />
          </span>
          <span className="font-semibold text-red-500 text-base">
            <FormatCurrent price={product.price} />
          </span>
        </div>

        <div
          style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}
        >
          {colors.map((color, index) => (
            <div
              key={index}
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: color,
                border: "1px solid #ccc",
              }}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default RelateProduct;
