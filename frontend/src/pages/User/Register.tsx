import { Form, Button, Layout, Typography } from "antd";
import FloatingLabelInput from "../../shared/InputFloating";
import HeaderComponent from "../../components/Header/HeaderComponent";
import FooterComponent from "../../components/Footer/FooterComponent";
import { Link } from "react-router";
const { Title, Text } = Typography;

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const [form] = Form.useForm();

  const onFinish = (values: RegisterFormValues) => {
    console.log("Form values:", values);
  };

  return (
    <Layout className="flex flex-col min-h-screen">
      <HeaderComponent />
      {/* Adjusted the container div's classes */}
      <div className="flex-1 flex items-center justify-center py-8">
        <div className="w-full max-w-[400px] px-5">
          <Title className="text-[40px] text-center mb-8">Register</Title>
          <Form form={form} onFinish={onFinish} className="space-y-6">
            <FloatingLabelInput
              className="name"
              label="Name"
              required
              type="text"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail",
                },
              ]}
            />

            <FloatingLabelInput
              className="email"
              label="Email"
              required
              type="text"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail",
                },
              ]}
            />

            <FloatingLabelInput
              className="password"
              label="Password"
              type="password"
              required
              rules={[
                {
                  min: 8,
                  message: "Password must be at least 8 characters",
                },
              ]}
            />

            <Form.Item className="mb-4">
              <Button
                type="primary"
                htmlType="submit"
                className="w-[150px] h-10 hover:scale-105 transition-transform duration-300"
                style={{ background: "black", borderRadius: "2px" }}
              >
                Register
              </Button>
            </Form.Item>

            <div className="text-center">
              <Text>Already have an account? </Text>
              <Link
                to="/login"
                style={{
                  color: "rgb(0, 0, 0, 0.5)",
                  textDecoration: "underline",
                  fontWeight: "bold",
                }}
                className="text-sm hover:!text-gray-700"
              >
                Login here
              </Link>
            </div>
          </Form>
        </div>
      </div>
      <FooterComponent />
    </Layout>
  );
};

export default Register;
