import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Divider, message } from "antd";
import HeaderComponent from "../../components/Header/HeaderComponent";
import FooterComponent from "../../components/Footer/FooterComponent";
import { useCart } from "../../context/CartContext";
import FormatCurrent from "../../services/FormatCurrent";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const [form] = Form.useForm();
  const { cartItems } = useCart();
  const location = useLocation();
  const [checkoutItems, setCheckoutItems] = useState<any[]>([]);
  const delivery = 25000;

  useEffect(() => {
    // Parse URL parameters for direct purchase
    const params = new URLSearchParams(location.search);
    const productParam = params.get('product');
    
    if (productParam) {
      try {
        const directProduct = JSON.parse(decodeURIComponent(productParam));
        setCheckoutItems([{
          id: directProduct.id,
          name: directProduct.name,
          price: directProduct.price,
          quantity: directProduct.quantity,
          color: directProduct.color
        }]);
      } catch (error) {
        console.error('Error parsing product data:', error);
        setCheckoutItems(cartItems);
      }
    } else {
      setCheckoutItems(cartItems);
    }
  }, [location.search, cartItems]);

  const totalProductPrice = checkoutItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  const total = totalProductPrice + delivery;

  const handleFinish = (values: any) => {
    const orderData = {
      ...values,
      products: checkoutItems,
      total,
    }
    console.log(orderData);
    message.success("Đặt hàng thành công");
  };

  return (
    <div>
      <HeaderComponent />
      <div className="bg-[#fdfaf3] min-h-screen py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form đặt hàng */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-[#5c4a32] mb-4">
              Thông tin giao hàng
            </h2>
            <Form layout="vertical" form={form} onFinish={handleFinish}>
              <Form.Item
                label="Họ và tên"
                name="fullname"
                rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
              >
                <Input placeholder="Nguyễn Văn A" />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                ]}
              >
                <Input placeholder="0123456789" />
              </Form.Item>
              <Form.Item
                label="Địa chỉ giao hàng"
                name="address"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
              >
                <Input.TextArea
                  placeholder="123 đường ABC, Quận 1, TP.HCM"
                  rows={3}
                />
              </Form.Item>
              <Form.Item
                label="Phương thức thanh toán"
                name="paymentMethod"
                rules={[
                  { required: true, message: "Vui lòng chọn phương thức!" },
                ]}
              >
                <Select placeholder="Chọn phương thức">
                  <Select.Option value="cod">Thanh toán khi nhận hàng (COD)</Select.Option>
                  <Select.Option value="bank">Chuyển khoản ngân hàng</Select.Option>
                  <Select.Option value="momo">Ví MoMo</Select.Option>
                </Select>
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                className="bg-[#3e3224] hover:bg-[#4a3a2c] font-semibold"
                block
              >
                Xác nhận đặt hàng
              </Button>
            </Form>
          </div>

          {/* Tóm tắt đơn hàng */}
          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-2xl font-bold text-[#5c4a32] mb-4">
              Tóm tắt đơn hàng
            </h2>
            <div className="text-[#3e3224] space-y-3">
              {checkoutItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} {item.color ? `(${item.color})` : ''} ({item.quantity} x{" "}
                    {FormatCurrent({ price: item.price })})
                  </span>
                  <span>
                    <FormatCurrent price={item.quantity * item.price} />
                  </span>
                </div>
              ))}

              <div className="flex justify-between pt-3">
                <span>Phí vận chuyển</span>
                <span><FormatCurrent price={delivery} /></span>
              </div>

              <Divider />

              <div className="flex justify-between font-semibold text-lg">
                <span>Tổng cộng</span>
                <span><FormatCurrent price={total} /></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default Checkout; 