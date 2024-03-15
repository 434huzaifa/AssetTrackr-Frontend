import useAuth from "./useAuth";
import { Navigate } from "react-router-dom";

const Redirct = ({ children }) => {
  const { company, loading } = useAuth();
  if (!loading) {
    if (!company) {
      return <Navigate to="/login"></Navigate>;
    } else {
      return  children ;
    }
  } //Problem. refresh takes to /login
};

export default Redirct;
