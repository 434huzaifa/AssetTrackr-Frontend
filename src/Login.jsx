import { Card } from "antd";
import LoginCard from "./LoginCard";
import { useState } from "react";
import RegisterCard from "./RegisterCard";

const Login = () => {
    const [isLogin,setIsLogin]=useState(true)
  return (
    <div>
      <Card className="my-5 mx-5">
        <div className="  flex gap-6 justify-center items-center">
          <div className="flex-1">
            <img src="/tech.jpg" />
          </div>
          <div className="flex-1 flex justify-center">
            {
                isLogin? <LoginCard setIsLogin={setIsLogin}></LoginCard> : <RegisterCard setIsLogin={setIsLogin}></RegisterCard>
            }
            
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
