import { DeleteFilled, HeartOutlined } from "@ant-design/icons";
import { Badge, Button, Drawer, Popconfirm, Space } from "antd";
import React, { useState } from "react";
import FormatCurrent from "../services/FormatCurrent";
import imgProduct from "../assets/product.jpg";
import { useFavourite } from "../context/FavouriteContext";

const Favourite = () => {
  const [open, setOpen] = useState(false);
  const { favourites, toggleFavourite } = useFavourite(); // Lấy danh sách yêu thích từ context
  const showLiked = () => setOpen(true);
  const closeLiked = () => setOpen(false);

  const handleDelete = (item: any) => {
    toggleFavourite(item)
  }

  return (
    <Space size="large">
      <Badge
        count={favourites.length}
        style={{
          backgroundColor: "#2e3b32",
          color: "#fff",
          fontSize: "10px",
          borderRadius: "50%",
          padding: "0px 4px",
          border:"none",
          boxShadow: "none",
          fontWeight: "bold",
        }}
        offset={[0, 16]}
        className="hover:scale-110 transition-transform duration-100"
      >
        <HeartOutlined
          className="text-[20px] hover:scale-110 transition-transform duration-100"
          onClick={showLiked}
        />

        <Drawer title="Favourite" width={400} onClose={closeLiked} open={open}>
          {favourites.map((item, index) => (
            <div key={index} className="flex gap-4 items-center mb-6">
              <img
                src={imgProduct}
                alt="Product"
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-start">
                  <h4 className="text-xl font-semibold flex-grow">
                    {item.name || "Đồ gỗ"}
                  </h4>
                  <Popconfirm
                      title="Do you want to delete this product?"
                      okText="Delete"
                      cancelText="Cancel"
                      onConfirm={() => handleDelete(item)}
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
                <span className="text-sm text-gray-600">
                  Kích thước: 60 x 27 x 40 cm
                </span>
                <div className="flex items-center gap-2">
                  <FormatCurrent price={item.price || 100000} />
                </div>
              </div>
            </div>
          ))}
        </Drawer>
      </Badge>
    </Space>
  );
};

export default Favourite;
