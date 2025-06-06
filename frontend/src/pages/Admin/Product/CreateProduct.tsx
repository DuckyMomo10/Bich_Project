import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  InputNumber,
  Upload,
  message,
} from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import { PlusOutlined } from "@ant-design/icons";

interface CreateProductFormValues {
  name: string;
  price: number;
  material: string;
  color: string;
  size: string;
  description: string;
  category: string;
}

const CreateProduct: React.FC = () => {
  const [form] = Form.useForm<CreateProductFormValues>();

  // Lưu file ảnh upload
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleUploadChange = ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => {
    setFileList(newFileList);
  };

  const beforeUpload = (file: File) => {
    const isImage =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
    if (!isImage) {
      message.error("Bạn chỉ có thể tải lên file JPG/PNG!");
      return Upload.LIST_IGNORE;
    }
    if (fileList.length >= 5) {
      message.error("Chỉ được tải lên tối đa 5 ảnh!");
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const onFinish = async (values: CreateProductFormValues) => {
    try {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("images", file.originFileObj);
        }
      });

      const res = await fetch("/products", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        message.success("Tạo sản phẩm thành công!");
        form.resetFields();
        setFileList([]);
      } else {
        message.error("Lỗi: " + data.message);
      }
    } catch (error: any) {
      message.error("Lỗi gửi dữ liệu: " + error.message);
    }
  };

  return (
    <div>
      <h1
        style={{
          margin: "20px 0",
          fontSize: 30,
          fontWeight: "bold",
        }}
      >
        Create Product
      </h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Form<CreateProductFormValues>
          form={form}
          layout="vertical"
          style={{ width: 600 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Product Name"
            name="name"
            rules={[{ required: true, message: "Please enter the product name!" }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            label="Product Price"
            name="price"
            rules={[
              { required: true, message: "Please enter the product price!" },
              {
                type: "number",
                min: 0,
                message: "Price must be a number and greater than 0!",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Enter product price"
            />
          </Form.Item>

          <Form.Item
            label="Material"
            name="material"
            rules={[{ required: true, message: "Please enter the material!" }]}
          >
            <Input placeholder="Enter material" />
          </Form.Item>

          <Form.Item
            label="Color"
            name="color"
            rules={[{ required: true, message: "Please enter the color!" }]}
          >
            <Input placeholder="Enter color" />
          </Form.Item>

          <Form.Item
            label="Size"
            name="size"
            rules={[{ required: true, message: "Please enter the size!" }]}
          >
            <Input placeholder="Enter size" />
          </Form.Item>

          <Form.Item
            label="Product Description"
            name="description"
            rules={[
              { required: true, message: "Please enter the product description!" },
            ]}
          >
            <Input.TextArea placeholder="Enter product description" />
          </Form.Item>

          <Form.Item
            label="Product Category"
            name="category"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select
              showSearch
              placeholder="Select a category"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                { value: "Shirt", label: "Shirt" },
                { value: "Jacket", label: "Jacket" },
                { value: "Pants", label: "Pants" },
                { value: "Shoes", label: "Shoes" },
              ]}
            />
          </Form.Item>

          <Form.Item label="Product Images">
            <Upload
              listType="picture-card"
              multiple
              beforeUpload={beforeUpload}
              fileList={fileList}
              onChange={handleUploadChange}
              onRemove={(file) =>
                setFileList((prev) =>
                  prev.filter((item) => item.uid !== file.uid)
                )
              }
              maxCount={5}
            >
              {fileList.length >= 5 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: 150, height: 45 }}
            >
              Create Product
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateProduct;
