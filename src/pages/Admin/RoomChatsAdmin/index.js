import { Button, Col, Form, Input, Row } from "antd";
import "../../Chat/chat.scss";
import {SendOutlined} from "@ant-design/icons";
import {Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useEffect, useState } from "react";
import { get, getJWT } from "../../../utils/request";
import { useParams } from "react-router-dom";
import { API_DOMAIN } from "../../../utils/request";
// Thông tin từng phòng chat
function RoomChatsAdmin(){

  const [messages,setMessages] = useState([]);
  const [stompClient,setStompClient]=useState(null);
  const [user,setUser]=useState();
  const [form]=Form.useForm();
  const params = useParams();
  const roomId=params.roomId;
  useEffect(()=>{
    const fetchApi= async ()=>{
      try{
        const result = await getJWT("user/detail");
      if(result.status==200){
        setUser(result.data);
        if(result.data.roomChats.length!=0){
          const resultMessages=await get(`rooms/${roomId}/messages`);
          console.log(resultMessages);
          setMessages(resultMessages.data);
        }
      }

      }catch(error){
        console.error(error);
      }
    }
    fetchApi();

   
  },[]);
  useEffect(()=>{
     if(roomId){
        // kết nối đến server
      const socket = new SockJS(`${API_DOMAIN}/chat`);
      const client = Stomp.over(socket);
      // Nhận tin nhắn phản hồi từ /topic/rooms/{roomId}
      client.connect({},()=>{
        console.log("Connected to stomp");
        client.subscribe(`/topic/rooms/${roomId}`,returnMessage=>{
          const message =JSON.parse(returnMessage.body);
          setMessages(prev=>[...prev,{email:message.email,
            name:message.name,
            content:message.content,
            avatar:message.avatar
          
          }]);
        });
  
      })
      setStompClient(client);
      return () => {
        if (client) {
          console.log("disconnected");
          client.disconnect();
        }
      };
     }
  },[roomId]);
  
  const handleSendMessage=(e)=>{
    const content=e.content;
    if(stompClient && stompClient.connected  && content!=''){
        const message={
          email:user.email,
          roomId:roomId,
          content:content
        };
        stompClient.send(`/app/sendMessage/${roomId}`,{},JSON.stringify(message));
        form.resetFields();
    }
    else{
      console.error("STOMP client not ready send");
    }

  }
  return(
    <>

      <Row justify="center" style={{margin:"50px"}}>
        {user && (
          <Col span={12} className="chat__container">
          <div className="chat">
            <div className="chat__title">
              <p>Nhắn tin với admin</p>
            </div>
            {messages && messages.map((item,index)=>(
              <div className={"chat__item " + (item.email==user.email ? "chat__item__right" : "chat__item__left")}>
                <div className="chat__avatar">
                  <img src={item.avatar}  />
                  <p className="chat__name">{item.name}</p>
                </div>
                <div className="chat__content">
                  <p>{item.content}</p>
                </div>
              </div>
            ))}
            
          </div>
          <Form onFinish={handleSendMessage} className="message" form={form}>
              <Form.Item className="message__input" name="content">
                <Input/>
              </Form.Item>
              <Form.Item className="message__button">
                <Button icon={<SendOutlined />} htmlType="submit" />
              </Form.Item>
            </Form>
        </Col>
        )}
      </Row>
    </>
  )
}
export default RoomChatsAdmin;