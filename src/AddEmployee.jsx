import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Card, Empty, Form, Input, Select, Table } from "antd";
import useAxios from "./useAxios";
import SuccessRespons from "./SuccessRespons";
import ErrorResponse from "./ErrorResponse";
import useAuth from "./useAuth";
import SomethingWrong from "./SomethingWrong";
import Swal from "sweetalert2";

const AddEmployee = () => {
  const { company, loading } = useAuth();
  const [form] = Form.useForm();
  const caxios = useAxios();
  const queryEmploye = useQuery({
    queryKey: [company?.id,'employee'],
    queryFn: async () => {
      const res = await caxios.get(`employee/?id=${company?.id}`);
      return res.data;
    },
    enabled: !!company,
    refetchOnWindowFocus: false,
    retry: 2,
  });
  const mutationAddEmp = useMutation({
    mutationFn: async (values) => {
      const res = await caxios.post("employee/", values);
      return res.data;
    },
    onSuccess: (data) => {
      queryEmploye.refetch();
      SuccessRespons(data);
      
    },
    onError: (err) => {
      ErrorResponse(err);
    },
  });
  const mutationDelete=useMutation({
    mutationFn:async(id)=>{
        const res=await caxios.delete(`employee/${id}/`)
        return res.data
    },
    onSuccess: (data) => {
        queryEmploye.refetch();
        SuccessRespons(data);
        
      },
      onError: (err) => {
        ErrorResponse(err);
      },
  })
  function deleteTheEmp(record) {
    Swal.fire({
        title:"Delete",
        text:`Do you want to delete ${record.name}?`,
        icon:"question",
        showCancelButton:true,
        confirmButtonText:"Yes"
    }).then(async result=>{
        if (result.isConfirmed) {
            await mutationDelete.mutateAsync(record.id)
        }
    })
  }
  async function onFinish(values) {
    values["company"] = company.id;
    await mutationAddEmp.mutateAsync(values);
    form.resetFields()
  }
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Delegate",
      dataIndex: "delegate",
      key: "delegate",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => {
        return <Button className="bg-red-300 text-red-700" onClick={()=>{deleteTheEmp(record)}}>Delete</Button>;
      },
    },
  ];
  return (
    <div className="mx-28 mt-6">
      <Card loading={loading}>
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true }]}
            validateTrigger="onBlur"
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            validateTrigger="onBlur"
            name="delegate"
            label="Delegate"
          >
            <Select
              allowClear
              options={[
                { value: "CEO", label: "CEO" },
                { value: "CTO", label: "CTO" },
                { value: "HR", label: "HR" },
                { value: "Project Manager", label: "Project Manager" },
                { value: "Developer", label: "Developer" },
                { value: "QA Engineer", label: "QA Engineer" },
                { value: "Designer", label: "Designer" },
                { value: "Call Executive", label: "Call Executive" },
                { value: "Staff", label: "Staff" },
              ]}
            ></Select>
          </Form.Item>
          <Button
            htmlType="submit"
            className="bg-blue-600 text-white"
            size="large"
          >
            Add
          </Button>
        </Form>
      </Card>
      <Card
        className="mt-3"
        loading={
          queryEmploye.isLoading ||
          queryEmploye.isRefetching ||
          queryEmploye.isFetching || mutationDelete.isPending
        }
      >
        {queryEmploye.isSuccess ? (
          queryEmploye.data?.employees.length != 0 ? (
            <Table
              columns={columns}
              pagination={false}
              rowKey={(record)=>(record.id)}
              bordered={true}
              dataSource={queryEmploye.data?.employees}
            ></Table>
          ) : (
            <Empty description="No Employee Added"></Empty>
          )
        ) : (
          <SomethingWrong></SomethingWrong>
        )}
      </Card>
    </div>
  );
};

export default AddEmployee;
