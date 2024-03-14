import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Card, Empty, Form, Input, Select, Table } from "antd";
import useAxios from "./useAxios";
import SuccessRespons from "./SuccessRespons";
import ErrorResponse from "./ErrorResponse";
import useAuth from "./useAuth";
import Swal from "sweetalert2";
import SomethingWrong from "./SomethingWrong";

const Device = () => {
    const { company, loading } = useAuth();
    const caxios=useAxios()
    const [form]=Form.useForm()
    const queryDevices=useQuery({
        queryKey:[company?.id,'device'],
        queryFn:async ()=>{
            const res= await caxios.get(`device/?id=${company?.id}`)
            return res.data
        },
        enabled:!!company,
        refetchOnWindowFocus:false,
        retry:2
    })
    const mutationAddDevice= useMutation({
        mutationFn:async (values)=>{
            const res= await caxios.post("device/",values)
            return res.data
        },
        onSuccess:(data)=>{
            SuccessRespons(data)
            
        },
        onError:(err)=>{
            ErrorResponse(err)
        }
    })
    const mutationDelete=useMutation({
        mutationFn:async(id)=>{
            const res=await caxios.delete(`device/${id}/`)
            return res.data
        },
        onSuccess: (data) => {
            queryDevices.refetch();
            SuccessRespons(data);
            
          },
          onError: (err) => {
            ErrorResponse(err);
          },
      })
    async function onFinish(values) {
        values['company']=company?.id
        await mutationAddDevice.mutateAsync(values)
        form.resetFields()
    }
    function deleteTheDevice(record) {
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
    const columns = [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Condition",
          dataIndex: "condition",
          key: "condition",
        },
        {
          title: "Action",
          key: "action",
          render: (record) => {
            return <Button className="bg-red-300 text-red-700" onClick={()=>{deleteTheDevice(record)}}>Delete</Button>;
          },
        },
      ];
  return (
    <div className="mx-28 mt-6">
      <Card loading={loading || mutationAddDevice.isPending}>
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            label="Name"
            name="name"
            validateTrigger="onBlur"
            rules={[{ required: true }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
           label="Condition"
           name="condition"
           validateTrigger="onBlur"
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
          <Button htmlType="submit">Add</Button>
        </Form>
      </Card>
      <Card
        className="mt-3"
        loading={
            queryDevices.isLoading ||
            queryDevices.isRefetching ||
            queryDevices.isFetching || mutationDelete.isPending
        }
      >
        {queryDevices.isSuccess ? (
          queryDevices.data?.devices.length != 0 ? (
            <Table
              columns={columns}
              pagination={false}
              rowKey={(record)=>(record.id)}
              bordered={true}
              dataSource={queryDevices.data?.devices}
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

export default Device;
