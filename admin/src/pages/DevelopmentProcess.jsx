import {
  // Badge,
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  // Switch,
  Table,
  Upload,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import useDevelopmentProcessActions from "../hooks/useDevelopmentProcessActions";
import { truncateText } from "../helpers/truncateText";
import { useState } from "react";
import { API_BASE_URL } from "../shared/config";

const DevelopmentProcess = () => {
  const {
    developmentProcesses,
    loading,
    createDevelopmentProcess,
    updateDevelopmentProcess,
    deleteDevelopmentProcess,
  } = useDevelopmentProcessActions();
  const [expandedText, setExpandedText] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingDevelopmentProcess, setEditingDevelopmentProcess] =
    useState(null);
  const [fileList, setFileList] = useState([]);

  const handleCreateDevelopmentProcess = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title || "");
      formData.append("details", values.details || "");
      // formData.append("isActive", values.isActive);

      // Only append the photo if it's being changed
      if (values.image && values.image.file) {
        formData.append("image", values.image.file);
      }

      if (editingDevelopmentProcess) {
        await updateDevelopmentProcess(editingDevelopmentProcess._id, formData);
        setEditingDevelopmentProcess(null);
      } else {
        await createDevelopmentProcess(formData);
      }

      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Failed to save developmentProcess", error);
    }
  };

  const handleEditDevelopmentProcess = (developmentProcess) => {
    setEditingDevelopmentProcess(developmentProcess);
    setIsModalVisible(true);
    form.setFieldsValue({
      ...developmentProcess,
      isActive: developmentProcess.isActive,
    });

    const imageUrl = `${API_BASE_URL}${developmentProcess.image}`;
    setFileList([
      {
        uid: "-1",
        name: developmentProcess.image.split("/").pop(),
        status: "done",
        url: imageUrl,
      },
    ]);
  };

  const handleDeleteDevelopmentProcess = async (id) => {
    try {
      await deleteDevelopmentProcess(id);
    } catch (error) {
      message.error("Failed to delete developmentProcess", error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingDevelopmentProcess(null);
    setFileList([]);
  };
  // Function to handle the toggle of expanded text
  const handleSeeMore = (id) => {
    setExpandedText((prevState) => (prevState === id ? null : id));
  };
  // console.log(developmentProcesss, "from developmentProcesss");
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
        const isExpanded = expandedText === record._id;
        const safeText = text || "";
        return (
          <div>
            <span>
              {isExpanded ? text : truncateText(text)}{" "}
              {safeText.length > 100 && (
                <a
                  onClick={() => handleSeeMore(record._id)}
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
        // console.log(record)
        <img
          src={`${API_BASE_URL}${record.image}`}
          alt={record.title}
          style={{ width: "100px" }}
        />
      ),
    },
    // {
    //   title: "Active",
    //   dataIndex: "isActive",
    //   key: "isActive",
    //   render: (isActive) => (
    //     <Badge
    //       count={isActive ? "Yes" : "No"}
    //       style={{
    //         backgroundColor: isActive ? "#52c41a" : "#ff4d4f",
    //         color: "white",
    //       }}
    //     />
    //   ),
    // },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex flex-col gap-1">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditDevelopmentProcess(record)}
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="Are you sure to delete this developmentProcess?"
            onConfirm={() => handleDeleteDevelopmentProcess(record._id)}
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
        <h1 className="text-2xl font-bold">All DevelopmentProcess</h1>
        <Button
          type="primary"
          onClick={() => setIsModalVisible(true)}
          style={{ marginBottom: 16 }}
        >
          <PlusSquareOutlined /> Add New
        </Button>
      </div>

      <Table
        dataSource={developmentProcesses}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title={
          editingDevelopmentProcess
            ? "Edit Development Process"
            : "Create Development Process"
        }
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleCreateDevelopmentProcess}
          layout="vertical"
        >
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
          {/* <Form.Item name="isActive" label="Active" valuePropName="checked">
            <Switch />
          </Form.Item> */}
          <Form.Item
            name="image"
            label="Upload Image"
            valuePropName="file"
            rules={[{ required: true }]}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              rules={[{ required: true }]}
              fileList={fileList}
              onChange={handleFileChange}
            >
              <Button icon={<UploadOutlined />}>
                Upload{" "}
                {form.getFieldValue("mediaType") === "video"
                  ? "Video"
                  : "Image"}
              </Button>
            </Upload>
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading}>
            {editingDevelopmentProcess ? "Update" : "Create"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default DevelopmentProcess;
