import { Button, Pagination, Popconfirm, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useState } from "react";
import { NavLink } from "react-router";
import FormatCurrent from "../../../services/FormatCurrent";
import ProductImage from "../../../assets/product.jpg"
import { ProductType } from "../../../types/Product";

const Product = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const columns: TableProps<ProductType>["columns"] = [
    {
      title: "Name Product",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => <img src={image} alt={"hi"} width="150" />,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => <FormatCurrent price={price} />,
    },
    {
      title: "Material",
      dataIndex: "material",
      key: "material",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      render: (color) => <Tag color="blue">{color}</Tag>,
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button variant="solid" color="primary">
            <NavLink to={`/admin/detail-product/${record.key}`}>Detail</NavLink>
          </Button>
          <Button variant="solid" color="gold">
            <NavLink to={`/admin/edit-product/${record.key}`}>Edit</NavLink>
          </Button>
          <Popconfirm
            title="Delete product"
            description="Are you sure you want to delete this product?"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data: ProductType[] = [
    {
      key: "1",
      name: "T-shirt Basic",
      price: 20000,
      material: "Cotton",
      color: "Red",
      size: "M",
      image: ProductImage,
    },
    {
      key: "2",
      name: "Denim Jacket",
      price: 49000,
      material: "Denim",
      color: "Blue",
      size: "L",
      image:
        ProductImage,
    },
    {
      key: "3",
      name: "Sneakers Sport",
      price: 89.99,
      material: "Synthetic",
      color: "White",
      size: "42",
      image:
        ProductImage,
    },
    {
      key: "4",
      name: "Basic Hoodie",
      price: 29.99,
      material: "Cotton",
      color: "Black",
      size: "L",
      image:
        ProductImage,
    },
    {
      key: "5",
      name: "Chinos Pants",
      price: 39.99,
      material: "Cotton",
      color: "Khaki",
      size: "M",
      image:
        ProductImage,
    },
    {
      key: "6",
      name: "Summer Dress",
      price: 59.99,
      material: "Linen",
      color: "Pink",
      size: "S",
      image:
        ProductImage,
    },
    {
      key: "7",
      name: "Leather Jacket",
      price: 99.99,
      material: "Leather",
      color: "Black",
      size: "M",
      image:
        ProductImage,
    },
    {
      key: "8",
      name: "Sports Shorts",
      price: 24.99,
      material: "Polyester",
      color: "Grey",
      size: "M",
      image:
        ProductImage,
    },
    {
      key: "9",
      name: "Casual Shirt",
      price: 34.99,
      material: "Cotton",
      color: "Blue",
      size: "L",
      image:
        ProductImage,
    },
    {
      key: "10",
      name: "Boots",
      price: 89.99,
      material: "Leather",
      color: "Brown",
      size: "42",
      image:
        ProductImage,
    },
  ];

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <>
      <h1
        style={{
          margin: "20px 0",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        Products
      </h1>
      <div style={{ display: "flex", margin: "20px 0" }}>
        <Button type="primary">
          <NavLink to={"/admin/create-product"}>Create Product</NavLink>
        </Button>
      </div>
      <Table
        dataSource={currentProducts}
        columns={columns}
        pagination={false}
      />
      <Pagination
        current={currentPage}
        pageSize={productsPerPage}
        total={data.length}
        onChange={handlePageChange}
        align="end"
        style={{ marginTop: "20px", textAlign: "center" }}
      />
    </>
  );
};

export default Product;
