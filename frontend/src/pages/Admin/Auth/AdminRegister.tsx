import { Form, Input, Button, Card, message, Row, Col, Typography } from "antd";
const { Title } = Typography;
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import "../admin.css";
import { FormValues } from "../../../types/FormValues";


const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: FormValues) => {
      return axios.post("http://localhost:8000/api/auth/register", values);
    },
    onSuccess: () => {
      message.success("Đăng ký thành công");
      navigate("/admin/login");
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || "Đăng ký thất bại");
    },
  });

  const handleSubmit = (values: FormValues) => {
    mutate(values);
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "#f0f2f5",
    }}>
      <Card style={{ width: 600, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <Title level={3} style={{ textAlign: "center", textTransform: "uppercase" }}>
            Register
          </Title>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Username"
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập username!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Số điện thoại"
                name="phoneNumber"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Instagram"
                name="instagram"
                rules={[
                  { required: true, message: "Vui lòng nhập tên Instagram!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu!" },
                  { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isPending} block>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
