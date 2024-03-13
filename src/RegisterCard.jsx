import { Button, Card, Form, Input } from "antd";
import showToast from "./showToast"
import useAxios from "./useAxios";
const RegisterCard = ({ setIsLogin }) => {
    function ChageLoginState() {
        setIsLogin(true)
    }
    const caxios=useAxios()
    function onFinish(values) {
        if (values.password1==values.password2) {
            console.log(values);
            caxios.post("company/",values).then(res=>{
                console.log(res.data);
                showToast("success",res.data.msg)
            }).catch(e=>{
                if (e?.response?.data?.msg) {
                    showToast("error",e.response.data.msg)
                }else{
                    showToast("error","Something Wrong")
                }
            })
        }else{
            showToast("error","Password Mismatch")
        }
    }
  return (
    <Card className="w-[85%]">
      <p className="font-bold text-3xl text-center">Company Sign Up Form</p>
      <Form onFinish={onFinish} layout="vertical">
      <Form.Item required  label="Title" name="title">
          <Input></Input>
        </Form.Item>
        <Form.Item required  label="Email" name="email">
          <Input></Input>
        </Form.Item>
        <Form.Item required  label="Password" name="password1">
          <Input.Password></Input.Password>
        </Form.Item>
        <Form.Item required  label="Confirm Password" name="password2">
          <Input.Password></Input.Password>
        </Form.Item>
        <Button
          htmlType="submit"
          size="large"
          className=" bg-blue-400 text-white"
        >
          Sign Up
        </Button>
      </Form>
      <p className="text-lg font-semibold">
        if you have account{" "}
        <span
          className="underline text-blue-500 cursor-pointer"
          onClick={ChageLoginState}
        >
          Login
        </span>{" "}
      </p>
    </Card>
  );
};

export default RegisterCard;
