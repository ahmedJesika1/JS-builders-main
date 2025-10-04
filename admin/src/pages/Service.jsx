import {
  Badge,
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Switch,
  Table,
  Upload,
  Select,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import useServiceActions from "../hooks/useServiceActions";
import { truncateText } from "../helpers/truncateText";
import { useState } from "react";
import { API_BASE_URL } from "../shared/config";
import useAmenityActions from "../hooks/useAmenityActions";
import useFeaturedActions from "../hooks/useFeaturedActions";
import { useEffect } from "react";

const { Option } = Select;

const Service = () => {
  const { services, loading, createService, updateService, deleteService , getAllServices} =
    useServiceActions();
  const [expandedText, setExpandedText] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingService, setEditingService] = useState(null);
  const [fileList, setFileList] = useState([]);
  const { amenities } = useAmenityActions();
  const { featured } = useFeaturedActions();
  // search
  const [searchCategory, setSearchCategory] = useState("");
  const [searchID, setSearchID] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const handleCreateService = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title || "");
      formData.append("details", values.details || "");
      formData.append("category", values.category || "");
      formData.append("location", values.location || "");
      formData.append("status", values.status || "");
      formData.append("isActive", values.isActive ? true : false);
      (values.amenities || []).forEach((id) =>
        formData.append("amenities[]", id)
      );

      formData.append(
        "featuredItems",
        JSON.stringify(values.featuredItemsWithQty || [])
      );

      values.images.forEach((file) => {
        if (file.originFileObj) {
          formData.append("images", file.originFileObj);
        } else if (file.url) {
          const path = file.url.replace(API_BASE_URL, "");
          formData.append("existingImages[]", path);
        }
      });

      if (values.youtubeLink) {
        formData.append("youtubeLink", values.youtubeLink);
      }

      if (editingService) {
        await updateService(editingService._id, formData);
        setEditingService(null);
      } else {
        await createService(formData);
      }

      setIsModalVisible(false);
      form.resetFields();
      setFileList([]);
    } catch {
      message.error("Failed to save service");
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setIsModalVisible(true);

    const files =
      service.images?.map((img, index) => ({
        uid: String(index),
        name: img.split("/").pop(),
        status: "done",
        url: `${API_BASE_URL}${img}`,
        originFileObj: null,
      })) || [];

    form.setFieldsValue({
      ...service,
      amenities: service.amenities?.map((a) => a._id),
      isActive: service.isActive,
      images: files,
      featuredItemsWithQty: service.featuredItems?.map((f) => ({
        item: f?.item?._id || f?.item,
        quantity: f?.quantity ?? 1,
      })),
    });

    setFileList(files);
  };

  const handleDeleteService = async (id) => {
    try {
      await deleteService(id);
    } catch {
      message.error("Failed to delete service");
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingService(null);
    setFileList([]);
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleSeeMore = (id) => {
    setExpandedText((prevState) => (prevState === id ? null : id));
  };

  const columns = [
    {
      title: "Product Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Product Details",
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
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Media",
      dataIndex: "images",
      key: "images",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            maxWidth: "400px",
          }}
        >
          {record?.images?.map((img, index) => (
            <img
              key={index}
              src={`${API_BASE_URL}${img}`}
              alt={`${record.title}-${index}`}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          ))}
        </div>
      ),
    },
    {
      title: "YouTube Video",
      dataIndex: "youtubeLink",
      key: "youtubeLink",
      render: (link) => {
        if (!link) return "N/A";

        // YouTube ID extract
        const getYouTubeID = (url) => {
          const regExp =
            /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
          const match = url.match(regExp);
          return match && match[2].length === 11 ? match[2] : null;
        };

        const videoID = getYouTubeID(link);
        if (!videoID) return "Invalid URL";

        return (
          <iframe
            width="120" // table-er width hishebe adjust koro
            height="100"
            src={`https://www.youtube.com/embed/${videoID}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        );
      },
    },
    {
      title: "Amenities",
      dataIndex: "amenities",
      key: "amenities",
      render: (amenities) =>
        amenities?.length ? amenities.map((a) => a.label).join(", ") : "N/A",
    },
    {
      title: "Featured",
      dataIndex: "featuredItems",
      key: "featured",
      render: (featuredItems) => {
        if (!featuredItems || featuredItems.length === 0)
          return <span className="text-gray-400">N/A</span>;

        return (
          <div className="flex flex-wrap gap-1">
            {featuredItems?.map(({ item, quantity }, index) => {
              return (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
                >
                  {item?.label || "Unknown"}
                  {quantity > 1 ? ` x${Number(quantity)}` : ""}
                </span>
              );
            })}
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
            onClick={() => handleEditService(record)}
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="Are you sure to delete this service?"
            onConfirm={() => handleDeleteService(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </div>
      ),
    },
  ];


  useEffect(() => {
  const fetchFiltered = async () => {
    await getAllServices({
      category: searchCategory,
      location: searchLocation,
      status: searchStatus,
      id: searchID,
    });
  };
  fetchFiltered();
}, [searchCategory, searchID, searchLocation, searchStatus]);


  return (
    <div className="bg-white my-6 p-8 rounded-md overflow-auto">
      <div className="flex justify-between mb-4 overflow-x-auto">
        <h1 className="text-2xl font-bold">All Product</h1>
        <Button
          type="primary"
          onClick={() => setIsModalVisible(true)}
          style={{ marginBottom: 16 }}
        >
          <PlusSquareOutlined /> Add New
        </Button>
      </div>

      <div className="flex gap-4 mb-4 flex-wrap">
        <Select
          placeholder="Category"
          style={{ width: 150 }}
          allowClear
          value={searchCategory || undefined}
          onChange={(val) => setSearchCategory(val)}
        >
          <Option value="land">Land</Option>
          <Option value="apartment">Flat</Option>
        </Select>

        <Input
          placeholder="Product ID"
          style={{ width: 200 }}
          value={searchID}
          onChange={(e) => setSearchID(e.target.value)}
        />

        <Input
          placeholder="Location"
          style={{ width: 200 }}
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />

        <Select
          placeholder="Status"
          style={{ width: 150 }}
          allowClear
          value={searchStatus || undefined}
          onChange={(val) => setSearchStatus(val)}
        >
          <Option value="delivered">Delivered</Option>
          <Option value="running">Running</Option>
          <Option value="upcoming">Upcoming</Option>
        </Select>

        <Button
          onClick={() => {
            setSearchCategory("");
            setSearchID("");
            setSearchLocation("");
            setSearchStatus("");
          }}
        >
          Reset
        </Button>
      </div>

      <Table
        dataSource={services}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title={editingService ? "Edit Product" : "Create Product"}
        open={isModalVisible}
        onCancel={handleModalCancel}
        maskClosable={false}
        footer={null}
      >
        <Form form={form} onFinish={handleCreateService} layout="vertical">
          {/* Title */}
          <Form.Item
            name="title"
            label="Product Title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input />
          </Form.Item>

          {/* Details */}
          <Form.Item name="details" label="Product Details">
            <Input.TextArea rows={3} />
          </Form.Item>

          {/* Category */}
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select category" }]}
          >
            <Select placeholder="Select category">
              <Option value="land">Land</Option>
              <Option value="apartment">Flat</Option>
            </Select>
          </Form.Item>

          {/* Location */}
          <Form.Item name="location" label="Location">
            <Input />
          </Form.Item>

          {/* amenities */}
          <Form.Item name="amenities" label="Amenities">
            <Select
              mode="multiple"
              placeholder="Select amenities"
              optionLabelProp="label"
            >
              {amenities.map((a) => (
                <Option key={a._id} value={a._id} label={a.label}>
                  {a.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Featured Items with Quantity */}
          <Form.List name="featuredItemsWithQty">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "8px",
                    }}
                  >
                    {/* Featured Item Select */}
                    <Form.Item
                      {...restField}
                      name={[name, "item"]}
                      rules={[
                        { required: true, message: "Select a featured item" },
                      ]}
                      style={{ flex: 2 }}
                    >
                      <Select placeholder="Select featured item">
                        {featured.map((f) => (
                          <Option key={f._id} value={f._id}>
                            {f.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>

                    {/* Quantity Input */}
                    <Form.Item
                      {...restField}
                      name={[name, "quantity"]}
                      rules={[{ required: true, message: "Enter quantity" }]}
                      style={{ flex: 1 }}
                    >
                      <Input type="number" min={1} placeholder="Qty" />
                    </Form.Item>

                    {/* Remove Button */}
                    <Button danger onClick={() => remove(name)}>
                      Remove
                    </Button>
                  </div>
                ))}

                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block>
                    + Add Featured Item
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          {/* Status */}
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select placeholder="Select status">
              <Option value="delivered">Delivered</Option>
              <Option value="running">Running</Option>
              <Option value="upcoming">Upcoming</Option>
            </Select>
          </Form.Item>

          {/* Active */}
          <Form.Item name="isActive" label="Active" valuePropName="checked">
            <Switch />
          </Form.Item>

          {/* Image */}
          <Form.Item
            name="images"
            label="Upload Service Images"
            valuePropName="fileList"
            getValueFromEvent={(e) =>
              Array.isArray(e) ? e : e?.fileList || []
            }
            rules={[
              {
                required: !editingService,
                message: "At least 1 image is required",
              },
            ]}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              multiple
              fileList={fileList}
              onChange={handleFileChange}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          {/* YouTube Link */}
          <Form.Item
            name="youtubeLink"
            label="YouTube Video Link"
            rules={[{ type: "url", message: "Enter a valid URL" }]}
          >
            <Input placeholder="https://www.youtube.com/watch?v=xxxxxx" />
          </Form.Item>

          {/* Submit */}
          <Button type="primary" htmlType="submit" loading={loading}>
            {editingService ? "Update Product" : "Create Product"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Service;
