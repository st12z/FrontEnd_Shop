import { Button, Form, Input, notification, Select } from "antd";
import { postJWT } from "../../../utils/request";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../../service/categoryService";

function CreateBrand(){
  const [api,contextHolder] = notification.useNotification();
  const [form] =Form.useForm();
  const [options,setOptions]=useState();
  const openNotification = (placement,message,color) => {
    api.info({
      message: `Thông báo`,
      description: <span style={{color:color,fontSize:"20px",fontWeight:600}}>{message}</span>,
      placement,
    });
  };
  const rules=[
    {
      required: true,
      message: 'Vui lòng điền đầy đủ!',
    },
  ];
  useEffect(()=>{
    const fetchApi=async()=>{
      const resultCategory=await getAllCategories();
      if(resultCategory.status==200){
        const options=resultCategory.data.map(item=>{
          return{
            label:item.name,
            value:item.id
          }
        });
        console.log(options);
        setOptions(options);
      }
    }
    fetchApi();
  },[]);
  const handleFinish=async(e)=>{
    console.log(e);
    try{
      const data=e;
      const result = await postJWT(`admin/brands/create-brand`,data);
      console.log(result);
      if(result.status==200){
        form.resetFields();
        openNotification("topRight","Tạo mới hãng sản phẩm thành công!","green");
      }
      else{
        openNotification("topRight","Tạo mới hãng sản phẩm thất bại!","green");
      }
    }catch(error){
      console.error(error);
      openNotification("topRight","Tạo mới hãng sản phẩm thất bại!","red");
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
        <Form.Item label="Tên hãng sản phẩm" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Danh mục" name="categoryId">
          <Select options={options}/>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">Tạo mới</Button>
        </Form.Item>
      </Form>
    </>
  )
}
export default CreateBrand;