import { createContext, useEffect, useState } from "react";
import useAxios from "./useAxios.js";

export const myContext = createContext(null);

const Auth = ({ children }) => {
  const caxios = useAxios();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const llogout=()=>{
    setLoading(true)
    setCompany(false)
    localStorage.removeItem("company")
    setLoading(false)
  }
  useEffect(() => {
    const unsub = () => {
      setLoading(true);
      const id = localStorage.getItem("company");
      if (id) {
        caxios
          .get(`company/?id=${id}`)
          .then((res) => {
            setCompany(res.data.company);
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      }
    };
    return () => {
      unsub();
    };
  }, []);
  const context = {
    setCompany,
    company,
    loading,
    llogout
  };

  return <myContext.Provider value={context}>{children}</myContext.Provider>;
};

export default Auth;
