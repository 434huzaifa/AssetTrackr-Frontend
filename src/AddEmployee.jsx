import { Button, Card, Form, Input, Select } from "antd";

const AddEmployee = () => {

    function onFinish(values) {
        console.log(values);
    }
    return (
        <Card className="mx-28 mt-6">
            
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                name="name"
                label="Name"
                rules={[{required:true}]}
                validateTrigger="onBlur"
                >
                    <Input></Input>
                </Form.Item>
                <Form.Item
                                rules={[{required:true}]}
                                validateTrigger="onBlur"
                name="delegate"
                label="Delegate"
                >
                    <Select
                    allowClear
                    options={[
                      {value:"CEO",label:"CEO"},  
                      {value:"CTO",label:"CTO"},  
                      {value:"HR",label:"HR"},  
                      {value:"Project Manager",label:"Project Manager"},  
                      {value:"Developer",label:"Developer"},  
                      {value:"QA Engineer",label:"QA Engineer"},   
                      {value:"Designer",label:"Designer"},   
                      {value:"Call Executive",label:"Call Executive"},  
                      {value:"Staff",label:"Staff"},  
                    ]}
                    ></Select>
                </Form.Item>
                <Button htmlType="submit" className="bg-blue-600 text-white" size="large">Add</Button>
            </Form>
        </Card>
    );
};

export default AddEmployee;