import { Button, Card, DatePicker, Form, Select, Spin } from "antd";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import dayjs from "dayjs";

const Home = () => {
  const { company, loading } = useAuth();
  const [form] = Form.useForm();
  const caxios = useAxios();
  const queryCheckoutInfo = useQuery({
    queryKey: ["checkoutinfo", company?.id],
    queryFn: async () => {
      const res = await caxios.get(`checkout-info/?id=${company?.id}`);
      return res.data;
    },
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!company,
  });
  function onFinish(values) {
      values["return_date"]=values.return_date.format("DD-MM-YYYY")
      console.log(values);
  }
  return (
    <div className="mx-28 mt-6">
      <Card loading={loading || queryCheckoutInfo.isLoading}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Device"
            name="device"
            rules={[{ required: true }]}
            validateTrigger="onBlur"
          >
            <Select
              allowClear
              options={queryCheckoutInfo.data?.devices.map((x) => {
                return { value: x.id, label: x.name };
              })}
            ></Select>
          </Form.Item>
          <Form.Item
            label="Employee"
            name="employee"
            rules={[{ required: true }]}
            validateTrigger="onBlur"
          >
            <Select
              allowClear
              options={queryCheckoutInfo.data?.employees.map((x) => {
                return { value: x.id, label: x.name };
              })}
            ></Select>
          </Form.Item>
          <Form.Item
            label="Return Date"
            name="return_date"
            rules={[{ required: true }]}
            validateTrigger="onBlur"
          >
            <DatePicker
            allowClear
              className="w-full"
              minDate={dayjs()}
              format="DD-MM-YYYY"
            />
          </Form.Item>
          <Form.Item
            label="Checkout Condition"
            name="checkout_condition"
            rules={[{ required: true }]}
            validateTrigger="onBlur"
          >
            <Select
              allowClear
              options={[
                { value: "Excellent", label: "Excellent" },
                { value: "Good", label: "Good" },
                { value: "Fair", label: "Fair" },
                { value: "Poor", label: "Poor" },
              ]}
            ></Select>
          </Form.Item>
          <Button htmlType="submit">Checkout</Button>
        </Form>
      </Card>
    </div>
  );
};

export default Home;
