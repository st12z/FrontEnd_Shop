import { Button, Card, Col, Form, Input, notification, Row } from "antd";
import { loginUser } from "../../service/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../action/login";
import { getRoles } from "../../utils/checkTokenExpiration";

function Login(){
  const navigate=useNavigate();
  const [api,contextHolder] = notification.useNotification();
  const dispatch=useDispatch();
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
    const user={
      email:e.email,
      password:e.password
    }
    const fetchApi=async()=>{
      const result = await loginUser("user/login",user);
      if(result.status==200){
        const access_token=result.data.access_token;
        const refresh_token=result.data.refresh_token;
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        const roles=getRoles(access_token);
        openNotification("topRight","Đăng nhập thành công!","green");
        dispatch(login("LOGIN"));
        console.log(roles);
        if(roles.includes("ADMIN") || roles.includes("MANAGER") || roles.includes("STAFF")){
          navigate("/admin");
        }
        else{
          navigate("/");
        }
      }
      else{
        openNotification("topRight","Đăng nhập thất bại!","red");
      }
    }
    fetchApi();
  }
  return(
    <>
      {contextHolder}
      <Row justify="center" style={{marginTop:"20px"}}>
        <Col span={16}>
          <Card title="Đăng nhập"  bordered={false} style={{width:"100%"}}>
            <Form onFinish={handleSubmit}>
              <Row>
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
                <a href="/forgot-password">Quên mật khẩu</a>
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
export default Login;