import { Button, Form, Input, Select, InputNumber } from "antd";
import { NavLink } from "react-router";

const EditProduct = () => {
  const [form] = Form.useForm();
  return (
    <div>
      <div>
        <h1
          style={{
            margin: "20px 0",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Edit Product
        </h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
        <Form form={form} layout="vertical" style={{ width: "600px" }}>
            <Form.Item
              label="Product Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: (
                    <span
                      style={{
                        color: "#ff4d4f",
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    >
                      Please enter the product name!
                    </span>
                  ),
                },
              ]}
            >
              <Input placeholder="Enter product name" />
            </Form.Item>

            <Form.Item
              label="Product Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: (
                    <span
                      style={{
                        color: "#ff4d4f",
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    >
                      Please enter the product price!
                    </span>
                  ),
                },
                {
                  type: "number",
                  min: 0,
                  message: (
                    <span
                      style={{
                        color: "#ff4d4f",
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    >
                      Price must be a number and greater than 0!
                    </span>
                  ),
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
              rules={[
                {
                  required: true,
                  message: (
                    <span
                      style={{
                        color: "#ff4d4f",
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    >
                      Please enter the material!
                    </span>
                  ),
                },
              ]}
            >
              <Input placeholder="Enter material" />
            </Form.Item>

            <Form.Item
              label="Color"
              name="color"
              rules={[
                {
                  required: true,
                  message: (
                    <span
                      style={{
                        color: "#ff4d4f",
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    >
                      Please enter the color!
                    </span>
                  ),
                },
              ]}
            >
              <Input placeholder="Enter color" />
            </Form.Item>

            <Form.Item
              label="Size"
              name="size"
              rules={[
                {
                  required: true,
                  message: (
                    <span
                      style={{
                        color: "#ff4d4f",
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    >
                      Please enter the size!
                    </span>
                  ),
                },
              ]}
            >
              <Input placeholder="Enter size" />
            </Form.Item>

            <Form.Item
              label="Product Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: (
                    <span
                      style={{
                        color: "#ff4d4f",
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    >
                      Please enter the product description!
                    </span>
                  ),
                },
              ]}
            >
              <Input.TextArea placeholder="Enter product description" />
            </Form.Item>

            <Form.Item
              label="Product Category"
              name="category"
              rules={[
                {
                  required: true,
                  message: (
                    <span
                      style={{
                        color: "#ff4d4f",
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    >
                      Please select a category!
                    </span>
                  ),
                },
              ]}
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

            <Form.Item>
              <NavLink to="/admin/product">
                <Button type="primary" style={{ margin: "10px" ,width: "150px", height: "45px" }}>
                  Back to Product
                </Button>
              </NavLink>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "150px", height: "45px" }}
              >
                Edit Product
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
