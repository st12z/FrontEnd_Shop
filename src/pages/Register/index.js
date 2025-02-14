import { Button, Card, Col, Form, Input, notification, Row } from "antd";
import { createUser } from "../../service/userService";

function Register(){
  const [form] =Form.useForm();
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
      message:"Vui lòng điền đầy đủ"
    }
  ];
  const handleSubmit=(e)=>{
    console.log(e);
    const user={
      firstName:e.firstName,
      lastName:e.lastName,
      city:e.city,
      district:e.district,
      phone:e.phone,
      email:e.email,
      password:e.password
    }
    console.log(user);
    const fetchApi=async()=>{
      try{
        const result = await createUser("user/register",user);
        console.log(result);
        if(result.status==201){
          openNotification("topRight","Đã đăng kí thành công!","green");
          console.log("create success");
          console.log(result.data);
          form.resetFields();
        }
        else{
          openNotification("topRight","Đăng kí thất bại.Vui lòng kiểm tra lại email đã tồn tại ?!","red");
          console.log("fail");
        }
      }catch(error){
        console.error(error);
      }
    }
    fetchApi();
  }
  return(
    <>
      {contextHolder}
      <Row justify="center" style={{marginTop:"20px"}}>
        <Col span={16}>
          <Card title="Đăng ký"  bordered={false} style={{width:"100%"}}>
            <Form onFinish={handleSubmit}>
              <Row>
                <Col span={12}>
                  <Form.Item label="Họ tên" name="firstName" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Tên" name="lastName" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Thành phố" name="city" rules={rules}>
                    <Input/>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Huyện" name="district" rules={rules}>
                    <Input/>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Số điện thoại" name="phone" rules={rules}>
                    <Input/>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item 
                    label="Email" 
                    name="email" 
                    rules={[
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
                <Col span={24}>
                  <Form.Item label="Password" name="password" rules={rules} hasFeedback>
                    <Input.Password/>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item 
                    label="Confirm Password" 
                    name="confirm_password" 
                    rules={[
                      {
                        required:true,
                        message:"Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                      }),
                    ]} 
                    hasFeedback
                    dependencies={["password"]}
                    >
                      <Input.Password/>
                    </Form.Item>
                </Col>
                <Col span={24} style={{justifyItems:"center"}} >
                  <Form.Item >
                    <Button type="primary" htmlType="submit">
                      Đăng kí
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
export default Register;