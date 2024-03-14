import { Button, Card, Form, Input } from "antd";
import useAxio from "./useAxios"
import SuccessRespons from "./SuccessRespons";
import ErrorResponse from "./ErrorResponse";
import useAuth from "./useAuth"
const LoginCard = ({ setIsLogin }) => {
  const caxios = useAxio();
  function ChageLoginState() {
    setIsLogin(false);
  }
  function onFinish(values) {
    console.log(values);
    caxios.post("company/",values).then(res=>{
      localStorage.setItem("company",res.data.company.id)
      SuccessRespons(res)
    }).catch(e=>{
      ErrorResponse(e)
    })
    
  }
  return (
    <Card className="w-[85%]" >
      <p className="font-bold text-3xl text-center">Company Login Form</p>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item required label="Email" name="email">
          <Input></Input>
        </Form.Item>
        <Form.Item required label="Password" name="password1">
          <Input.Password></Input.Password>
        </Form.Item>
        <Button
          htmlType="submit"
          size="large"
          className=" bg-blue-400 text-white"
        >
          Login
        </Button>
      </Form>
      <p className="text-lg font-semibold">
        if you don't have account{" "}
        <span
          className="underline text-blue-500 cursor-pointer"
          onClick={ChageLoginState}
        >
          Sign Up
        </span>{" "}
      </p>
    </Card>
  );
};

export default LoginCard;
