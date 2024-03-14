import { Button, Card, Form, Input, Spin } from "antd";
import useAxio from "./useAxios";
import SuccessRespons from "./SuccessRespons";
import ErrorResponse from "./ErrorResponse";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
const LoginCard = ({ setIsLogin }) => {
  const caxios = useAxio();
  const navigate = useNavigate();
  const { setCompany } = useAuth();
  const mutationLogin = useMutation({
    mutationFn: async (values) => {
      const res = await caxios.post("company/", values);
      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("company", data.company.id);
      setCompany(data.company);
      SuccessRespons(data);
      navigate("/");
    },
    onError: (err) => {
      ErrorResponse(err);
    },
  });
  function ChageLoginState() {
    setIsLogin(false);
  }
  async function onFinish(values) {
    await mutationLogin.mutateAsync(values);
  }
  return (
    <Card className="w-[85%]" loading={mutationLogin.isPending}>
      <p className="font-bold text-3xl text-center">Company Login Form</p>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          rules={[{ required: true }]}
          validateTrigger="onBlur"
          label="Email"
          name="email"
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          validateTrigger="onBlur"
          label="Password"
          name="password1"
        >
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
