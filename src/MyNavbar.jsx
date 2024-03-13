import { Menu } from "antd";

import {MailOutlined } from '@ant-design/icons';
import { NavLink } from "react-router-dom";
const MyNavbar = () => {
  const item=[
    {
        label:<NavLink to="/login">Login</NavLink>,
        key:'login',
        icon:<MailOutlined/>
    }
  ]
  return <>
  <Menu mode="horizontal" items={item}></Menu>
  </>;
};

export default MyNavbar;
