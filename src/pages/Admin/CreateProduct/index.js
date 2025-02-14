import { Button, Form, Input, InputNumber, notification, Select, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { getAllBrands } from "../../../service/brandService";
import { getAllCategories } from "../../../service/categoryService";
import {UploadOutlined} from "@ant-design/icons"
import { createProduct } from "../../../service/productService";
function CreateProduct(){
  const [brands,setBrand]=useState();
  const [category,setCategory]=useState();
  const [form] = Form.useForm();
  const [api,contextHolder] = notification.useNotification();
  const [fileList,setFileList] = useState([]);
  const openNotification = (placement,message,color) => {
    api.info({
      message: `Thông báo`,
      description: <span style={{color:color,fontSize:"20px",fontWeight:600}}>{message}</span>,
      placement,
    });
  };
  useEffect(()=>{
    const fetchApi=async()=>{
      try{
        const resultBrand = await getAllBrands();
        if(resultBrand.status==200){
          const brandArray=resultBrand.data.map(item=>{
            return {
              label: item.name,
              value: item.id
            }
          });
          setBrand(brandArray);
          form.setFieldsValue({brandId:brandArray[0].value});
        }
        const resultCategory= await getAllCategories();
        if(resultCategory.status==200){
          const categoryArray=resultCategory.data.map(item=>{
            return {
              label: item.name,
              value: item.id
            }
          });
          setCategory(categoryArray);
          form.setFieldsValue({categoryId:categoryArray[0].value});
        }
      }catch(error){
        console.error(error);
      }
    }
    fetchApi();
  },[]);
  const rules=[
    {
      required: true,
      message: 'Vui lòng điền đầy đủ!',
    },
  ];
  const handleFinish=async(e)=>{
    let file="";
    if(fileList.length>0){
      file = fileList[0].originFileObj;
    }
    const data={
      ...e,
      status:1,
      rate:0
    }
    const formData= new FormData();
    formData.append("imageFile",file);
    formData.append("productRequestDTO",new Blob([JSON.stringify(data)],{type:"application/json"}));
    try{
      const result = await createProduct(`admin/products/create-product`,formData);
      if(result.status==200){
        openNotification("topRight","Tạo sản phẩm thành công!","green");
        form.resetFields();
        setFileList([]);
      }
      else{
        openNotification("topRight","Tạo sản phẩm thất bại!","red");
      }
    }catch(error){
      console.error(error);
      openNotification("topRight","Tạo sản phẩm thất bại!","red");
    }
  }

  //upload image
const handleChangeImage=(e)=>{
  setFileList(e.fileList);
}

  return(
    <>
      <Form
        layout="vertical"
        onFinish={handleFinish}
        form={form}
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={rules}
        >
          <Input />
        </Form.Item>  
        <Form.Item
          label="Danh mục"
          name="categoryId"
          rules={rules}
        >
          <Select options={category} 
            
          />
        </Form.Item>
        <Form.Item
          label="Hãng sản phẩm"
          name="brandId"
          rules={rules}
        >
          <Select options={brands}/>
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="description"
          rules={rules}
        >
          <TextArea maxLength={6} />
        </Form.Item> 
        <Form.Item
          label="Giá sản phẩm"
          name="price"
          rules={rules}
        >
          <InputNumber min={0}/>
        </Form.Item>  
        <Form.Item
          label="Giảm giá"
          name="discount"
          rules={rules}
        >
          <InputNumber min={0}/>
        </Form.Item> 
        <Form.Item
          label="Số lượng trong kho"
          name="stock"
          rules={rules}
        >
          <InputNumber min={0}/>
        </Form.Item> 
        <Form.Item
          label="Tần số"
          name="frequency"
          rules={rules}
        >
          <InputNumber min={0}/>
        </Form.Item> 
        <Form.Item
          label="Bộ nhớ"
          name="memory"
          rules={rules}
        >
          <InputNumber min={0}/>
        </Form.Item> 
        <Form.Item
          label="Kích thướng màn hình"
          name="monitorSize"
          rules={rules}
        >
          <InputNumber min={0}/>
        </Form.Item> 
        <Form.Item
          label="Dung lượng pin"
          name="pin"
          rules={rules}
        >
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
export default CreateProduct;