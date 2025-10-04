import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
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
import useClientActions from "../hooks/useClientActions";
import { useState } from "react";
import { API_BASE_URL } from "../shared/config";
import { truncateText } from "../helpers/truncateText";

const Client = () => {
  const { clients, createClient, updateClient, deleteClient, loading } =
    useClientActions();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingClient, setEditingClient] = useState(null);
  const [expandedDetailsText, setExpandedDetailsText] = useState(null);
  const [fileList, setFileList] = useState([]);

  const handleDetailsSeeMore = (id) => {
    setExpandedDetailsText((prevState) => (prevState === id ? null : id));
  };

  const handleCreateClient = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name || "");
      formData.append("details", values.details || "");
      formData.append("designation", values.designation || "");
      formData.append("isActive", values.isActive);

      if (values.image && values.image.file) {
        formData.append("image", values.image.file);
      }

      if (editingClient) {
        await updateClient(editingClient._id, formData);
        setEditingClient(null);
      } else {
        await createClient(formData);
      }

      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to save client", error);
    }
  };

  const handleEditClient = (client) => {
    setEditingClient(client);
    setIsModalVisible(true);
    form.setFieldsValue({
      ...client,
      isActive: client.isActive,
    });

    const imageUrl = `${API_BASE_URL}${client.image}`;
    setFileList([
      {
        uid: "-1",
        name: client.image.split("/").pop(),
        status: "done",
        url: imageUrl,
      },
    ]);
  };

  const handleDeleteClient = async (id) => {
    try {
      await deleteClient(id);
    } catch (error) {
      message.error("Failed to delete client", error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingClient(null);
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
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
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex flex-col gap-1">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditClient(record)}
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="Are you sure to delete this client?"
            onConfirm={() => handleDeleteClient(record._id)}
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
        <h1 className="text-2xl font-bold">All Clients</h1>
        <Button
          type="primary"
          onClick={() => setIsModalVisible(true)}
          style={{ marginBottom: 16 }}
        >
          <PlusSquareOutlined /> Add New
        </Button>
      </div>

      <Table
        dataSource={clients}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title={editingClient ? "Edit Client" : "Create Client"}
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleCreateClient} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="designation" label="Designation">
            <Input />
          </Form.Item>
          <Form.Item name="details" label="Details">
            <Input />
          </Form.Item>
          <Form.Item name="isActive" label="Active" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item
            name="image"
            label="Upload Client Image (Choose maximum 1 image)"
            valuePropName="file"
            rules={[{ required: true }]}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              fileList={fileList}
              onChange={handleFileChange}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading}>
            {editingClient ? "Update Client" : "Create Client"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Client;
