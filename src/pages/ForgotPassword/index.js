import { Card, Col, Form, notification, Row,Input, Button } from "antd";
import { forgotPassword } from "../../service/userService";

function ForgotPassword(){
  const [api,contextHolder] = notification.useNotification();
  const [form]=Form.useForm();
  const openNotification = (placement,message,color) => {
    api.info({
      message: `Thông báo`,
      description: <span style={{color:color,fontSize:"20px",fontWeight:600}}>{message}</span>,
      placement,
    });
  };
  const rules=[{
    required: true,
    message: 'Vui lòng điền đầy đủ!',
  }];
  const handleSubmit=async(e)=>{
    try{
      const result =await forgotPassword(`user/forgot-password?email=${e.email}`);
      console.log(result);
      if(result.status==200){
        openNotification("topRight","Đã gửi email vui lòng kiểm tra!","green");
        form.resetFields();
      }
      else{
        openNotification("topRight","Email không hợp lệ!","red");
      }
    }catch(error){
      console.error(error);
    }

  }
  return(
    <>
      {contextHolder}
      <Row justify="center" style={{marginTop:"20px"}}>
        <Col span={16}>
          <Card title="Quên mật khẩu"  bordered={false} style={{width:"100%"}}>
            <Form onFinish={handleSubmit} form={form}>
              <Row>
              <Col span={24}>
                  <Form.Item label="Email" name="email" rules={[
                      {
                        type:"email",
                        message:"Vui lòng nhập đúng email!",
                      },
                      {
                        required:true,
                        message:"Vui lòng nhập email!"
                      }
                    ]} >
                    <Input/>
                  </Form.Item>
                </Col>
                <Col span={24} style={{justifyItems:"center"}} >
                  <Form.Item >
                    <Button type="primary" htmlType="submit">
                      Gửi mã xác nhận
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  )
}
export default ForgotPassword;