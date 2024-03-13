import { createContext, } from 'react';
import useAxios from './useAxios.js';
export const myContext = createContext(null)
const Auth = ({ children }) => {
  const caxios = useAxios()
  // useEffect(() => {
  //   const unSubscribe = onAuthStateChanged(auth, currentUser => {
  //     setUser(currentUser);
  //     if (currentUser && !!currentUser?.email) {
  //       if (role != null) {
  //         caxios.post('/jsonwebtoken', { email: currentUser.email, role: role }).then(res => {
  //           setLoading(false)
  //           return res
  //         }).catch(error => console.log(error))
  //       } else {
  //         caxios.get(`/getrole?mail=${currentUser?.email}`).then(res => {
  //           setRole(res.data)
  //           caxios.post('/jsonwebtoken', { email: currentUser.email, role: res.data }).then(res => {
  //             setLoading(false)
  //             return res
  //           }).catch(error => console.log(error))
  //         })
  //       }

  //     } else {
  //       setLoading(false)
  //       caxios.post('/logout').then().catch(err => err)
  //     }
  //   });
  //   return () => {
  //     unSubscribe();
  //   }
  // }, [])
  const context = {

  }

  return (
    <myContext.Provider value={context}>
      {children}
    </myContext.Provider>
  );
};

export default Auth;