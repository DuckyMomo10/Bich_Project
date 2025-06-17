import { Card, Typography, message } from "antd";
import { useState } from "react";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import imgProduct from "../assets/product.jpg";
import FormatCurrent from "../services/FormatCurrent";
import { ProductType } from "../types/Product";
import { Link } from "react-router-dom";
import { useFavourite } from "../context/FavouriteContext";
const { Title } = Typography;
const { Text } = Typography;

interface ExtendedProduct extends ProductType {
}

const CardProduct = ({ product }: { product: ExtendedProduct }) => {
  const [like, setLike] = useState(false);
  const { toggleFavourite, isFavourite } = useFavourite();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleLike = () => {
    setLike(!like);
    toggleFavourite(product);
    message.success(
      !like ? "Đã thêm vào yêu thích!" : "Đã xóa khỏi yêu thích!"
    );
  };

  // Lấy ảnh đầu tiên từ mảng images hoặc sử dụng ảnh mặc định
  const productImage = product.images?.[0] || imgProduct;

  return (
    <div className="noto-card">
      <Card
        style={{ 
          width: 260, 
          position: "relative", 
          border: "none",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          transition: "transform 0.3s ease",
          transform: isHovered ? "translateY(-5px)" : "none"
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        bodyStyle={{paddingLeft: 20, paddingTop: 10}}
        cover={
          <div style={{ position: "relative", overflow: "hidden", height: 280 }}>
            <Link to={`/product/${product._id}`}>
              <img
                alt={product.name}
                src={productImage}
                className="transition-transform duration-300"
                style={{
                  width: "100%", 
                  height: 280, 
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                }}
              />
            </Link>
            <div
              onClick={handleLike}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                cursor: "pointer",
                padding: "8px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease"
              }}
            >
              {isFavourite(product._id) ? (
                <HeartFilled style={{ fontSize: 22, color: "red" }} />
              ) : (
                <HeartOutlined style={{ fontSize: 22, color: "#666" }} />
              )}
            </div>
          </div>
        }
      >
        <Link 
          to={`/product/${product._id}`} 
          style={{ 
            textDecoration: 'none', 
            color: 'inherit',
            display: 'block'
          }}
        >
          <Title 
            level={5} 
            style={{ 
              marginBottom: 0, 
              fontWeight: "bolder", 
              textAlign: 'left',
              fontSize: '16px',
              lineHeight: '1.4',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {product.name}
          </Title>
          <div 
            className="price flex items-center gap-2" 
            style={{ 
              marginTop: 8,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span 
              className="font-semibold text-red-500"
              style={{
                fontSize: '16px',
                fontWeight: 600
              }}
            >
              <FormatCurrent price={product.price} />
            </span>
          </div>
          <Text
            style={{
              fontSize: '13px',
              color: '#666',
              marginTop: '4px',
              height: '36px',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              textAlign: 'left',
            }}
          >
            {product.description}
          </Text>

          <div
            style={{
              marginTop: 10,
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {product.color && product.color.length > 0 && (
              <div style={{ marginRight: 5, fontSize: "14px", color: "#555" }}>Color</div>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {product.color?.map((color, index) => (
                <div
                  key={index}
                  title={color}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    border: "1px solid #ddd",
                    backgroundColor: color,
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    ...(selectedColor === color && { border: "2px solid #333" })
                  }}
                  onClick={() => setSelectedColor(color)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
              ))}
            </div>
          </div>
        </Link>
      </Card>
    </div>
  );
};

export default CardProduct; 