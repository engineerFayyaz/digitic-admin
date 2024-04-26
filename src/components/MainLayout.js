import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineSetting,
  AiOutlineShoppingCart,
  AiOutlineUserSwitch,
} from "react-icons/ai";
import { FaUpload, FaUserLock } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { FcDataConfiguration } from "react-icons/fc";
import { IoIosNotifications } from "react-icons/io";
import {  FaMobileAlt, FaDatabase,} from "react-icons/fa";
import { BiCategoryAlt, BiCustomize, BiUser } from "react-icons/bi";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { BsCardList } from "react-icons/bs";
import { MdOutlineDeleteSweep } from "react-icons/md";
import {getUserFromLocalStorage} from "../utils/localstorage";
import {getAuth} from "firebase/auth"
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [userData, setUserData] = useState(null);
    const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
      const user = getUserFromLocalStorage();
      setUserData(user);
    }, [])

    const handleLogout= () => {
      auth.signOut();
      localStorage.removeItem('user');
      toast.success("you are logged out")

      setTimeout(() => {
        navigate("/")
      },1000)
    }

    const handleMenuClick = ({ key }) => {
      if (key === 'signout') {
       auth.signOut();
        return;
      }
  
      if (key !== '') {
        // Check if user is authenticated
        const user = auth.currentUser;
        if (!user) {
          // User is not logged in, redirect to login page
          toast.error('Please login to continue');

          setTimeout(() => {
            navigate('/');
          },1000)
          return;
        }
      }
  
      // Navigate to the selected page
      navigate(key);
    }
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout /* onContextMenu={(e) => e.preventDefault()} */>
      <Sider  trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-2 mb-0">
          <span className="sm-logo"><img src="/images/logo2.png" width={50} /></span>
            <span className="lg-logo"> <img src="/images/logo white.png" width={200}/></span>
          
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={handleMenuClick}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            
            {
              key: "Manage Users",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "Manage Users",
              children: [
                {
                  key: "User-List",
                  icon: <BsCardList className="fs-4" />,
                  label: "All Users",
                },
                // {
                //   key: "VisitorProfile/UploadVisitorCheels",
                //   icon: <AiOutlineShoppingCart className="fs-4" />,
                //   label: "Add Cheels",
                // },
                {
                  key: "AccessPermissions/UserRole",
                  icon: <AiOutlineUserSwitch className="fs-4" />,
                  label: "User Role",
                },
                {
                  key: "AccessPermissions/UserPermission",
                  icon: <FaUserLock className="fs-4" />,
                  label: "User Permission",
                },
                // {
                //   key: "Add-Designer",
                //   icon: <FaPenSquare className="fs-4" />,
                //   label: "Add Designer",
                // },

                {
                  key: "User-Details",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "User Details",
                },

                // {
                //   key: "Product-Type",
                //   icon: <BsCardList className="fs-4" />,
                //   label: "Product Type",
                // },
                // {
                //   key: "Add-Edits",
                //   icon: <BiEdit className="fs-4" />,
                //   label: "Add Edits",
                // },
              ],
            },
            // {
            //   key: "orders",
            //   icon: <FcDataConfiguration className="fs-4" />,
            //   label: "Orders",
            // },
            {
              key: "Admin For Mobile",
              icon: <FaMobileAlt className="fs-4" />,
              label: "Admin For Mobile",
              children: [
                {
                  key: "ManageMobileData",
                  icon: <FaDatabase className="fs-4" />,
                  label: "Manage Mobile Data",
                },
                {
                  key: "UploadMobileData",
                  icon: <FaUpload className="fs-4" />,
                  label: "Upload Mobile Data",
                },
                {
                  key: "DeleteMobileData",
                  icon: <MdOutlineDeleteSweep className="fs-4" />,
                  label: "Delete Mobile Data",
                },
              ],
            },
            {
              key: "customization",
              icon: <BiCustomize className="fs-4" />,
              label: "Customization",
            },
            {
              key: "Configration",
              icon: <FcDataConfiguration className="fs-4" />,
              label: "Configration",
            },
            {
              key: "settings",
              icon: <AiOutlineSetting className="fs-4" />,
              label: "Settings",
            },
            // {
            //   key: "Product-Approval",
            //   icon: <BiCheckSquare className="fs-4" />,
            //   label: "Product Approval",
            // },
            {
              key: "RegisteredUser",
              icon: <BiUser className="fs-4" />,
              label: "Registered User",
            },
            
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="sticky-top d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>

            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img
                  width={32}
                  height={32}
                  src="/images/logo2.jpg"
                  className="object-fit-cover"
                  alt=""
                />
              </div>
              {userData ? (
                <>
                 <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">Admin</h5>
                <p className="mb-0">{userData.email}</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    onClick={handleLogout}
                  >
                    Signout
                  </Link>
                </li>
              </div>
                </>

              ): (
                <div className="">
                  <Link
                    to="/"
                    className="nav-link"
                  >
                    <b>Login</b>
                  </Link>
                </div>
              )}
             
            </div>
          </div>
        </Header>
        <Content
          style={{
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
