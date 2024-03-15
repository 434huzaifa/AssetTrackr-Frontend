import { Navigate } from "react-router-dom";

const Redirct = ({ children }) => {
  // const { company, loading } = useAuth();
  // if (loading) {
  //   return <Spin fullscreen></Spin>;
  // }
  // if (!company) {
  //   return <Navigate to="/login"></Navigate>;
  // } else {
  //   return children;
  // }
  const id = localStorage.getItem("company");
  if (id) {
    return children;
  }else{
    return <Navigate to="/login"></Navigate>;
  }
};

export default Redirct;
