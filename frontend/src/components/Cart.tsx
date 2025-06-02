// Import các icon và component cần thiết từ thư viện Ant Design
import { DeleteFilled, ShoppingCartOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Drawer,
  Popconfirm,
  Checkbox,
  Input,
  Empty,
} from "antd";
import ImageProduct from "../assets/product.jpg";
// Import hook và service
import { useEffect, useState } from "react";
import FormatCurrent from "../services/FormatCurrent"; // Hàm format giá tiền
import emptyCart from "../assets/empty-cart.png";
const Cart = () => {
  // State hiển thị Drawer (giỏ hàng)
  const [open, setOpen] = useState(false);

  // Danh sách sản phẩm trong giỏ hàng
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Danh sách ID của sản phẩm được chọn để thanh toán
  const [selectedItem, setSelectedItem] = useState<string[]>([]);

  // Tổng tiền được tính (bao gồm phí ship)
  const [total, setTotal] = useState(0);

  // Phí vận chuyển (giả lập)

  // Mở và đóng Drawer
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  // Xử lý chọn/bỏ chọn sản phẩm trong giỏ
  const handleCheckBoxChange = (checked: boolean, itemId: string) => {
    setSelectedItem((prev) =>
      checked ? [...prev, itemId] : prev.filter((id) => id !== itemId)
    );
  };

  // Xử lý khi thay đổi số lượng sản phẩm
  const handleQuantityChange = (value: number, itemId: string) => {
    if (value < 1) return; // Không cho phép số lượng < 1
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: value } : item
      )
    );
  };

  // Xoá sản phẩm khỏi giỏ hàng
  const handleDelete = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    setSelectedItem((prev) => prev.filter((id) => id !== itemId));
  };

  // Tính tổng giá các sản phẩm đã chọn (chưa cộng phí ship)
  const totalSelectedPrice = cartItems.reduce((sum, item) => {
    return selectedItem.includes(item.id)
      ? sum + item.quantity * item.price
      : sum;
  }, 0);

  // Cập nhật tổng cộng mỗi khi `totalSelectedPrice` hoặc `delivery` thay đổi
  useEffect(() => {
    setTotal(totalSelectedPrice);
  }, [totalSelectedPrice]);

  // Giả lập dữ liệu giỏ hàng ban đầu
  useEffect(() => {
    setCartItems([
      {
        id: "1",
        name: "Ghế sofa cao cấp",
        image: { ImageProduct },
        price: 1500000,
        quantity: 2,
        description: "Mềm mại, sang trọng",
        color: "Nâu",
        size: "Lớn",
        material: "Da",
      },
      {
        id: "2",
        name: "Bàn gỗ sồi",
        image: { ImageProduct },
        price: 950000,
        quantity: 1,
        description: "Chắc chắn, bền bỉ",
        color: "Tự nhiên",
        size: "Trung bình",
        material: "Gỗ sồi",
      },
      {
        id: "3",
        name: "Tủ quần áo",
        image: { ImageProduct },
        price: 2500000,
        quantity: 1,
        description: "Khoảng trống lớn, tiện dụng",
        color: "Xám",
        size: "Lớn",
        material: "Gỗ công nghiệp",
      },
      {
        id: "4",
        name: "Ghế ăn",
        image: { ImageProduct },
        price: 500000,
        quantity: 3,
        description: "Đẹp mắt, sang trọng",
        color: "Trắng",
        size: "Vừa",
        material: "Gỗ công nghiệp",
      },
    ]);
  }, []);

  return (
    <>
      {/* Icon giỏ hàng kèm badge số lượng */}
      <Badge
        count={cartItems.length}
        style={{
          backgroundColor: "#2e3b32",
          color: "#fff",
          fontSize: "10px",
          borderRadius: "50%",
          padding: "10px 4px",
          alignItems: "center",
          border: "none",
          fontWeight: "bold",
          boxShadow: "none",
        }}
        offset={[0, 18]}
        className="transition-transform duration-100 hover:scale-110"
      >
        <ShoppingCartOutlined className="text-[24px]" onClick={showDrawer} />
      </Badge>

      {/* Drawer hiển thị danh sách sản phẩm trong giỏ */}
      <Drawer
        title="Cart"
        placement="right"
        onClose={onClose}
        open={open}
        width={450}
      >
        {/* Nếu giỏ rỗng thì hiển thị thông báo */}
        {cartItems.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <Empty
              image={emptyCart}
              style={{ justifyItems: "center", marginTop: "100px" }}
              description="Giỏ hàng trống"
            />
          </div>
        ) : (
          <div
            className="cart-container"
            style={{ maxHeight: "460px", overflowY: "scroll" }}
          >
            {/* Duyệt qua từng sản phẩm trong giỏ */}
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-5 items-center pb-6 pt-4 border-b border-gray-200"
              >
                {/* Checkbox chọn sản phẩm để thanh toán */}
                <Checkbox
                  checked={selectedItem.includes(item.id)}
                  onChange={(e) =>
                    handleCheckBoxChange(e.target.checked, item.id)
                  }
                />
                {/* Hình ảnh sản phẩm */}
                <img
                  src={ImageProduct}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                {/* Thông tin chi tiết sản phẩm */}
                <div className="flex flex-col gap-1 w-full">
                  <h4 className="text-[16px] font-semibold">{item.name}</h4>
                  <span className="text-sm text-gray-500">
                    {item.description}
                  </span>
                  <span className="text-sm text-gray-500">
                    Color: {item.color} | Size: {item.size}
                  </span>
                  <span className="text-sm text-gray-500">
                    Material: {item.material}
                  </span>
                  <FormatCurrent price={item.price} /> {/* Hiển thị giá */}
                  {/* Điều chỉnh số lượng và xoá sản phẩm */}
                  <div className="flex items-center gap-2 mt-1 justify-between">
                    <div className="quantity">
                      <Button
                        size="small"
                        style={{ border: "none", boxShadow: "none" }}
                        onClick={() =>
                          handleQuantityChange(item.quantity - 1, item.id)
                        }
                      >
                        -
                      </Button>
                      <Input
                        value={item.quantity}
                        onChange={(e) => {
                          const value = parseInt(
                            e.target.value.replace(/[^0-9]/g, "")
                          );
                          if (!isNaN(value) && value >= 1) {
                            handleQuantityChange(value, item.id);
                          }
                        }}
                        style={{
                          width: 50,
                          textAlign: "center",
                          border: "none",
                          boxShadow: "none",
                        }}
                      />
                      <Button
                        size="small"
                        style={{ border: "none", boxShadow: "none" }}
                        onClick={() =>
                          handleQuantityChange(item.quantity + 1, item.id)
                        }
                      >
                        +
                      </Button>
                    </div>

                    {/* Popconfirm xác nhận xoá */}
                    <Popconfirm
                      title="Do you want to delete this product?"
                      okText="Delete"
                      cancelText="Cancel"
                      onConfirm={() => handleDelete(item.id)}
                    >
                      <Button
                        type="text"
                        icon={
                          <DeleteFilled className="text-xl text-[#a94442]" />
                        }
                        className="no-hover-effect hover:scale-125 duration-200"
                      />
                    </Popconfirm>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer của giỏ hàng: tạm tính, phí ship, tổng cộng và nút thanh toán */}
        <div
          className="cart-footer cart-container"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            padding: "16px",
            borderTop: "1px solid #f0f0f0",
            background: "#fff",
            zIndex: 10,
          }}
        >
          <div className="flex justify-between text-[18px] font-bold">
            <span>Total</span>
            <FormatCurrent price={totalSelectedPrice} />
          </div>
          <span className="text-[14px] block pt-2">
            Phí vận chuyển được tính khi thanh toán
          </span>
          <Button
            style={{
              backgroundColor: "black",
              color: "white",
              width: "100%",
              height: 45,
              marginTop: "10px",
              borderRadius: 8,
              fontSize: 18,
              paddingBottom: 5,
            }}
            disabled={selectedItem.length === 0} // Chỉ bật khi có sản phẩm được chọn
          >
            <a href="/checkout">Checkout</a>
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default Cart;
