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
  // Upload,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
  // UploadOutlined,
} from "@ant-design/icons";
import useCareerActions from "../hooks/useCareerActions";
// import { Option } from "antd/es/mentions";
import { useState } from "react";
// import { API_BASE_URL } from "../shared/config";
import { truncateText } from "../helpers/truncateText";

const Careers = () => {
  const { careers, createCareer, updateCareer, deleteCareer, loading } =
    useCareerActions();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingCareer, setEditingCareer] = useState(null);
  const [expandedDetailsText, setExpandedDetailsText] = useState(null);

  const handleDetailsSeeMore = (id) => {
    setExpandedDetailsText((prevState) => (prevState === id ? null : id));
  };

  const handleCreateCareer = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title || "");
      formData.append("details", values.details || "");
      // formData.append("type", values.type || "");
      formData.append("isActive", values.isActive);

      // Only append the photo if it's being changed
      // if (values.image && values.image.file) {
      //   formData.append("image", values.image.file);
      // }

      if (editingCareer) {
        await updateCareer(editingCareer._id, formData);
        setEditingCareer(null);
      } else {
        await createCareer(formData);
      }

      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to save career", error);
    }
  };

  const handleEditCareer = (career) => {
    setEditingCareer(career);
    setIsModalVisible(true);
    form.setFieldsValue({
      ...career,
      isActive: career.isActive,
      // image: undefined,
    });
  };

  const handleDeleteCareer = async (id) => {
    try {
      await deleteCareer(id);
    } catch (error) {
      message.error("Failed to delete career", error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingCareer(null);
  };

  const columns = [
    {
      title: "Circular Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Circular Details",
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
            onClick={() => handleEditCareer(record)}
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="Are you sure to delete this career?"
            onConfirm={() => handleDeleteCareer(record._id)}
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
        <h1 className="text-2xl font-bold">All Careers</h1>
        <Button
          type="primary"
          onClick={() => setIsModalVisible(true)}
          style={{ marginBottom: 16 }}
        >
          <PlusSquareOutlined /> Add New
        </Button>
      </div>

      <Table
        dataSource={careers}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title={editingCareer ? "Edit Career" : "Create Career"}
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleCreateCareer} layout="vertical">
          <Form.Item name="title" label="Circular Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="details"
            label="Circular Details"
            // rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            name="type"
            label="Career Type"
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
          {/* <Form.Item
            name="image"
            label="Upload Career Image"
            valuePropName="file"
            rules={[{ required: true }]}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              defaultFileList={
                editingCareer?.image
                  ? [
                      {
                        url: `${API_BASE_URL}${editingCareer.image}`,
                      },
                    ]
                  : []
              }
              rules={[{ required: true }]}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item> */}

          <Button type="primary" htmlType="submit" loading={loading}>
            {editingCareer ? "Update Career" : "Create Career"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Careers;
