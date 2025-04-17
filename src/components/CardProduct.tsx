import { Card, Typography, message } from "antd";
import React, { useState } from "react";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import imgProduct from "../assets/product.jpg"; // ảnh mặc định
import FormatCurrent from "../services/FormatCurrent";
import { ProductType } from "../types/Product";
import { Link } from "react-router-dom"; // Sửa lại import Link
import { useFavourite } from "../context/FavouriteContext";
const { Title } = Typography;

interface ExtendedProduct extends ProductType {
  oldPrice?: number;
}

const colors = ["#ad7a2b", "#775621", "#5e4318"];

const CardProduct = ({ product }: { product: ExtendedProduct }) => {
  const [like, setLike] = useState(false);
  const { favourites, toggleFavourite, isFavourite } = useFavourite(); // Sửa lại cách lấy context

  const handleLike = () => {
  setLike(!like);
    toggleFavourite(product); // Gọi toggleFavourite khi nhấn vào trái tim
    message.success(
      !like ? "Đã xóa khỏi yêu thích!" : "Đã thêm vào yêu thích!"
    );
  };

  return (
    <div className="noto-card">
      <Card
        style={{ width: 260, position: "relative", border: "none" }}
        cover={
          <div
            style={{ position: "relative", overflow: "hidden", height: 280 }}
          >
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
        <Title
          level={5}
          style={{ marginBottom: 0, display: "flex", fontWeight: "normal" }}
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
                width: 18,
                height: 18,
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

export default CardProduct;
