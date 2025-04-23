import React, { useRef, useState, useEffect } from "react";
import HeaderComponent from "../../components/Header/HeaderComponent";
import FooterComponent from "../../components/Footer/FooterComponent";
import { Button, Card, Carousel, Col, Image, Input, Layout, Row } from "antd";
import {
  CaretLeftFilled,
  CaretRightFilled,
  EyeOutlined,
  UpOutlined,
} from "@ant-design/icons";
import imgProduct from "../../assets/product.jpg";
import FormatCurrent from "../../services/FormatCurrent";
import type { CarouselRef } from "antd/es/carousel";
import CardProduct from "../../components/CardProduct";
import RelateProduct from "../../components/RelateProduct";
import { useParams } from "react-router-dom";
import { mockProducts } from "../../types/mockProduct";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(mockProducts[0]);

  useEffect(() => {
    // Tìm sản phẩm dựa trên id từ URL
    const foundProduct = mockProducts.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  const image = {
    images: [
      imgProduct,
      imgProduct,
      imgProduct,
      imgProduct,
      imgProduct,
      imgProduct,
      imgProduct,
      imgProduct,
    ],
  };

  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<CarouselRef>(null);
  const [activeToggle, setActiveToggle] = useState(null);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    // Cập nhật màu mặc định khi product thay đổi
    if (product && product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  const handleThumnail = (index: number) => {
    if (carouselRef.current) {
      carouselRef.current.goTo(index);
      setCurrentSlide(index);
    }
  };

  const handleQuantityChange = (value: number) => {
    if (value < 1) return;
    setQuantity(value);
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleAddToCart = () => {
    alert(
      `Đã thêm ${quantity} ${product.name} màu ${selectedColor} vào giỏ hàng`
    );
  };

  const handlePay = () => {
    window.location.href = `/checkout?product=${encodeURIComponent(JSON.stringify({
      id: product.id,
      name: product.name,
      price: product.price,
      color: selectedColor,
      quantity: quantity,
      image: image.images[0]
    }))}`;
  };

  if (!product) {
    return <div>Không tìm thấy sản phẩm</div>;
  }

  return (
    <Layout>
      <HeaderComponent />
      <div className="flex flex-wrap gap-20 p-28">
        <div className="img-product w-[500px]">
          <style>
            {`
              .thumbnail-active {
                border: 1px solid #ee4d2d !important;
              }
            `}
          </style>

          <div className="product-carousel">
            <Carousel
              autoplay={false}
              className="product-carousel"
              dots={true}
              ref={carouselRef}
              afterChange={(current) => setCurrentSlide(current)}
            >
              {image.images.map((image, index) => (
                <div key={index}>
                  <div
                    style={{
                      height: "500px",
                      background: "#f8f8f8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src={image}
                      preview={{
                        mask: (
                          <div
                            style={{
                              color: "#fff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "100%",
                            }}
                          >
                            <EyeOutlined style={{ fontSize: 24 }} />
                          </div>
                        ),
                      }}
                      alt={`Product Image ${index + 1}`}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          <div className="relative mt-[20px] px-[25px] py-[25px] select-none">
            <div
              className="absolute flex items-center justify-center cursor-pointer z-[1] top-[50%] transform -translate-y-1/2 w-8 h-8 rounded-full left-0 prev"
              onClick={() => {
                const container = document.querySelector(".thumbnail-scroll");
                if (container) {
                  container.scrollLeft -= 100;
                }
              }}
            >
              <CaretLeftFilled />
            </div>
            <div className="thumbnail-scroll flex overflow-x-hidden scroll-smooth">
              {image.images.map((image, index) => (
                <div
                  key={index}
                  className={`w-[90px] h-[80px] cursor-pointer border-2 border-transparent hover:border-[#ee4d2d] ${
                    index === currentSlide ? "thumbnail-active" : ""
                  }`}
                  onClick={() => handleThumnail(index)}
                  style={{
                    flexShrink: 0,
                    background: "#f8f8f8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className=" max-h-full object-contain"
                    style={{
                      width: "90px",
                      opacity: index === currentSlide ? 1 : 0.6,
                      transition: "opacity 0.3s ease",
                    }}
                  />
                </div>
              ))}
            </div>
            <div
              className="absolute flex items-center justify-center cursor-pointer z-[1] top-[50%] transform -translate-y-1/2 w-8 h-8 rounded-full right-0 next"
              onClick={() => {
                const container = document.querySelector(".thumbnail-scroll");
                if (container) {
                  container.scrollLeft += 100;
                }
              }}
            >
              <CaretRightFilled />
            </div>
          </div>
        </div>
        <div className="product-detail flex flex-col text-left gap-2">
          <h1 className="product-title text-[24px] font-bold">
            {product.name}
          </h1>

          <div className="product-price text-[20px] mt-4" style={{ fontWeight: "600" }}>
            <FormatCurrent price={product.price} />
          </div>

          <div className="product-description mt-6 text-gray-600">
            {product.description}
          </div>

          <div className="specifications flex flex-col gap-2 mt-6">
            <h3 className="text-[16px] font-semibold mb-2">
              Thông số kỹ thuật:
            </h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li>Chất liệu: {product.specifications.material}</li>
              <li>Kích thước: {product.specifications.dimensions}</li>
              <li>Bảo hành: {product.specifications.warranty}</li>
            </ul>
          </div>

          <div className="product-color mt-8">
            <span className="block mb-3 font-medium">Màu sắc</span>
            <div className="color-option flex gap-3 mb-6">
              {product.colors.map((color) => (
                <Button
                  key={color}
                  className={`color-button ${
                    selectedColor === color ? "selected" : ""
                  }`}
                  style={{ borderRadius: "45%", boxShadow: "none" }}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </Button>
              ))}
            </div>

            <div className="quantity flex flex-col gap-3 pb-4">
              <span className="font-medium mr-4">Số lượng:</span>
              <div style={{ border: "1px solid #7d7d7d", width: "100px" }}>
                <Button
                  size="small"
                  className="button-quantity"
                  style={{
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "#f5f5f5",
                  }}
                  onClick={() => handleQuantityChange(quantity - 1)}
                >
                  -
                </Button>
                <Input
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(
                      e.target.value.replace(/[^0-9]/g, "")
                    );
                    if (!isNaN(value) && value >= 1) {
                      handleQuantityChange(value);
                    }
                  }}
                  style={{
                    width: 50,
                    textAlign: "center",
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "#f5f5f5",
                  }}
                />
                <Button
                  size="small"
                  className="button-quantity"
                  style={{
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "#f5f5f5",
                  }}
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            <Button
              type="default"
              className="btn-add-cart mt-8 w-full h-12 text-[16px] no-hover"
              style={{borderRadius: "2px"}}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              type="primary"
              className="btn-pay w-full h-12 text-[16px]"
              style={{backgroundColor: '#4524db', marginTop: '10px', borderRadius: "2px" }}
              onClick={handlePay}
            >
              Buy Now
            </Button>
          </div>
        </div>
        <div className="description border-t-2 border-gray-200">
          <div
            className="flex w-2xl justify-between items-center cursor-pointer"
            onClick={toggleDescription}
          >
            <h2 className="text-[24px] font-bold mb-2 text-left">
              Description
            </h2>
            {showDescription ? (
              <svg
                width={20}
                style={{ marginTop: 10 }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
              </svg>
            ) : (
              <svg
                width={20}
                style={{ marginTop: 10 }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
              </svg>
            )}
          </div>

          {showDescription && (
            <p className="text-[16px] text-gray-600 mt-2 text-left">
              ・{product.description}
            </p>
          )}
        </div>
        <div className="description border-t-2 border-gray-200">
          <div
            className="flex w-2xl justify-between items-center cursor-pointer"
            onClick={toggleDescription}
          >
            <h2 className="text-[24px] font-bold mb-2 text-left">Delivery</h2>
            {showDescription ? (
              <svg
                width={20}
                style={{ marginTop: 10 }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
              </svg>
            ) : (
              <svg
                width={20}
                style={{ marginTop: 10 }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
              </svg>
            )}
          </div>

          {showDescription && (
            <p className="max-w-xl text-[16px] text-gray-600 mt-2 text-left flex flex-col text-sm/loose">
              <span>
                ・Sản phẩm thuộc diện Pre-order (đặt trước), thời gian xử lý đơn
                hàng từ 5 đến 7 ngày làm việc (không bao gồm cuối tuần và ngày
                lễ).
              </span>
              <span>
                ・Sau khi hoàn tất xử lý, hàng sẽ được giao theo thời gian tiêu
                chuẩn của đơn vị vận chuyển (thường từ 1-3 ngày tuỳ khu vực).
              </span>
              <span>
                ・Tổng thời gian nhận hàng dự kiến: 6-10 ngày làm việc kể từ khi
                đặt hàng.
              </span>
              <span>
                ・Trong trường hợp có thay đổi hoặc chậm trễ, chúng tôi sẽ liên
                hệ trực tiếp để cập nhật tình trạng đơn hàng.
              </span>
            </p>
          )}
        </div>
        <div className="related-products w-full mt-8 border-t-2 border-gray-200 pt-8">
          <h2 className="text-[24px] font-bold mb-6 text-left">
            Recommended for You
          </h2>
          <Row gutter={[0, 16]} className="pt-5 justify-center">
            {mockProducts
              .filter(p => p.id !== product.id)
              .sort(() => Math.random() - 0.5)
              .slice(0, 4)
              .map((p) => (
                <Col xs={24} sm={10} md={5} key={p.id}>
                  <RelateProduct product={p} />
                </Col>
              ))}
          </Row>
        </div>
      </div>
      <FooterComponent />
    </Layout>
  );
};

export default ProductDetail;