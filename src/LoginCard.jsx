import { Button, Card, Form, Input } from "antd";

const LoginCard = ({setIsLogin}) => {
    function ChageLoginState() {
        setIsLogin(false)
    }
    function onFinish(values) {
        console.log(values);
    }
    return (
        <Card className="w-[85%]" onFinish={onFinish}>
              <p className="font-bold text-3xl text-center">Company Login Form</p>
              <Form layout="vertical">
                <Form.Item required  label="Email" name="email">
                  <Input></Input>
                </Form.Item>
                <Form.Item required  label="Password" name="password">
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
              <p className="text-lg font-semibold">if you don't have account <span className="underline text-blue-500 cursor-pointer" onClick={ChageLoginState}>Sign Up</span> </p>
            </Card>
    );
};

export default LoginCard;