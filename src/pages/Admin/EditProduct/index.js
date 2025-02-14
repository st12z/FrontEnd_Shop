import { Button, Form, Input, InputNumber, notification, Select, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { getAllBrands } from "../../../service/brandService";
import { getAllCategories } from "../../../service/categoryService";
import {UploadOutlined} from "@ant-design/icons"
import { createProduct, editProduct, getProductBySlug } from "../../../service/productService";
import { useParams } from "react-router-dom";
import { set } from "lodash";
function EditProduct(){
  const [brands,setBrand]=useState();
  const [category,setCategory]=useState();
  const [form] = Form.useForm();
  const [api,contextHolder] = notification.useNotification();
  const [fileList,setFileList] = useState([]);
  const [data,setData]= useState();
  const params = useParams();
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
        }
        const resultProduct= await getProductBySlug(params.slug);
        if(resultProduct.status==200){
          setData(resultProduct.data);
          setFileList([
            {
              uid:'-1',
              name:'product-image.png',
              status:'done',
              url:resultProduct.data.image
            }
          ])
          form.setFieldsValue(resultProduct.data);
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
    if(fileList.length>0 && fileList[0].originFileObj){
      file = fileList[0].originFileObj;
    }
    const data={
      ...e,
      slug:params.slug
    }
    console.log(data);
    const formData= new FormData();
    if(file) formData.append("imageFile",file);
    formData.append("productRequestDTO",new Blob([JSON.stringify(data)],{type:"application/json"}));
    try{
      const result = await editProduct(`admin/products/edit-product`,formData);
      if(result.status==200){
        openNotification("topRight","Cập nhật sản phẩm thành công!","green");
      }
      else{
        openNotification("topRight","Cập nhật thất bại sản phẩm thất bại!","red");
      }
    }catch(error){
      console.error(error);
      openNotification("topRight","Cập nhật sản phẩm thất bại!","red");
    }
  }

  //upload image
const handleChangeImage=(e)=>{
  setFileList(e.fileList);
}
  console.log(data);
  return(
    <>
      {contextHolder}
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

        <Button htmlType="submit" type="primary">Cập nhật</Button>
      </Form>
          
    </>
  )
}
export default EditProduct;