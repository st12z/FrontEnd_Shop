import { Badge, Button, Col, notification, Rate, Row } from "antd";
import { useEffect, useState } from "react";
import { getProductBySlug } from "../../service/productService";
import { useParams } from "react-router-dom";
import "./ProductDetail.scss";
import {ShoppingCartOutlined} from "@ant-design/icons"
import { useDispatch } from "react-redux";
import { addToCart, updateQuantity } from "../../action/cart";
import FormReview from "../../components/FormReview";
import { getJWT } from "../../utils/request";
import ReviewItem from "../../components/ReviewItem";
function ProductDetail(){
  const [product,setProduct]= useState();
  const params=useParams();
  const dispatch=useDispatch();
  const [api,contextHolder]=notification.useNotification();
  const [reload,setReload] = useState(Date.now());
  const [user,setUser]=useState();
  const [review,setReview]=useState([]);
  const openNotification = (placement) => {
    api.info({
      message: `Thông báo`,
      description: <span style={{color:"green",fontSize:"20px",fontWeight:600}}>Đã thêm vào giỏ hàng thành công</span>,
      placement,
    });
  };
  // get product
  useEffect(()=>{
    const fetchApi =async ()=>{
      try{
        const result=await getProductBySlug(params.slugProduct);
      if(result.status==200){
        const product=result.data;
        product["price_new"]=product.price*(1-product.discount/100);
        setProduct(product);
        setReview(product.review);
      }
      else{
        console.log("fail")
      }
      }catch(error){
        console.error(error);
      }
    }
    fetchApi();
  },[reload]);
  //get user
  useEffect(()=>{
    const fetchApi =async ()=>{
      try{
        const result=await getJWT("user/detail");
        console.log(result);
      if(result.status==200){
        setUser(result.data);
      }
      else{
        console.log("fail get user")
      }
      }catch(error){
        console.error(error);
      }
    }
    fetchApi();
  },[]);
  const handleOnReload=()=>{
  
    setReload(Date.now());
  }
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
  console.log(product);
  return(
    <>  
        {contextHolder}
        <div className="product__detail">
          {product && (
            <>
            <Row >
              <Col span={12}>
                <h2>{product.name}</h2>
                  <div className="product__detail--image">
                      <img src={product.image}/>
                  </div>
              </Col>
              <Col span={12}>
                <div className="product__detail--content">
                  <h2>Thông tin sản phẩm</h2>
                  <p >
                    <strong>Giá thành: </strong>
                    <span className="price__new">{new Intl.NumberFormat('vi-VN').format(product.price_new)}đ</span>
                    <span className="price__old">{new Intl.NumberFormat('vi-VN').format(product.price)}đ</span>
                  </p>
                  <p><strong>Giảm giá :</strong> <span style={{color:"red"}}>{product.discount} %</span></p>
                    <Button color="danger" variant="solid">
                      Mua ngay
                    </Button>
                    <Button color="cyan" variant="solid" onClick={()=>handleAddCart(product.id)}>
                      <ShoppingCartOutlined style={{width:"40x"}} />
                      Thêm vào giỏ hàng
                    </Button>
                    
                </div>
                <div className="">
                  <h2>Đánh giá</h2>
                  <Rate value={product.rate} disabled/>
                </div>
              </Col>
            </Row>
            </>
          
          )}
        </div>
        {product && (
          <>
            <div className="form__review">
              <FormReview slug={product.slug} onReload={handleOnReload}/>
            </div>
            <div className="review__list">
              <h2>Các đánh giá</h2>
              {review.length>0 && review.map((item,index)=>(
                  <ReviewItem item={item} user={user} slug={product.slug} onReload={handleOnReload} key={index} />
              ))}
            </div>
          </>
        )}
      
      
    </>
  )
}
export default ProductDetail;