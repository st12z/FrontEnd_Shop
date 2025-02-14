import { Link } from "react-router-dom";
import "./AdminChats.scss";
import { useEffect, useState } from "react";
import { getRoomChats } from "../../../service/roomChatService";
import { getJWT } from "../../../utils/request";
import {Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { API_DOMAIN } from "../../../utils/request";
import { notification } from "antd";
// Tất cả phòng chats
function AdminChats(){
  const [roomChats,setRoomChats]=useState();
  const [user,setUser]=useState();
  const [reload,setReload]=useState(false);
  const [api,contextHolder] = notification.useNotification();
  const openNotification = (placement,message,color) => {
    api.info({
      message: `Thông báo`,
      description: <span style={{color:color,fontSize:"20px",fontWeight:600}}>{message}</span>,
      placement,
    });
  };
  useEffect(()=>{
    const fetchApi=async()=>{
      try{
        const result = await getRoomChats(`admin/rooms`);
        const resultUser = await getJWT(`admin/detail`);
        console.log(result);
        if(result.status==200){
          const newRoomChats=result.data.map(item=>{
            return{
              roomId:item.roomId,
              clientAvatar:item.clientAvatar,
              clientName:item.clientName,
              content:item.message.content ? item.message.content : "",
              sender:item.message.email,
              time:item.message.timestamp
            }
          })
          setRoomChats(newRoomChats);

        }
        if(resultUser.status==200){
          setUser(resultUser.data);
        }
      }catch(error){
        console.error(error);
      }
    }
    fetchApi();
  },[reload]);
  useEffect(()=>{
          // kết nối đến server
        const socket = new SockJS(`${API_DOMAIN}/chat`);
        const client = Stomp.over(socket);
        // Nhận tin nhắn phản hồi từ /topic/rooms/{roomId}
        client.connect({},()=>{
          console.log("Connected to stomp");
          client.subscribe(`/topic/notification`,returnMessage=>{
            const message =JSON.parse(returnMessage.body);
            if(message.code==200){
              openNotification("topRight","Tin nhắn mới!","green");
              setReload(Date.now());
            }
          })
        })
        return () => {
          if (client) {
            console.log("disconnected");
            client.disconnect();
          }
        };
    },[]);
  return(
    <>
      {contextHolder}
      <div className="list__chat">
      {roomChats && roomChats.map((item,index)=>(
        <Link to={"/admin/chats/"+item.roomId}>
          <div className="list__chat__item">
            <div className="list__chat__avatar">
              <img src={item.clientAvatar}/>
              
            </div>
            <div className="list__chat__content">
              <p className="list__chat__name">
                {item.clientName}
              </p>
              <p className="list__chat__message">
                {item.sender!==user.email ? `${item.clientName}: ${item.content}` : `Bạn: ${item.content}`}

              </p>
            </div>
            <div className="list__chat__time">
              {item.time}
            </div>
          </div>
        </Link>
      ))}
        
      </div>
    </>
  )
}
export default AdminChats;