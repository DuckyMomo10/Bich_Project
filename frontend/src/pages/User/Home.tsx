import { Layout, Spin, Alert } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router";
import HeaderComponent from "../../components/Header/HeaderComponent";
import CardProduct from "../../components/CardProduct";
import FooterComponent from "../../components/Footer/FooterComponent";
import Instagram from "../../assets/instagram.png";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { ProductType } from "../../types/Product";

interface ExtendedProduct extends ProductType {
  oldPrice?: number;
}

const Home = () => {
  const getProducts = async () => {
    const { data } = await axiosInstance.get("/products");
    return data.products;
  };

  const { data: products, isLoading, isError, error } = useQuery<ExtendedProduct[]>({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5,
  });

  const renderContent = () => {
    if (isLoading) {
      return (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Spin size="large" />
          <p style={{ marginTop: "20px", fontSize: "1.2rem", color: "#555" }}>Đang tải sản phẩm...</p>
        </div>
      );
    }

    if (isError) {
      return (
        <Alert
          message="Lỗi"
          description={`Không thể tải danh sách sản phẩm: ${error?.message}`}
          type="error"
          showIcon
          style={{ margin: "20px auto", maxWidth: "800px" }}
        />
      );
    }

    if (!products || products.length === 0) {
      return (
        <Alert
          message="Thông báo"
          description="Không tìm thấy sản phẩm nào."
          type="info"
          showIcon
          style={{ margin: "20px auto", maxWidth: "800px" }}
        />
      );
    }

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "15px 12px",
          gap: "20px",
        }}
      >
        {products.map((product: ExtendedProduct) => (
          <CardProduct key={product._id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Hero Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(to right, #2e3e38, #4a6058)",
          height: "12rem",
          textAlign: "center",
          padding: "40px 20px",
        }}
      >
        <h1
          style={{
            color: "#fff",
            margin: 0,
            fontSize: "5rem",
            letterSpacing: "0.1rem",
            fontWeight: 700,
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          NHẸ VIBE
        </h1>
      </div>

      <HeaderComponent />

      <Content style={{ padding: "32px", background: "#f7f7f7" }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "3.5rem",
            marginBottom: "40px",
            color: "#2e3e38",
            fontWeight: 700,
            textTransform: "uppercase",
            borderBottom: "3px solid #ffddc8",
            paddingBottom: "10px",
            display: "inline-block",
            margin: "0 auto 40px auto"
          }}
        >
          Sản Phẩm Nổi Bật
        </h1>
        {renderContent()}
      </Content>

      <Layout>
        <Layout>
          <Content style={{ padding: "16px", background: "#fff" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>

      {/* Instagram Button */}
      <a
        href="https://www.instagram.com/nhevibe.furnicozy?igsh=cGxoaWR0Ynpia25t&utm_source=qr"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#ffddc8",
          padding: "8px",
          borderRadius: "50%",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <img src={Instagram} alt="Instagram" width={48} height={48} />
      </a>

      <FooterComponent />
    </Layout>
  );
};

export default Home;
