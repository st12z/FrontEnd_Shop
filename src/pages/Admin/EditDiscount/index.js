import { Button, Form, Input, InputNumber, notification, Switch, Upload } from "antd";
import {UploadOutlined} from "@ant-design/icons";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { createDiscount, editDiscount, getDiscountById } from "../../../service/discountService";
import { useNavigate, useParams } from "react-router-dom";
import { set } from "lodash";
function EditDiscount(){
  const [form] = Form.useForm();
  const [fileList,setFileList]=useState([]);
  const [api,contextHolder] = notification.useNotification();
  const [active,setActive] = useState();
  const [discount,setDiscount] =useState();
  const params=useParams();
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchApi = async()=>{
      try{
        const result = await getDiscountById(`admin/discounts/${params.id}`);
        console.log(result);
        if(result.status==200){
          setDiscount(result.data);
          setActive(result.data.active);
          setFileList([
            {
              uid:'-1',
              name:'discount-image.png',
              status:'done',
              url:result.data.image
            }
          ])
          form.setFieldsValue(result.data);
        }
      }catch(error){
        console.error(error);
      }
    }
    fetchApi();
  },[]);
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
    console.log(fileList);
    if(fileList.length>0 && fileList[0].originFileObj){
      file=fileList[0].originFileObj;
    }
    const data={
      name:e.name,
      description:e.description,
      value:e.value,
      active:active,
      quantity:e.quantity
    }
    const formData = new FormData();
    formData.append("discount",new Blob([JSON.stringify(data)],{type:"application/json"}));
    if(file)formData.append("imageFile",file);
    console.log(data);
    console.log(file);
    try{
      const result = await editDiscount(`admin/discounts/edit-discount/${params.id}`,formData);
      console.log(result);
      if(result.status==200){
        openNotification("topRight","Cập nhật mã giảm giá thành công!","green");
        navigate("/admin/manage-discounts")
        setFileList([]);
      }
      else{
        openNotification("topRight","Cập nhật mã giảm giá thất bại!","red");
      }
    }catch(error){
      openNotification("topRight","Cập nhật mã giảm giá thất bại!","red");
      console.log(error);
    }
    
  }
  const handleSwitchChange=(e)=>{
    setActive(e);
  }
  return(
    <>
      {contextHolder}
      <Form
        layout="vertical"
        onFinish={handleFinish}
        form={form}
        initialValues={discount}
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
        <Form.Item>
          <Switch checked={active} onChange={handleSwitchChange} />;
        </Form.Item>
        <Button htmlType="submit" type="primary">Tạo mới</Button>
      </Form>
          
    </>
  )
}
export default EditDiscount;