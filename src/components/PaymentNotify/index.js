import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { updateOrder } from "../../service/orderService";
import { Button, Card, Col, Row } from "antd";
import {CloseOutlined ,CheckOutlined} from "@ant-design/icons";
function PaymentNotify(){
  const [seachParams] = useSearchParams();
  const status=seachParams.get("status");
  const active=status =="success" ? true :false;
  const orderCode=seachParams.get("orderCode");
  useEffect(()=>{
    const fetchApi=async ()=>{
      const result = await updateOrder(`order/update-status?orderCode=${orderCode}`);
      console.log(result);
    }
    if(status=="success"){
      localStorage.removeItem("cart");
      fetchApi();
    }
  },[status])
  return(
    <>
      <Row justify="center" style={{marginTop:"30px"}}>
        <Col span={18}>
          <Card title="Thông báo thanh toán">
              <h2 style={{textAlign:"center"}}>
                {active ? "Thanh toán thành công" : "Thanh toán thất bại"}
              </h2>
              <p style={{textAlign:"center"}}>
                <div style={{display:"inline-block",backgroundColor:active ? "green" : "red",padding:"20px",borderRadius:"50%",textAlign:"center"}}>
                  {active==false ? (
                    <>
                    <CloseOutlined  style={{fontSize:"20px",fontWeight:"800",color:"white"}}/>
                    
                    </>
                  ):(
                    <>
                      <CheckOutlined   style={{fontSize:"20px",fontWeight:"800",color:"white"}}/>
                    </>
                  )}
                </div>
              </p>
              <p style={{textAlign:"center"}}>
                {active ?(
                  <>
                  <Button href="/" style={{marginRight:"20px"}}>Quay lại trang chủ</Button>
                  <Button href={"/order/order-detail/"+orderCode}>Xem chi tiết đơn hàng</Button>
                  </>
                ):(
                  <Button href="/">Quay lại trang chủ</Button>
                )}
              </p>
              
              
          </Card>
        </Col>
      </Row>
    </>
  )
}
export default PaymentNotify;