import { Button, Card, Col, notification, Row ,Input,Form} from "antd";
import { changePassword } from "../../service/userService";

function UserChangePassword(){
  const [api,contextHolder] = notification.useNotification();
  const openNotification = (placement,message,color) => {
    api.info({
      message: `Thông báo`,
      description: <span style={{color:color,fontSize:"20px",fontWeight:600}}>{message}</span>,
      placement,
    });
  };
  const rules=[
    {
      required:true,
      message:"Vui lòng điền đầy đủ!"
    }
  ];
  const handleSubmit=async(e)=>{
    const data={
      old_password:e.old_password,
      new_password:e.new_password
    }
    try{
      const result = await changePassword("user/change-password",data);
      if(result.status==200){
        openNotification("topRight","Thay đổi mật khẩu thành công!","green");
      }
      else{
        openNotification("topRight","Thay đổi mật khẩu thất bại!","red");
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
          <Card title="Thay đổi mật khẩu"  bordered={false} style={{width:"100%"}}>
            <Form onFinish={handleSubmit}>
              <Row>
              <Col span={24}>
                  <Form.Item label="Mật khẩu cũ" name="old_password" rules={rules} hasFeedback>
                    <Input.Password/>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Mật khẩu mới" name="new_password" rules={rules} hasFeedback>
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
                      Đăng nhập
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
export default UserChangePassword;