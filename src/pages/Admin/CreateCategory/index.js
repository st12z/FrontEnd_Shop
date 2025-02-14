import { Button, Form, Input, notification } from "antd";
import { postJWT } from "../../../utils/request";

function CreateCategory(){
  const [api,contextHolder] = notification.useNotification();
  const [form] =Form.useForm();
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
  const handleFinish=async(e)=>{
    try{
      const data=e;
      const result = await postJWT(`admin/categories/create-category`,data);
      if(result.status==200){
        form.resetFields();
        openNotification("topRight","Tạo mới danh mục thành công!","green");
      }
      else{
        openNotification("topRight","Tạo mới danh mục thất bại!","green");
      }
    }catch(error){
      console.error(error);
      openNotification("topRight","Tạo mới danh mục thất bại!","red");
    }
  }
  return(
    <>
      <Form
        layout="vertical"
        onFinish={handleFinish}
        form={form}
      >
        <Form.Item label="Tên danh mục" name="name">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">Tạo mới</Button>
        </Form.Item>
      </Form>
    </>
  )
}
export default CreateCategory;