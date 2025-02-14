import { Header } from "antd/es/layout/layout";
import logo from "../../images/logo (1).png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkTokenExpiration } from "../../utils/checkTokenExpiration";
import { getJWT, post } from "../../utils/request";
import { login } from "../../action/login";
import { notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import DropDownUser from "../../components/DropDownUser";
import {MailOutlined} from "@ant-design/icons"

function HeaderAdmin(){
  const [user,setUser]=useState({});
  const isLogin=useSelector(state=>state.loginReducer);
  const refresh_token = localStorage.getItem("refresh_token");
  const access_token = localStorage.getItem("access_token"); 
  const dispatch = useDispatch();
  const [api,contextHolder] = notification.useNotification();
  const naviage=useNavigate();
  const openNotification = (placement,message,color) => {
    api.info({
      message: `Thông báo`,
      description: <span style={{color:color,fontSize:"20px",fontWeight:600}}>{message}</span>,
      placement,
    });
  };
  // api goi refresh-token
      useEffect(()=>{
        if(checkTokenExpiration(refresh_token) && checkTokenExpiration(access_token)==false){
        const data={
          refreshToken:refresh_token
        }
        const fetchApi=async()=>{
            const result = await post("refresh-token",data);
            if(result.status==200){
              console.log("refresh_token success");
              localStorage.setItem("access_token",result.data.access_token);
              localStorage.setItem("refresh_token",result.data.refresh_token);
            }
        }
        fetchApi();
      }
      },[]);
  // quan ly state dang nhap
  useEffect(()=>{
      const access_token=localStorage.getItem("access_token");
      if(checkTokenExpiration(access_token)){
        dispatch(login("LOGIN"));
      }
      else{
        dispatch(login("LOGOUT"));
      }
    },[dispatch]);
  // api goi user
  useEffect(()=>{
      const fetchApi= async ()=>{
        try{
          const result = await getJWT("admin/detail");
        if(result.status==200){
          setUser(result.data);
        }
        else{
          openNotification("topRight","Bạn không có quyền truy cập!","red");
          naviage("/")
        }
        }catch(error){
          console.error(error);
        }
      }
      fetchApi();
    },[isLogin]);  
  return(
    <>
      {contextHolder}
      <header className="header-admin">
          <div className="header-admin__nav">
            <div className="header-admin__logo">
              <img src={logo} style={{width:"120px"}}/>
            </div>
            <div className="header-admin__menu">
              <ul>
                {user && (
                  <>
                    <li className="icon__message">
                      <Link to="/admin/chats" style={{textDecoration:"none"}}>
                          Hộp thư <MailOutlined /> 
                          <div className="icon__notify">.</div>
                      </Link>
                    </li>
                    <li>
                      <div className="header-admin__info">
                        <DropDownUser user={user}/>
                      </div>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
      </header>
    </>
  )
}
export default HeaderAdmin;