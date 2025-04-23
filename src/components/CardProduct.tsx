import { Card, Typography, message } from "antd";
import React, { useState } from "react";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import imgProduct from "../assets/product.jpg";
import FormatCurrent from "../services/FormatCurrent";
import { ProductType } from "../types/Product";
import { Link } from "react-router-dom";
import { useFavourite } from "../context/FavouriteContext";
const { Title } = Typography;

interface ExtendedProduct extends ProductType {
  oldPrice?: number;
}

const colors = ["#ad7a2b", "#775621", "#5e4318"];

const CardProduct = ({ product }: { product: ExtendedProduct }) => {
  const [like, setLike] = useState(false);
  const { favourites, toggleFavourite, isFavourite } = useFavourite();

  const handleLike = () => {
    setLike(!like);
    toggleFavourite(product);
    message.success(
      !like ? "Đã thêm vào yêu thích!" : "Đã xóa khỏi yêu thích!"
    );
  };

  return (
    <div className="noto-card">
      <Card
        style={{ width: 260, position: "relative", border: "none" }}
        bodyStyle={{paddingLeft: 5, paddingTop: 10}}
        cover={
          <div style={{ position: "relative", overflow: "hidden", height: 280 }}>
            <Link to={`/product/${product.id}`}>
              <img
                alt="Product"
                src={product.image || imgProduct}
                className="transition-transform duration-300 hover:scale-105"
                style={{ width: "100%", height: 280, objectFit: "cover" }}
              />
            </Link>
            {like ? (
              <HeartFilled
                onClick={handleLike}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  fontSize: 22,
                  color: "red",
                  cursor: "pointer",
                }}
              />
            ) : (
              <HeartOutlined
                onClick={handleLike}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  fontSize: 22,
                  color: "#666",
                  cursor: "pointer",
                }}
              />
            )}
          </div>
        }
      >
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }} className="a">
          <Title level={5} style={{ marginBottom: 0, fontWeight: "normal", textAlign:'left' }}>
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
              style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap", alignItems: "start" }}
            >
              {colors.map((color, index) => (
                <div
                  key={index}
                  title={color}
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    border: "1px solid #ccc",
                    backgroundColor: color,
                  }}
                />
              ))}
            </div>
        </Link>
      </Card>
    </div>
  );
};

export default CardProduct; 