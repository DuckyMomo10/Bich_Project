import { useRef, useState, useEffect } from "react";
import HeaderComponent from "../../components/Header/HeaderComponent";
import FooterComponent from "../../components/Footer/FooterComponent";
import {
  Button,
  Carousel,
  Col,
  Image,
  Input,
  Layout,
  Row,
  InputNumber,
  message,
  Tooltip,
  Space,
  Spin,
  Alert,
} from "antd";
import {
  CaretLeftFilled,
  CaretRightFilled,
  EyeOutlined,
} from "@ant-design/icons";
import FormatCurrent from "../../services/FormatCurrent";
import type { CarouselRef } from "antd/es/carousel";
import RelateProduct from "../../components/RelateProduct";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { ProductType } from "../../types/Product";

const ProductDetail = () => {
  const { id } = useParams();

  const getProductDetail = async () => {
    const { data } = await axiosInstance.get(`products/product/${id}`);
    return data;
  };

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery<ProductType>({
    queryKey: ["productDetail", id],
    queryFn: getProductDetail,
    enabled: !!id,
  });

  const getRelatedProducts = async () => {
    if (!product?.category) return [];
    const { data } = await axiosInstance.get(`products/category/${product.category}`);
    return data.filter((p: ProductType) => p._id !== product._id);
  };

  const {
    data: relatedProducts,
    isLoading: isLoadingRelatedProducts,
    isError: isErrorRelatedProducts,
    error: relatedProductsError,
  } = useQuery<ProductType[]>(
    {
      queryKey: ["relatedProducts", product?.category],
      queryFn: getRelatedProducts,
      enabled: !!product?.category,
    }
  );

  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<CarouselRef>(null);
  const [showDescription, setShowDescription] = useState(false);
  const [showDelivery, setShowDelivery] = useState(false);

  useEffect(() => {
    if (product && product.color && product.color.length > 0) {
      setSelectedColor(product.color[0]);
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

  const toggleDelivery = () => {
    setShowDelivery(!showDelivery);
  };

  const handleAddToCart = () => {
    if (!product) return;

    // Here you would typically add to cart logic
    message.success(
      `Đã thêm ${quantity} ${product.name} màu ${selectedColor} vào giỏ hàng`
    );
  };

  const handlePay = () => {
    if (!product) return;

    window.location.href = `/checkout?product=${encodeURIComponent(
      JSON.stringify({
        id: product._id,
        name: product.name,
        price: product.price,
        color: selectedColor,
        quantity: quantity,
        image: product.images?.[0],
      })
    )}`;
  };

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /><p>Đang tải chi tiết sản phẩm...</p></div>;
  }

  if (isError) {
    return <Alert message="Lỗi" description={`Không thể tải chi tiết sản phẩm: ${error?.message}`} type="error" showIcon />;
  }

  if (!product) {
    return <Alert message="Thông báo" description="Không tìm thấy sản phẩm." type="info" showIcon />;
  }

  return (
    <Layout>
      <HeaderComponent />
      <div className="container mx-auto px-4 py-8">
        <Row gutter={[32, 32]} justify="center">
          {/* Left side - Product Images */}
          <Col xs={24} md={12}>
            <div className="img-product">
              <div className="product-carousel">
                <Carousel
                  autoplay={false}
                  className="product-carousel"
                  dots={true}
                  ref={carouselRef}
                  afterChange={(current) => setCurrentSlide(current)}
                >
                  {product.images && product.images.length > 0 ? (
                    product.images.map((imgSrc, index) => (
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
                            src={imgSrc}
                            preview={{
                              mask: (
                                <div
                                  style={{
                                    color: "#fff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "100% ",
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
                    ))
                  ) : (
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
                        src="/default-image.jpg"
                        alt="Default Product Image"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  )}
                </Carousel>
              </div>

              <div className="relative mt-5 px-5 py-5 select-none">
                <div
                  className="absolute flex items-center justify-center cursor-pointer z-10 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full left-0 bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
                  onClick={() => {
                    const container =
                      document.querySelector(".thumbnail-scroll");
                    if (container) {
                      container.scrollLeft -= 100;
                    }
                  }}
                >
                  <CaretLeftFilled />
                </div>
                <div className="thumbnail-scroll flex overflow-x-hidden scroll-smooth gap-2">
                  {product.images && product.images.length > 0 ? (
                    product.images.map((imgSrc, index) => (
                      <div
                        key={index}
                        className={`w-[90px] h-[80px] cursor-pointer border-2 hover:border-[#ee4d2d] ${
                          index === currentSlide ? "thumbnail-active" : "border-transparent"
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
                          src={imgSrc}
                          alt={`Thumbnail ${index + 1}`}
                          className="max-h-full object-contain"
                          style={{
                            width: "90px",
                            opacity: index === currentSlide ? 1 : 0.6,
                            transition: "opacity 0.3s ease",
                          }}
                        />
                      </div>
                    ))
                  ) : (
                    <div
                      style={{
                        width: "90px",
                        height: "80px",
                        flexShrink: 0,
                        background: "#f8f8f8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src="/default-image-thumbnail.jpg"
                        alt="Default Thumbnail"
                        className="max-h-full object-contain"
                        style={{ width: "90px" }}
                      />
                    </div>
                  )}
                </div>
                <div
                  className="absolute flex items-center justify-center cursor-pointer z-10 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full right-0 bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
                  onClick={() => {
                    const container =
                      document.querySelector(".thumbnail-scroll");
                    if (container) {
                      container.scrollLeft += 100;
                    }
                  }}
                >
                  <CaretRightFilled />
                </div>
              </div>
            </div>
          </Col>

          {/* Right side - Product Details */}
          <Col xs={24} md={12}>
            <div className="product-detail flex flex-col text-left gap-6">
              <h1 className="product-title text-4xl font-bold mb-0 text-gray-800">
                {product.name}
              </h1>

              <div
                className="product-price text-3xl font-extrabold text-red-600"
              >
                <FormatCurrent price={product.price} />
              </div>

              <div className="product-color mt-4">
                <span className="block mb-3 font-semibold text-lg text-gray-700">Màu sắc:</span>

                <Space wrap size="small">
                  {product.color &&
                    product.color.map((color, index) => (
                      <Tooltip key={index} title={color}>
                        <button
                          onClick={() => setSelectedColor(color)}
                          style={{
                            backgroundColor: color,
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            border: selectedColor === color ? "3px solid #333" : "1px solid #ddd",
                            cursor: "pointer",
                            transition: "all 0.2s ease-in-out",
                            boxShadow: selectedColor === color ? "0 0 0 2px #fff, 0 0 0 4px " + color : "none",
                          }}
                        />
                      </Tooltip>
                    ))}
                </Space>
              </div>

              <div className="quantity flex flex-col gap-3 mt-4">
                <span className="font-semibold text-lg text-gray-700 mr-4">Số lượng:</span>
                <Input.Group compact style={{ width: '150px' }}>
                  <Button
                    style={{ borderRight: 0, borderRadius: '4px 0 0 4px', padding: '0 12px' }}
                    onClick={() => handleQuantityChange(quantity - 1)}
                  >
                    -
                  </Button>
                  <InputNumber
                    min={1}
                    value={quantity}
                    onChange={(value: number | null) => handleQuantityChange(value || 1)}
                    style={{ width: '60px', textAlign: 'center', borderLeft: 0, borderRight: 0, boxShadow: 'none' }}
                    controls={false} // Hide default controls
                  />
                  <Button
                    style={{ borderLeft: 0, borderRadius: '0 4px 4px 0', padding: '0 12px' }}
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    +
                  </Button>
                </Input.Group>
              </div>

              <div className="flex flex-col gap-4 mt-8">
                <Button
                  type="default"
                  size="large"
                  onClick={handleAddToCart}
                  style={{
                    height: '50px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    borderColor: '#2e3e38',
                    color: '#2e3e38',
                    backgroundColor: '#fff',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f0f0f0'; }}
                  onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fff'; }}
                >
                  Thêm vào giỏ hàng
                </Button>
                <Button
                  type="primary"
                  size="large"
                  onClick={handlePay}
                  style={{
                    height: '50px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    backgroundColor: '#2e3e38',
                    borderColor: '#2e3e38',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#1e2823'; e.currentTarget.style.borderColor = '#1e2823'; }}
                  onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#2e3e38'; e.currentTarget.style.borderColor = '#2e3e38'; }}
                >
                  Mua ngay
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* Description and Delivery Sections (collapsible) */}
        <div className="mt-12 text-left">
          <div className="description border-t border-b border-gray-300 py-6">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={toggleDescription}
            >
              <h2 className="text-2xl font-bold text-gray-800">Mô tả sản phẩm</h2>
              {showDescription ? (
                <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5 32.8 0 45.3l192-192z" fill="currentColor" /></svg>
              ) : (
                <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" fill="currentColor" /></svg>
              )}
            </div>

            {showDescription && (
              <div className="text-base text-gray-700 mt-4 leading-relaxed">
                <p className="mb-3"> - {product.description}</p>
                <h3 className="text-lg font-semibold mb-2"> - Thông số kỹ thuật:</h3>
                <ul className="list-disc pl-5 text-gray-700">
                  <li>Chất liệu: {product.material}</li>
                  <li>Thông số: {product.specification}</li>
                </ul>
              </div>
            )}
          </div>

          <div className="description border-b border-gray-300 py-6 mt-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={toggleDelivery}
            >
              <h2 className="text-2xl font-bold text-gray-800">Chính sách giao hàng</h2>
              {showDelivery ? (
                <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5 32.8 0 45.3l192-192z" fill="currentColor" /></svg>
              ) : (
                <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" fill="currentColor" /></svg>
              )}
            </div>

            {showDelivery && (
              <p className="text-base text-gray-700 mt-4 leading-relaxed flex flex-col">
                <span>
                  <li>
                  Sản phẩm thuộc diện Pre-order (đặt trước), thời gian xử lý
                  đơn hàng từ 5 đến 7 ngày làm việc (không bao gồm cuối tuần và
                  ngày lễ).
                  </li>
                </span>
                <span>
                  <li>
                  Sau khi hoàn tất xử lý, hàng sẽ được giao theo thời gian
                  tiêu chuẩn của đơn vị vận chuyển (thường từ 1-3 ngày tuỳ khu
                  vực).
                  </li>
                </span>
                <span>
                  <li>
                  Tổng thời gian nhận hàng dự kiến: 6-10 ngày làm việc kể từ
                  khi đặt hàng.
                  </li>
                </span>
                <span>
                  <li>
                  Trong trường hợp có thay đổi hoặc chậm trễ, chúng tôi sẽ
                  liên hệ trực tiếp để cập nhật tình trạng đơn hàng.
                  </li>
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        <div className="related-products w-full mt-12 border-t border-gray-300 pt-8">
          <h2 className="text-2xl font-bold mb-6 text-left text-gray-800">
            Sản phẩm liên quan
          </h2>
          <Row gutter={[16, 16]} className="pt-5">
            {isLoadingRelatedProducts ? (
              <Col span={24} style={{ textAlign: 'center' }}>
                <Spin tip="Đang tải sản phẩm liên quan..." size="large" />
              </Col>
            ) : isErrorRelatedProducts ? (
              <Col span={24}>
                <Alert
                  message="Lỗi"
                  description={`Không thể tải sản phẩm liên quan: ${relatedProductsError?.message}`}
                  type="error"
                  showIcon
                />
              </Col>
            ) : relatedProducts && relatedProducts.length > 0 ? (
              relatedProducts.slice(0, 4).map((p) => (
                <Col xs={24} sm={12} md={6} key={p._id}>
                  <RelateProduct product={p} />
                </Col>
              ))
            ) : (
              <Col span={24}>
                <Alert
                  message="Thông báo"
                  description="Không có sản phẩm liên quan nào."
                  type="info"
                  showIcon
                />
              </Col>
            )}
          </Row>
        </div>

      </div>
      <FooterComponent />
    </Layout>
  );
};

export default ProductDetail;
