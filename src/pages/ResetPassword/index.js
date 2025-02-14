import { Button, Card, Col, Form, Input, notification, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import { resetPassword } from "../../service/userService";
import { useNavigate, useSearchParams } from "react-router-dom";

function ResetPassword(){
  const [form]=Form.useForm();
  const [api,contextHolder] = notification.useNotification();
  const navigate=useNavigate();
  const [params]=useSearchParams();
  const email=params.get("email");
  const otp=params.get("otp");

  console.log(email);
  console.log(otp);
  const openNotification = (placement,message,color) => {
    api.info({
      message: `Thông báo`,
      description: <span style={{color:color,fontSize:"20px",fontWeight:600}}>{message}</span>,
      placement,
    });
  };
  const handleSubmit=async(e)=>{
    const data={
      new_password:e.new_password
    }
    try{
      const result = await resetPassword(`user/reset-password?email=${email}&otp=${otp}`,data);
      form.resetFields();
      console.log(result);
      if(result.status==200){
        navigate("/login");
        openNotification("topRight","Cập nhật thành công!","green");
      }
      else{
        openNotification("topRight","Cập nhật thất bại!","red");
      }
    }catch(error){
      openNotification("topRight","Cập nhật thất bại!","red");
      console.error(error);
    }
  } 
  return(
    <>
      <Row justify="center" style={{marginTop:"20px"}}>
        <Col span={16}>
          <Card title="Nhập mật khẩu mới"  bordered={false} style={{width:"100%"}}>
            <Form onFinish={handleSubmit} form={form}>
              <Row>
                <Col span={24}>
                  <Form.Item label="Mật khẩu mới" name="new_password" rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    }]} hasFeedback>
                    <Input.Password/>
                  </Form.Item>
                </Col>
                <Col span={24}>
                <Form.Item
                  name="confirm_password"
                  label="Confirm Password"
                  dependencies={['new_password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('new_password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The new password that you entered do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                </Col>
                <Col span={24} style={{justifyItems:"center"}} >
                  <Form.Item >
                    <Button type="primary" htmlType="submit">
                      Xác nhận
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
export default ResetPassword;