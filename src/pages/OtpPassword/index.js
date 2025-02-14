import { Card, Col, Form, notification, Row,Input, Button } from "antd";
import { forgotPassword, otpPassword } from "../../service/userService";
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';

import Title from "antd/es/skeleton/Title";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function OtpPassword(){
  const [api,contextHolder] = notification.useNotification();
  const [reload,setReload]=useState(false);
  const [params] = useSearchParams();
  const email=params.get("email");
  const openNotification = (placement,message,color) => {
    api.info({
      message: `Thông báo`,
      description: <span style={{color:color,fontSize:"20px",fontWeight:600}}>{message}</span>,
      placement,
    });
  };
  const navigate=useNavigate();
  const rules=[{
    required: true,
    message: 'Vui lòng điền đầy đủ!',
  }];
  const handleChange=async(e)=>{
    const otp = e;
    if(otp.length==6){
      console.log(otp);
      setReload(true);
      try{
        const result =await otpPassword(`user/otp-password?email=${email}&otp=${otp}`);
        console.log(result);
        if(result.status==200){
          navigate(`/reset-password?email=${email}&otp=${otp}`);
        }
        else{
          setReload(false);
          openNotification("topRight","Token không hợp lệ!","red");
          
        }
      }catch(error){
        console.error(error);
      }finally{
        setReload(false);
      }
    }
  }
  const handleInput=(e)=>{
    
  }
  return(
    <>
      {contextHolder}
      <Row justify="center" style={{marginTop:"20px"}}>
        <Col span={16} >
          <Card title="Nhập mã OTP"  bordered={false} style={{width:"100%"}}>
            <div className="" style={{textAlign:"center"}}>
            <Title level={5}>With custom display character</Title>
            <Input.OTP  onChange={handleChange} onInput={handleInput} />
            </div>
            {reload && (
              <>
              <Spin fullscreen={reload}  indicator={<LoadingOutlined spin />}  size="large"/>
              </>
            )}

          </Card>
        </Col>
      </Row>
    </>
  )
}
export default OtpPassword;