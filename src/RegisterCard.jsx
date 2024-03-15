import { Button, Card, Form, Input } from "antd";
import showToast from "./showToast";
import useAxios from "./useAxios";
import { useMutation } from "@tanstack/react-query";
import ErrorResponse from "./ErrorResponse";
const RegisterCard = ({ setIsLogin }) => {
  const caxios = useAxios();
  const mutationRegister = useMutation({
    mutationFn: async (values) => {
      const res = await caxios.post("company/", values);
      return res.data;
    },
    onSuccess: (data) => {
      showToast("success", data.msg);
      ChageLoginState()
    },
    onError: (err) => {
      ErrorResponse(err);
    },
  });
  function ChageLoginState() {
    setIsLogin(true);
  }
  async function onFinish(values) {
    if (values.password1 == values.password2) {
      await mutationRegister.mutateAsync(values);
    } else {
      showToast("error", "Password Mismatch");
    }
  }
  return (
    <Card className="w-[85%]" loading={mutationRegister.isPending}>
      <p className="font-bold text-3xl text-center">Company Sign Up Form</p>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          rules={[{ required: true }]}
          validateTrigger="onBlur"
          label="Title"
          name="title"
        >
          <Input></Input>
        </Form.Item>
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
        <Form.Item
          rules={[{ required: true }]}
          validateTrigger="onBlur"
          label="Confirm Password"
          name="password2"
        >
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
