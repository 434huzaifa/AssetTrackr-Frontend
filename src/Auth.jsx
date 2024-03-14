import { createContext, useEffect, useState, } from 'react';
import useAxios from './useAxios.js';

export const myContext = createContext(null)

const Auth = ({ children }) => {
  const caxios = useAxios()
  const [company,setCompany]=useState()
  const [loading,setLoading]=useState()
  const context = {
    setCompany,
    company
  }

  return (
    <myContext.Provider value={context}>
      {children}
    </myContext.Provider>
  );
};

export default Auth;