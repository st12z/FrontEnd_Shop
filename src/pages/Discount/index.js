import { useEffect, useState } from "react";
import { getAllDiscounts, saveDiscount } from "../../service/discountService";
import { Button, Col, notification, Row, Tag } from "antd";
import { get, getJWT } from "../../utils/request";
import "./discount.scss";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { API_DOMAIN } from "../../utils/request";
function Discount(){
  const [discounts,setDiscount]=useState();
  const [totalItems,setTotalItems]=useState();
  const [pageNo,setPageNo]=useState(1);
  const [pageSize,setPageSize] = useState();
  const [api,contextHolder] = notification.useNotification();
  const [reload,setReload] = useState(false);
  const [stompClient,setStompClient]=useState();
  const [user,setUser]=useState();
  const openNotification = (placement,message,color) => {
    api.info({
      message: `Thông báo`,
      description: <span style={{color:color,fontSize:"20px",fontWeight:600}}>{message}</span>,
      placement,
    });
  };
  // set up real-time notification
  useEffect(()=>{
    const fetchApi=async()=>{
      try{
        const resultUser = await getJWT("user/detail");
        if(resultUser.status==200){
          setUser(resultUser.data);
        }
           // kết nối đến server
        const socket = new SockJS(`${API_DOMAIN}/chat`);
        const client = Stomp.over(socket);
        // Nhận tin nhắn phản hồi từ /topic/save-discount
        client.connect({},()=>{
          console.log("Connected to stomp");
          client.subscribe(`/topic/save-discount/${resultUser.data.email}`,returnMessage=>{
            const message =JSON.parse(returnMessage.body);
            if(message.code==200){
              openNotification("topRight",message.content,"green");
            }
            else{
              openNotification("topRight",message.content,"red");
            }
          });
        })
        setStompClient(client);
        return () => {
          if (client) {
            console.log("disconnected");
            client.disconnect();
          }
        };
          }catch(error){
            console.error(error);
          }
    }
    fetchApi();
 },[]);
 // end set up
  useEffect(()=>{
    const fetchApi=async()=>{
      try{
        const result =await get(`discounts?pageNo=${pageNo}`);
        const resultUser = await getJWT("user/detail");
        if(result.status==200){
          setDiscount(result.data.dataRes);
          setTotalItems(result.data.total);
          setPageSize(result.data.pageSize);
          setPageNo(result.data.pageNo);
        }
        
      }catch(error){
        console.error(error);
      }
    }
    fetchApi();
  },[pageNo,reload]);
  const handleSaveDiscount=async(id)=>{
    try{
      const result = await saveDiscount(`discounts/save?email=${user.email}&discountId=${id}`);
      console.log(result);
    }catch(error){
      console.error(error);
    }
  }
   
    
  return(
    <>
      {contextHolder}
      <div className="discounts">
      <Row gutter={[50,20]} style={{marginTop:"40"}}>
        {discounts &&discounts.length>0 && discounts.map(item=>(
          <Col span={8}>
            <div className="discounts__item">
              <div className="discounts__image">
                <img src={item.image} />
              </div>
              <div className="discounts__content">
                <p><strong>{item.name}</strong></p>
                <Tag color="red">{item.value} %</Tag>
                <p>{item.description}</p>
              </div>
              <div className="discounts__save">
                <Button onClick={()=>handleSaveDiscount(item.id)} variant="solid" color="red">Lưu</Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      </div>
    </>
  )
}
export default Discount;