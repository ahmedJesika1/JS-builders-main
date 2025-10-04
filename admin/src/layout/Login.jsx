import { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { activeUser } from "../utils/Slices/userSlices";
import axiosInstance from "../components/Axios";
import Logo from "../assets/logo/logo.png";
import LoginImage from "../assets/image/LoginImage.jpg";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard/banners");
    }
  }, [navigate]);

  const onFinish = async (values) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        emailOrPhone: values.email,
        password: values.password,
      });
      if (response.data.status === "success") {
        const {
          token,
          data: { user },
        } = response.data;

        // Check if the user is an admin
        if (user.role !== "admin") {
          message.error("You do not have admin access.");
          return;
        }

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        dispatch(activeUser({ token, user }));

        navigate("/dashboard/banners");
        message.success("Login successful!");
      } else {
        message.error("Login failed! Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="flex justify-center flex-col items-center h-screen bg-gradient-to-r from-indigo-200 to-yellow-100">
      <div className="flex items-center gap-5 h-[400px]">
        {/* gap-5 ≈ 20px, h-[400px] sets same height */}

        {/* Image Section */}
        <div className="w-1/2 h-full">
          <img
            className="w-full h-full object-cover rounded-md"
            src={LoginImage}
            alt="Login Image"
          />
        </div>

        {/* Login Form Section */}
        <div className="w-1/2 border p-10 rounded-md bg-tertiary flex flex-col justify-center h-full">
          <div className="flex items-center justify-center gap-4">
            <h1 className="text-2xl font-bold mb-5 text-center">Login</h1>{" "}
            <div className="w-12 h-12">
              <img
                className=""
                src={Logo}
                alt="Login Image"
              />
            </div>
          </div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-primary"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
          <div className="text-center mt-2">
            <Link
              href="/forgot-password"
              className="text-slate-700 hover:text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
