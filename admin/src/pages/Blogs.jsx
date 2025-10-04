import {
  Badge,
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  // Select,
  Switch,
  Table,
  Upload,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import useBlogActions from "../hooks/useBlogActions";
// import { Option } from "antd/es/mentions";
import { useState } from "react";
import { API_BASE_URL } from "../shared/config";
import { truncateText } from "../helpers/truncateText";

const Blogs = () => {
  const { blogs, createBlog, updateBlog, deleteBlog, loading } =
    useBlogActions();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingBlog, setEditingBlog] = useState(null);
  const [expandedDetailsText, setExpandedDetailsText] = useState(null);
  const [fileList, setFileList] = useState([]);

  const handleDetailsSeeMore = (id) => {
    setExpandedDetailsText((prevState) => (prevState === id ? null : id));
  };

  const handleCreateBlog = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title || "");
      formData.append("details", values.details || "");
      // formData.append("type", values.type || "");
      formData.append("isActive", values.isActive);

      // Only append the photo if it's being changed
      if (values.image && values.image.file) {
        formData.append("image", values.image.file);
      }

      if (editingBlog) {
        await updateBlog(editingBlog._id, formData);
        setEditingBlog(null);
      } else {
        await createBlog(formData);
      }

      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to save blog", error);
    }
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setIsModalVisible(true);
    form.setFieldsValue({
      ...blog,
      isActive: blog.isActive,
    });

    const imageUrl = `${API_BASE_URL}${blog.image}`;
    setFileList([
      {
        uid: "-1",
        name: blog.image.split("/").pop(),
        status: "done",
        url: imageUrl,
      },
    ]);
  };

  const handleDeleteBlog = async (id) => {
    try {
      await deleteBlog(id);
    } catch (error) {
      message.error("Failed to delete blog", error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingBlog(null);
    setFileList([]);
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      render: (text, record) => {
        const isExpanded = expandedDetailsText === record._id;
        const safeText = text || "";
        return (
          <div>
            <span>
              {isExpanded ? text : truncateText(text)}{" "}
              {safeText.length > 100 && (
                <a
                  onClick={() => handleDetailsSeeMore(record._id)}
                  className="text-blue-500 hover:text-blue-600 cursor-pointer hover:border-b hover:border-b-blue-500"
                >
                  {isExpanded ? "See Less" : "See More"}
                </a>
              )}
            </span>
          </div>
        );
      },
    },
    {
      title: "Media",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <img
          src={`${API_BASE_URL}${record.image}`}
          alt={record.title}
          style={{ width: "100px" }}
        />
      ),
    },
    // {
    //   title: "Blog Type",
    //   dataIndex: "type",
    //   key: "type",
    // },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <Badge
          count={isActive ? "Yes" : "No"}
          style={{
            backgroundColor: isActive ? "#52c41a" : "#ff4d4f",
            color: "white",
          }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex flex-col gap-1">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditBlog(record)}
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="Are you sure to delete this blog?"
            onConfirm={() => handleDeleteBlog(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <div className="bg-white my-6 p-8 rounded-md">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">All News</h1>
        <Button
          type="primary"
          onClick={() => setIsModalVisible(true)}
          style={{ marginBottom: 16 }}
        >
          <PlusSquareOutlined /> Add New
        </Button>
      </div>

      <Table
        dataSource={blogs}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title={editingBlog ? "Edit News" : "Create News"}
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleCreateBlog} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="details"
            label="Details"
            // rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            name="type"
            label="Blog Type"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="MAIN">Main</Option>
              <Option value="HEAD">Head</Option>
            </Select>
          </Form.Item> */}
          <Form.Item name="isActive" label="Active" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item
            name="image"
            label="Upload Blog Image"
            valuePropName="file"
            rules={[{ required: true }]}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              fileList={fileList}
              onChange={handleFileChange}
              rules={[{ required: true }]}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading}>
            {editingBlog ? "Update News" : "Create News"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Blogs;
