import { Button, Form, Input, InputNumber, notification, Upload } from "antd";
import {UploadOutlined} from "@ant-design/icons";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { createDiscount } from "../../../service/discountService";
function CreateDiscount(){
  const [form] = Form.useForm();
  const [fileList,setFileList]=useState([]);
  const [api,contextHolder] = notification.useNotification();
  const openNotification = (placement,message,color) => {
    api.info({
      message: `Thông báo`,
      description: <span style={{color:color,fontSize:"20px",fontWeight:600}}>{message}</span>,
      placement,
    });
  };
  const handleChangeImage=(e)=>{
    setFileList(e.fileList);
  }
  const handleFinish=async(e)=>{
    let file = "";
    if(fileList.length>0){
      file=fileList[0].originFileObj;
    }
    const data={
      name:e.name,
      description:e.description,
      value:e.value
    }
    const formData = new FormData();
    formData.append("discount",new Blob([JSON.stringify(data)],{type:"application/json"}));
    formData.append("imageFile",file);
    try{
      const result = await createDiscount(`admin/discounts/create-discount`,formData);
      console.log(result);
      if(result.status==200){
        openNotification("topRight","Tạo mới mã giảm giá thành công!","green");
        form.resetFields();
        setFileList([]);
      }
      else{
        openNotification("topRight","Tạo mới mã giảm giá thất bại!","red");
      }
    }catch(error){
      openNotification("topRight","Tạo mới mã giảm giá thất bại!","red");
      console.log(error);
    }
    
  }
  return(
    <>
      {contextHolder}
      <Form
        layout="vertical"
        onFinish={handleFinish}
        form={form}
      >
        <Form.Item
          label="Tên mã giảm giá"
          name="name"
        >
          <Input />
        </Form.Item> 
        <Form.Item label="Mô tả" name="description">
          <TextArea rows={3}/>
        </Form.Item> 
        <Form.Item label="Giá trị" name="value">
          <InputNumber min={0}/>
        </Form.Item> 
        <Form.Item label="Số lượng" name="quantity">
          <InputNumber min={0}/>
        </Form.Item> 
        <Form.Item>
          <Upload
            listType="picture"
            fileList={fileList}
            onChange={handleChangeImage}
          
          >
            {fileList.length >=1 ? null : (
              <Button type="primary" icon={<UploadOutlined />}>
              Upload
            </Button>
            )}
          </Upload>
        </Form.Item>

        <Button htmlType="submit" type="primary">Tạo mới</Button>
      </Form>
          
    </>
  )
}
export default CreateDiscount;