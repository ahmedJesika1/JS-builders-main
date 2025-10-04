import { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { IoMdLogOut } from "react-icons/io";
import { Layout, Menu, message } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { menuItems } from "../shared/routeItems";
import { logoutUser } from "../utils/Slices/userSlices";
import logo from "../assets/logo/logo.png";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    localStorage.getItem("selectedMenuItem") || "1"
  );
  
  const [openKeys, setOpenKeys] = useState([]); // for handling open submenus
  const [hideLayout, setHideLayout] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuItemClick = ({ key }) => {
    setSelectedMenuItem(key);
    localStorage.setItem("selectedMenuItem", key);
    navigate(`/dashboard/${key}`);
  };

  const handleOpenChange = (keys) => {
    // Only keep the last opened submenu
    setOpenKeys(keys.length > 0 ? [keys[keys.length - 1]] : []);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) navigate("/");

    const lastAccessTime = localStorage.getItem("lastAccessTime");
    const now = new Date().getTime();

    if (lastAccessTime && now - parseInt(lastAccessTime, 10) > 7 * 24 * 60 * 60 * 1000) {
      setHideLayout(true); // Hide layout after 7 days
    }

    localStorage.setItem("lastAccessTime", now.toString());
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logoutUser());
    message.success("You have been logged out!");
    navigate("/");
  };

  return (
    <Layout hasSider>
      {!hideLayout && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="bg-secondary h-screen"
        >
          <div
            className={`text-black mx-auto font-bold text-2xl text-center rounded-full mt-10 mb-10 ${
              collapsed
                ? `w-[50px] h-[20px] leading-[50px]`
                : `w-[70px] h-[70px] leading-[110px]`
            }`}
          >
            <img className=" rounded" src={logo} alt="Logo" />
          </div>
          <Menu
            theme="light"
            className="bg-secondary pb-10 h-[calc(100vh-120px)] overflow-y-auto"
            mode="inline"
            selectedKeys={[selectedMenuItem]}
            openKeys={openKeys}
            onOpenChange={handleOpenChange}
            onClick={handleMenuItemClick}
            items={menuItems}
          />
        </Sider>
      )}
      <Layout className="h-screen">
        <Header className="w-full flex justify-between mx-0 px-0 items-center bg-secondary">
          <div
            onClick={() => setCollapsed(!collapsed)}
            className="px-4 text-black hover:text-black/70 bg-secondary hover:bg-secondary/70 cursor-pointer"
          >
            {collapsed ? (
              <MenuUnfoldOutlined className="text-xl" />
            ) : (
              <MenuFoldOutlined className="text-xl" />
            )}
          </div>
          <div
            className="px-4 cursor-pointer font-medium mr-6 text-black hover:text-black/70"
            onClick={handleLogout}
          >
            <IoMdLogOut size={30} />
          </div>
        </Header>
        <Content className="px-5 pb-20 overflow-y-auto h-full">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
