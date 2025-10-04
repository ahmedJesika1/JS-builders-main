import {
  // Badge,
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Popconfirm,
  Space,
  // Switch,
  Table,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import useOurValuesActions from "../hooks/useOurValuesActions";
import { useState } from "react";
import { truncateText } from "../helpers/truncateText";

const OurValues = () => {
  const { ourValues, loading, createOurValue, updateOurValue, deleteOurValue } =
    useOurValuesActions();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingOurValue, setEditingOurValue] = useState(null);
  const [expandedDetailsText, setExpandedDetailsText] = useState(null);

  const handleDetailsSeeMore = (id) => {
    setExpandedDetailsText((prevState) => (prevState === id ? null : id));
  };
  // console.log(ourValues, "from ourValues");

  const handleCreateOurValue = async (values) => {
    try {
      const payload = {
        title: values.title || "",
        details: values.details || "",
        // isActive: values.isActive || false,
        info: values.info.map((item, index) => ({
          key: index,
          title: item.title || "",
          count: Number(item.count) || 0,
        })),
      };

      console.log(payload, "payload from inside");

      if (editingOurValue) {
        await updateOurValue(editingOurValue._id, payload);
        setEditingOurValue(null);
      } else {
        await createOurValue(payload);
        // values.reset();
      }

      form.resetFields();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.log(error);
      message.error("Failed to save our Value", error);
    }
  };

  const handleEditOurValue = (ourValue) => {
    setEditingOurValue(ourValue);
    setIsModalVisible(true);
    form.setFieldsValue({
      ...ourValue,
      isActive: ourValue.isActive,
      photo: undefined, // Reset photo field to avoid showing previous photo file
    });
  };

  const handleDeleteOurValue = async (id) => {
    try {
      await deleteOurValue(id);
    } catch (error) {
      message.error("Failed to delete ourValue", error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingOurValue(null);
  };
  // console.log(ourValuess, "from ourValuess");

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
              {isExpanded ? text : truncateText(text, 60)}{" "}
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
      title: "Info",
      dataIndex: "info",
      key: "info",
      render: (info) => {
        if (info) {
          return (
            <ul>
              {info.map((item) => (
                <li key={item._id}>
                  {item.title}:{" "}
                  <span className="font-semibold">{item.count}</span>
                </li>
              ))}
            </ul>
          );
        }
      },
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
            onClick={() => handleEditOurValue(record)}
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="Are you sure to delete this ourValues?"
            onConfirm={() => handleDeleteOurValue(record._id)}
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
        <h1 className="text-2xl font-bold">All OurValues</h1>
        <Button
          type="primary"
          onClick={() => setIsModalVisible(true)}
          style={{ marginBottom: 16 }}
        >
          <PlusSquareOutlined /> Add New
        </Button>
      </div>

      <Table
        dataSource={ourValues}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title={editingOurValue ? "Edit Our Value" : "Create Our Value"}
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleCreateOurValue} layout="vertical">
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
          <Form.List name="info">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "title"]}
                      label="Value Title"
                      rules={[{ required: true, message: "Missing title" }]}
                    >
                      <Input placeholder="Value Title" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "count"]}
                      label="Count"
                      rules={[{ required: true, message: "Missing count" }]}
                    >
                      <InputNumber placeholder="Count" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Value
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          {/* <Form.Item name="isActive" label="Active" valuePropName="checked">
            <Switch />
          </Form.Item> */}

          <Button type="primary" htmlType="submit" loading={loading}>
            {editingOurValue ? "Update" : "Create"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default OurValues;
