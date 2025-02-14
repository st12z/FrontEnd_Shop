import { Button, Card, Col, Form, Input, notification, Row } from "antd";
import { useEffect } from "react";
import { order } from "../../service/orderService";
import { getReturlUrl, getReturnlUrl, getUrlPayment } from "../../service/payment";

function FormPayment(props){
  const {items,totalPrice}=props;
  const [api,contextHolder]=notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      message: `Thông báo`,
      description: <span style={{color:"red",fontSize:"20px",fontWeight:600}}>Cần đăng nhập để thanh toán</span>,
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

    const user={
      firstName:e.firstName,
      lastName:e.lastName,
      city:e.city,
      district:e.district,
      phone:e.phone
    }
    const data={
      user:user,
      items:items
    }
    console.log(data);
    try{
      const result = await order("order",data);
      const orderId=result.data;
      if(result.status==401){
        openNotification("topRight");
      }
      if(result.status==200){
        const dataPayment=await getUrlPayment(`payment/processing?orderId=${orderId}`,totalPrice,"NCB");
        if(dataPayment.status==200){
          const urlPayment=dataPayment.data;
          console.log(urlPayment);
          if(urlPayment) window.open(urlPayment,"_blank");
        }
        
      }
    }catch(error){
      console.error(error);
    }
  }
  return(
    <>
      {contextHolder}
      <Row justify="center">
        <Col span={16}>
          <Card title="Thông tin thanh toán">
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
                <Col span={24} style={{justifyItems:"center"}} >
                  <Form.Item >
                    <Button type="primary" htmlType="submit">
                      Thanh toán
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
export default FormPayment;