import {
  Button,
  Card,
  DatePicker,
  Divider,
  Empty,
  Form,
  Select,
  Table,
  Tag,
} from "antd";
import useAuth from "./useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import dayjs from "dayjs";
import SuccessRespons from "./SuccessRespons";
import ErrorResponse from "./ErrorResponse";
import SomethingWrong from "./SomethingWrong";

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
  const queryNotReturn = useQuery({
    queryKey: ["NotReturn", company?.id],
    queryFn: async () => {
      const res = await caxios.get(`checkout/?id=${company?.id}&return=false`);
      return res.data;
    },
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!company,
  });
  const queryReturn = useQuery({
    queryKey: ["Return", company?.id],
    queryFn: async () => {
      const res = await caxios.get(`checkout/?id=${company?.id}&return=true`);
      return res.data;
    },
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!company,
  });
  const mutationCheckoutAdd = useMutation({
    mutationFn: async (values) => {
      const res = await caxios.post("checkout/", values);
      return res.data;
    },
    onSuccess: (data) => {
      queryNotReturn.refetch();
      SuccessRespons(data);
    },
    onError: (err) => {
      ErrorResponse(err);
    },
  });
  async function onFinish(values) {
    values["promised_return"] = values.promised_return.format("DD-MM-YYYY");
    values["company"] = company?.id;
    console.log(values);
    await mutationCheckoutAdd.mutateAsync(values);
  }
  const mutationDelete = useMutation({
    mutationFn: async (values) => {
      const res = await caxios.patch("checkout/", values);
      return res.data;
    },
    onSuccess: (data) => {
      queryReturn.refetch();
      queryNotReturn.refetch();
      SuccessRespons(data);
    },
    onError: (err) => {
      ErrorResponse(err);
    },
  });
  async function onFinish2(values) {
    await mutationDelete.mutateAsync(values);
  }
  const colmuns = [
    {
      title: "Device",
      dataIndex: "device",
      key: "device",
      render: (x, _) => {
        _;
        return x.name;
      },
    },
    {
      title: "Employee",
      dataIndex: "employee",
      key: "employee",
      render: (x, _) => {
        _;
        return x.name;
      },
    },
    {
      title: "Checked Out",
      dataIndex: "checkout_date",
      key: "checkout_date",
    },
    {
      title: "Promised Return",
      dataIndex: "promised_return",
      key: "promised_return",
    },
    {
      title: "Checkout Condition",
      dataIndex: "checkout_condition",
      key: "checkout_condition",
      render: (data, _) => {
        _;
        if (data == "Excellent") {
          return <Tag color="success">{data}</Tag>;
        } else if (data == "Good") {
          return <Tag color="processing">{data}</Tag>;
        } else if (data == "Fair") {
          return <Tag color="warning">{data}</Tag>;
        } else if (data == "Poor") {
          return <Tag color="error">{data}</Tag>;
        }
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record) => {
        return (
          <>
            <Form className="flex gap-2" onFinish={onFinish2}>
              <Form.Item
                className="hidden"
                name="id"
                initialValue={record?.id}
              ></Form.Item>
              <Form.Item
                name="return_condition"
                className="w-[250px]"
                rules={[{ required: true }]}
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
              <Button htmlType="submit" className="bg-cyan-300 text-cyan-700">
                Return
              </Button>
            </Form>
          </>
        );
      },
    },
  ];
  const colmunCopy = colmuns.filter((x,index)=>![5].includes(index));
  colmunCopy.push({
    title: "Return Condition",
    dataIndex: "return_condition",
    key: "return_condition",
    render: (data, _) => {
      _;
      if (data == "Excellent") {
        return <Tag color="success">{data}</Tag>;
      } else if (data == "Good") {
        return <Tag color="processing">{data}</Tag>;
      } else if (data == "Fair") {
        return <Tag color="warning">{data}</Tag>;
      } else if (data == "Poor") {
        return <Tag color="error">{data}</Tag>;
      }
    },
  });
  colmunCopy.push({
    title: "Return Date",
    dataIndex: "return_date",
    key: "return_date",
  });
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
            label="Promised Return"
            name="promised_return"
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
      <Divider>Not Return Items</Divider>
      <Card loading={queryNotReturn.isLoading}>
        {queryNotReturn.isSuccess ? (
          queryNotReturn.data?.checkouts.length != 0 ? (
            <Table
              columns={colmuns}
              pagination={false}
              dataSource={queryNotReturn.data?.checkouts}
            ></Table>
          ) : (
            <Empty description="No device checked out"></Empty>
          )
        ) : (
          <SomethingWrong></SomethingWrong>
        )}
      </Card>
      <Divider>Return Items</Divider>
      <Card loading={queryReturn.isLoading}>
        {queryReturn.isSuccess ? (
          queryReturn.data?.checkouts.length != 0 ? (
            <Table
              columns={colmunCopy}
              pagination={false}
              dataSource={queryReturn.data?.checkouts}
            ></Table>
          ) : (
            <Empty description="No device return yet"></Empty>
          )
        ) : (
          <SomethingWrong></SomethingWrong>
        )}
      </Card>
    </div>
  );
};

export default Home;
