import { Button, Pagination, Popconfirm, Space, Table, message } from "antd";
import type { TableProps } from "antd";
import { useState } from "react";
import { NavLink } from "react-router";
import FormatCurrent from "../../../services/FormatCurrent";
import { API_URL } from "../../../utils/config.js";
import { ProductType } from "../../../types/Product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios.js";
import  errorImage  from '../../../image/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg'
const Product = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const queryClient = useQueryClient();

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery<{
    products: ProductType[];
    totalPages: number;
    currentPage: number;
  }>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/products");
      return data;
    },
  });

  const products = response?.products || [];

  // Thêm dòng này để kiểm tra dữ liệu
  console.log("Product data response:", response);

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      if (!id) {
        throw new Error("Product ID is required");
      }
      try {
        const response = await axiosInstance.delete(`/products/delete/${id}`);
        return response.data;
      } catch (error: any) {
        console.error("Delete error:", error);
        if (error.response) {
          throw new Error(
            error.response.data.message || "Failed to delete product"
          );
        }
        throw new Error(error.message || "Failed to delete product");
      }
    },
    onSuccess: () => {
      message.success("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      message.error(error.message || "Failed to delete product");
    },
  });

  const columns: TableProps<ProductType>["columns"] = [
    {
      title: "STT",
      key: "stt",
      render: (_, __, index) => (currentPage - 1) * productsPerPage + index + 1,
    },
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (id: string) => <>{id.substring(0, 8)}...</>,
    },
    {
      title: "Image",
      dataIndex: "images",
      key: "image",
      render: (image: string[]) => {
        if (!image || image.length === 0) {
          console.log('Rendering placeholder for image:', image);
          return (
            <img
              src={errorImage}
              alt="No image available"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                borderRadius: "4px",
                border: "1px solid #eee",
              }}
            />
          );
        }
        const imageUrl = image[0]?.replace(/\\/g, '/');
        console.log('Processed imageUrl:', imageUrl);
        return imageUrl ? (
          <img
            src={imageUrl}
            alt="Product"
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
        ) : null;
      },
    },
    {
      title: "Name Product",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => <FormatCurrent price={price} />,
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size={"middle"}>
          <Button type="default">
            <NavLink to={`/admin/detail-product/${record._id}`}>Detail</NavLink>
          </Button>
          <Button type="primary">
            <NavLink to={`/admin/edit-product/${record._id}`}>Edit</NavLink>
          </Button>
          <Popconfirm
            title="Delete Product"
            description="Are you sure to delete this product?"
            onConfirm={() => {
              if (!record._id) {
                message.error("Invalid product ID");
                return;
              }
              deleteMutation.mutate(record._id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              loading={
                deleteMutation.isPending &&
                deleteMutation.variables === record._id
              }
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (page: number) => setCurrentPage(page);

  // Thêm dòng này để kiểm tra dữ liệu trước khi render bảng
  console.log('Current products for table:', currentProducts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

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
        rowKey="_id"
      />
      {products && products.length > productsPerPage && (
        <Pagination
          current={currentPage}
          pageSize={productsPerPage}
          total={products.length}
          onChange={handlePageChange}
          align="end"
          style={{ marginTop: "20px", textAlign: "center" }}
        />
      )}
    </>
  );
};

export default Product;
