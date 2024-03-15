import { Spin } from "antd";
import useAuth from "./useAuth";
import { Navigate } from "react-router-dom";

const Redirct = ({ children }) => {
  const { company, loading } = useAuth();
  if (loading) {
    return <Spin fullscreen></Spin>;
  }
  if (!company) {
    return <Navigate to="/login"></Navigate>;
  } else {
    return children;
  }
};

export default Redirct;
