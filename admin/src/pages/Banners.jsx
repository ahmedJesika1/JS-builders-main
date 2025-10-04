import {
  Badge,
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
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
import useBannerActions from "../hooks/useBannerActions";
import { Option } from "antd/es/mentions";
import { useState } from "react";
import { API_BASE_URL } from "../shared/config";
import { truncateText } from "../helpers/truncateText";

const Banners = () => {
  const { banners, createBanner, updateBanner, deleteBanner, loading } =
    useBannerActions();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingBanner, setEditingBanner] = useState(null);
  const [expandedDetailsText, setExpandedDetailsText] = useState(null);
  const [fileList, setFileList] = useState([]);

  const handleDetailsSeeMore = (id) => {
    setExpandedDetailsText((prevState) => (prevState === id ? null : id));
  };

  const handleCreateBanner = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title || "");
      formData.append("details", values.details || "");
      formData.append("type", values.type || "");
      formData.append("isActive", values.isActive);

      // Only append the photo if it's being changed
      if (values.image && values.image.file) {
        formData.append("image", values.image.file);
      }

      if (editingBanner) {
        await updateBanner(editingBanner._id, formData);
        setEditingBanner(null);
      } else {
        await createBanner(formData);
      }

      form.resetFields();
      setFileList([]);
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to save banner", error);
    }
  };

  const handleEditBanner = (banner) => {
    setEditingBanner(banner);
    setIsModalVisible(true);
    form.setFieldsValue({
      ...banner,
      isActive: banner.isActive,
    });

    const imageUrl = `${API_BASE_URL}${banner.image}`;
    setFileList([
      {
        uid: "-1",
        name: banner.image.split("/").pop(),
        status: "done",
        url: imageUrl,
      },
    ]);
  };

  const handleDeleteBanner = async (id) => {
    try {
      await deleteBanner(id);
    } catch (error) {
      message.error("Failed to delete banner", error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingBanner(null);
    setFileList([]);
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const columns = [
    {
      title: "Headline",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
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
    {
      title: "Banner Type",
      dataIndex: "type",
      key: "type",
    },
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
            onClick={() => handleEditBanner(record)}
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="Are you sure to delete this banner?"
            onConfirm={() => handleDeleteBanner(record._id)}
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
        <h1 className="text-2xl font-bold">All Banners</h1>
        <Button
          type="primary"
          onClick={() => setIsModalVisible(true)}
          style={{ marginBottom: 16 }}
        >
          <PlusSquareOutlined /> Add New
        </Button>
      </div>

      <Table
        dataSource={banners}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title={editingBanner ? "Edit Banner" : "Create Banner"}
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleCreateBanner} layout="vertical">
          <Form.Item name="title" label="Headline" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="details"
            label="Description"
            // rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Banner Type"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="MAIN">Main</Option>
              <Option value="HEAD">Head</Option>
            </Select>
          </Form.Item>
          <Form.Item name="isActive" label="Active" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item
            name="image"
            label="Upload Banner Image (Choose maximum 1 image)"
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
            {editingBanner ? "Update Banner" : "Create Banner"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Banners;
