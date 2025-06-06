import { Layout, Space, Typography } from "antd";
import {
  FacebookFilled,
  InstagramOutlined,
  // PinterestFilled,
} from "@ant-design/icons";
import { NavLink } from "react-router";
import Threads from "../../assets/threads-white-icon.png"

const { Footer } = Layout;
const { Text } = Typography;

const FooterComponent = () => {
  return (
    <Footer style={{ background: "#2d3b35", color: "white", paddingTop: 40 }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <Text style={{fontSize: 17 }} className="hover:underline hover:decoration-white hover:underline-offset-4"><NavLink to={"/about"} style={{ color: "white"}}>About Nhẹ Vibe</NavLink></Text>
      </div>

      <div style={{ textAlign: "center", marginBottom: 40, marginTop: 40 }}>
        <Space size="middle">
          <a href="https://www.facebook.com/share/1L5JRFQyhh/?mibextid=wwXIfr">  <FacebookFilled style={{ fontSize: 22, color: "white" }} /></a>        
          <a href="https://www.instagram.com/nhevibe.furnicozy?igsh=cGxoaWR0Ynpia25t&utm_source=qr"><InstagramOutlined style={{ fontSize: 22, color: "white" }} /></a>
          <a href="https://www.threads.net/@nhevibe.furnicozy"><img src={Threads} width={21} style={{marginBottom: 3, marginRight: 0}} alt="" /></a>
        </Space>
      </div>

      <div style={{ textAlign: "center", fontSize: 14, color: "white" }}>
        <span>© 2025 1acspaces</span>
        <span style={{ margin: "0 4px" }}>・</span>
        <span>Chính sách hoàn lại tiền</span>
        <span style={{ margin: "0 4px" }}>・</span>
        <span>Chính sách bảo mật</span>
        <span style={{ margin: "0 4px" }}>・</span>
        <span>Điều khoản dịch vụ</span>
        <span style={{ margin: "0 4px" }}>・</span>
        <span>Chính sách vận chuyển</span>
        <span style={{ margin: "0 4px" }}>・</span>
        <span>Thông tin liên hệ</span>
      </div>
    </Footer>
  );
};

export default FooterComponent;
