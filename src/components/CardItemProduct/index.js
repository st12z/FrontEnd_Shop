import { Badge, Button, Card, notification, Rate } from "antd";
import {ShoppingCartOutlined} from "@ant-design/icons";
import "./CardItemProduct.scss"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, updateQuantity } from "../../action/cart";
import { useEffect, useState } from "react";
import { getCategoryById } from "../../service/categoryService";
function ProductItem(props){
  const {item} = props;
  const dispatch=useDispatch();
  const [api,contextHolder]=notification.useNotification();
  const [slug,setSlug]=useState();
  useEffect(()=>{
    const fetchApi=async()=>{
      const category=await getCategoryById(item.categoryId);
      if(category.status==200){
        setSlug(category.data.slug);
      }
    }
    fetchApi();
  },[])
  const openNotification = (placement) => {
    api.info({
      message: `Thông báo`,
      description: <span style={{color:"green",fontSize:"20px",fontWeight:600}}>Đã thêm vào giỏ hàng thành công</span>,
      placement,
    });
  };
  const handleAddCart=(id)=>{
    openNotification("topRight");
    const cart=JSON.parse(localStorage.getItem("cart"));
    if(cart==undefined || cart.length==0){
      dispatch(addToCart(id));
      return;
    }
    const existItem=cart.find(item=>item.id==id);
    if(existItem){
      dispatch(updateQuantity(id,existItem.quantity));
    }
    else{
      dispatch(addToCart(id));
    }
    
  }
  return(
    <>
      {contextHolder}
      <div className="product__item">
        <Badge.Ribbon text={`Giảm ${item.discount}%`} color="red">
          <Card style={{height:"450px"}}>
            <a href={`/${slug}/${item.slug}`}>
              <div className="product__image">
                <img src={item.image}/>
              </div>
            </a>
            <div className="product__content">
              <h3>{item.name}</h3>
              <p >
                <span className="price__new">{new Intl.NumberFormat('vi-VN').format(item.price_new)}đ</span>
                <span className="price__old">{new Intl.NumberFormat('vi-VN').format(item.price)}đ</span>
              </p>
              <p style={{padding:"0",margin:"0",fontSize:"16px"}}>
                Đã bán: {item.sold} chiếc
              </p>
            </div>
            <div className="product__footer">
              <Rate disabled defaultValue={item.rate} />
              <Button type="primary" icon={<ShoppingCartOutlined />} size="large" style={{marginLeft:"10px"}} onClick={()=>handleAddCart(item.id)}>Thêm</Button>
            </div>
          </Card>
        </Badge.Ribbon>
      </div>
    </>
  )
}
export default ProductItem;