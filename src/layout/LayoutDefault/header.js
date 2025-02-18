import {Button, Form, Input} from "antd";
import logo from "../../images/channels4_profile.jpg";
import {SearchOutlined,
  ShoppingCartOutlined,
  LoginOutlined,
  FormOutlined,
  LogoutOutlined,
  ContainerOutlined,
  WechatOutlined,
  SketchOutlined
} from "@ant-design/icons";
import {Link, NavLink, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllProductsBySearch } from "../../service/productService";
import { debounce } from "lodash";  
import { getCategoryById } from "../../service/categoryService";
import { login } from "../../action/login";
import { checkTokenExpiration, getRoles } from "../../utils/checkTokenExpiration";
import { getJWT, post } from "../../utils/request";
import DropDownUser from "../../components/DropDownUser";
function Header(){
  const isLogin=useSelector(state=>state.loginReducer);
  const dispatch=useDispatch();
  const url = new URL(window.location.href);
  const [products,setProduct] =useState([]);
  const [search,setSearch]=useState(url.searchParams.get("search"));
  const [user,setUser]=useState();
  const [roles,setRoles]=useState([]);
  const navigate=useNavigate();
  
  // api goi refresh-token
    useEffect(()=>{
      const refresh_token = localStorage.getItem("refresh_token");
      const access_token = localStorage.getItem("access_token"); 
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
  useEffect(()=>{
    const access_token=localStorage.getItem("access_token");
    if(checkTokenExpiration(access_token)){
      dispatch(login("LOGIN"));
    }
    else{
      dispatch(login("LOGOUT"));
    }
  },[dispatch]);
  
  const handleSubmit=(e)=>{
    const keyword=e.search;
    window.location.href=`?search=${keyword}`
    
  }
  const handleChange=debounce((e)=>{
    const keyword=e.target.value;
    setSearch(keyword);
  },1000)
  useEffect(()=>{
      const fetchApi=async()=>{
        try{
          const result=await getAllProductsBySearch(search);
          if(result.status==200){
            const products=result.data;
          if(products.length>0){
            Promise.all(
              products.map(async (product) => {
                const category = await getCategoryById(product.categoryId)
                product["price_new"]=product.price*(1-product.discount/100);
                product["category_slug"]=category.data.slug;
                return product;
              })
            ).then((newProducts)=>{
              console.log(newProducts);
              setProduct(newProducts);

            })
            
          }
          }
          else{
            console.log("fail");
          }
        }catch(error){
          console.error(error);
        }
      }
       if(search) fetchApi();
    },[search])
  
  
  useEffect(()=>{
    const fetchApi= async ()=>{
      try{
        const result = await getJWT("user/detail");
        console.log(result);
      if(result.status==200){
        setUser(result.data);
        setRoles(getRoles(localStorage.getItem("access_token")));
      }

      }catch(error){
        console.error(error);
      }
    }
    fetchApi();
  },[isLogin]);

  let cartState=useSelector(state=>state.cartReducer);
  if(cartState.length==0){
    cartState=JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")):[];
  }
  let totalQuantity=0;
  if(cartState.length>0){
    totalQuantity=cartState.reduce((sum,item)=>sum+item.quantity,0)
  }
  console.log(roles);
  return(
    <>
      <header className="header">
        <div className="header__logo">
          <a href="/">
            <img src={logo} width={"60px"}/>
          </a>
        </div>
        <div className="header__search">
            <div className="header__search__input">
              <Form onFinish={handleSubmit}  initialValues={{search:search}}>
                <Form.Item name="search" >
                  <Input style={{width:"500px"}} placeholder="Bạn đang cần tìm kiếm gì..."  onChange={handleChange}/>
                </Form.Item>
                <Button className="icon-search" htmlType="submit" type="text" icon={<SearchOutlined />} />
              </Form>
            </div>
            {search !="" && (
              <div className="header__search__item">
              <ul>
                {products.length >0 && (
                  products.map((item,index)=>(
                    <a href={"/"+item.category_slug+"/"+item.slug}>
                      <li key={index} >
                        <div className="item__image">
                          <img src={item.image} style={{width:"60px",objectFit:"cover"}}/>
                        </div>
                        <div className="item__content">
                          <p style={{fontWeight:"600"}}>{item.name}</p>
                          <p style={{color:"red",fontWeight:"600"}}>{new Intl.NumberFormat('vi-VN').format(item.price_new)}đ</p>
                        </div>
                      </li>
                    </a>
                  ))
                )}
              </ul>
            </div>
            )}
          </div>
        <div className="header__menu">
            <ul>
              <li>
                  <a href="/order">
                      <ContainerOutlined  style={{marginRight:"10px",fontSize:"20px"}}/>
                      <span>Đơn hàng</span>
                  </a>
              </li>
              <li>
                <a href="/cart">
                  <ShoppingCartOutlined style={{marginRight:"10px",fontSize:"20px"}}/>
                  <span>Giỏ hàng ({totalQuantity})</span>
                </a>
              </li>
              {isLogin ? (
                
                <>
                  <li>
                    <a href="/discounts">
                      <SketchOutlined  style={{marginRight:"10px",fontSize:"20px"}}/>
                      <span>Vourcher giảm giá</span>
                    </a>
                  </li>
                  {roles && roles.length>0&& roles.includes("USER") && (
                    <li>
                    <a href="/chats" >
                    <WechatOutlined  style={{marginRight:"10px",fontSize:"20px"}}/>
                      <span>Nhắn tin</span>
                    </a>
                  </li>
                  )}
                  <li>
                    <DropDownUser user={user}/>
                  </li>
                  
                </>
                  
                )
              :(
                <>
                  <li>
                    <a href="/login" >
                    <LoginOutlined style={{marginRight:"10px",fontSize:"20px"}}/>
                      <span>Đăng nhập</span>
                    </a>
                  </li>
                  <li>
                    <a href="/register">
                      <FormOutlined style={{marginRight:"10px",fontSize:"20px"}}/>
                      <span>Đăng kí</span>
                    </a>
                  </li>
                </>
              )}
              
              
            </ul>
        </div>
      </header>
    </>
  )
}
export default Header;