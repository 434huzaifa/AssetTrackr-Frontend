import { Avatar, Button, Menu, Popover, Spin } from "antd";

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { FaHome } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
const MyNavbar = () => {
  const { company, loading, llogout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const item = [
    {
      label: <NavLink to="/">Home</NavLink>,
      key: "/",
      icon: <FaHome />,
    },
    {
      label: <NavLink to="/emp">Employee</NavLink>,
      key: "/emp",
      icon:<IoPersonAddSharp />,
    },
  ];
  function loogout() {
    llogout();
    navigate("/login");
  }
  const content = (
    <div>
      {company && (
        <div className="flex flex-col justify-center items-center">
          <p className="text-lg font-semibold">{company?.title}</p>
          <p>{company?.email}</p>
          <Button
            className="bg-red-500 font-semibold text-white"
            onClick={loogout}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
  return (
    <div className="mt-3 mx-9 flex">
      <div className="flex justify-center items-center gap-2 border-b">
        <img src="/logo.png" className="w-10" />
        <span className="text-lg font-semibold">AssertTrackr</span>
      </div>
      <div className="flex-1">
        <Menu
          mode="horizontal"
          selectedKeys={location.pathname}
          items={item}
        ></Menu>
      </div>
      <Spin spinning={loading}>
        <div className="cursor-pointer">
          <Popover content={content} placement="bottomLeft">
            <Avatar
              size="large"
              className="bg-orange-300 text-orange-600 text-lg font-semibold"
              gap={0}
            >
              {!loading && String(company?.title).charAt(0).toUpperCase()}{" "}
            </Avatar>
          </Popover>
        </div>
      </Spin>
    </div>
  );
};

export default MyNavbar;
