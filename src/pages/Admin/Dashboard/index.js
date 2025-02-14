import { useEffect, useState } from "react";
import { getJWT } from "../../../utils/request";
import { Col, Row } from "antd";
import product_image from "../../../images/products_image.jpg";
import product_sold_image from "../../../images/products_sold.png";
import review_image from "../../../images/review.png";
import order_image from "../../../images/order.jpg";
import order_payed_image from "../../../images/order_payed.jpg";
import user_image from "../../../images/user_image.png";
import category_image from "../../../images/categories_image.jpg";
import ChartAnalysis from "../../../components/ChartAnalysis";
function DashBoard(){
  // số lượng sản phẩm,số lượng danh mục, ố lượng tài khoản, số lượng Comments,
  // số lượng sản phẩm đã bán, số đơn đã đặt, số đơn đã thanh toán
  const [countProducts,setCountProducts]=useState(0);
  const [countCategories,setCountCategories]=useState(0);
  const [countProductsSold,setProductsSold]=useState(0);
  const [countOrders,setOrders]=useState(0);
  const [countOrdersPayed,setOrdersPayed]=useState(0);
  const [countUsers,setCountUsers]=useState(0);
  const [countReviews,setCountReviews]=useState(0);
  useEffect(()=>{
    const fetchApi =async()=>{
      try{
        const result = await getJWT(`admin/dashboard`);
        console.log(result);
        if(result.status==200){
          setCountCategories(result.data.countCategories);
          setCountProducts(result.data.countProducts);
          setProductsSold(result.data.countProductsSold);
          setCountReviews(result.data.countReviews);
          setOrders(result.data.countOrders);
          setOrdersPayed(result.data.countOrdersPayed);
          setCountUsers(result.data.countUsers);
        }
      }catch(error){
        console.error(error);
      }
      
    }
    fetchApi();
  },[]);
  return(
    <>
      <Row gutter={[10,20]}>
          <Col span={6}>
            <div className="dashboard-item" 
              style={{display:"flex",
              flexDirection:"column",
              backgroundColor:"white",
              justifyItems:"center",
              alignItems:"center",width:"250px",height:"200px",
              padding:"20px",
              borderRadius:"20px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
              }}>
              <img src={category_image} style={{width:"100px"}}/>
              <p style={{fontSize:"18px"}}>{countCategories} danh mục</p>
            </div>
          </Col>
          <Col span={6}>
            <div className="dashboard-item" 
              style={{display:"flex",
              flexDirection:"column",
              backgroundColor:"white",
              justifyItems:"center",
              alignItems:"center",width:"250px",height:"200px",
              padding:"20px",
              borderRadius:"20px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
              }}>
              <img src={product_image} style={{width:"100px"}}/>
              <p style={{fontSize:"18px"}}>{countProducts} sản phẩm</p>
            </div>
          </Col>
          <Col span={6}>
            <div className="dashboard-item" 
              style={{display:"flex",
              flexDirection:"column",
              backgroundColor:"white",
              justifyItems:"center",
              alignItems:"center",width:"250px",height:"200px",
              padding:"20px",
              borderRadius:"20px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
              }}>
              <img src={product_sold_image} style={{width:"100px"}}/>
              <p style={{fontSize:"18px"}}>{countProductsSold} sản phẩm đã bán</p>
            </div>
          </Col>
          <Col span={6}>
            <div className="dashboard-item" 
              style={{display:"flex",
              flexDirection:"column",
              backgroundColor:"white",
              justifyItems:"center",
              alignItems:"center",width:"250px",height:"200px",
              padding:"20px",
              borderRadius:"20px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
              }}>
              <img src={review_image} style={{width:"100px"}}/>
              <p style={{fontSize:"18px"}}>{countReviews}  bình luận</p>
            </div>
          </Col>
          <Col span={6}>
            <div className="dashboard-item" 
              style={{display:"flex",
              flexDirection:"column",
              backgroundColor:"white",
              justifyItems:"center",
              alignItems:"center",width:"250px",height:"200px",
              padding:"20px",
              borderRadius:"20px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
              }}>
              <img src={order_image} style={{width:"100px"}}/>
              <p style={{fontSize:"18px"}}>{countOrders}  đơn hàng</p>
            </div>
          </Col>
          <Col span={6}>
            <div className="dashboard-item" 
              style={{display:"flex",
              flexDirection:"column",
              backgroundColor:"white",
              justifyItems:"center",
              alignItems:"center",width:"250px",height:"200px",
              padding:"20px",
              borderRadius:"20px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
              }}>
              <img src={order_payed_image} style={{width:"100px"}}/>
              <p style={{fontSize:"18px"}}>{countOrdersPayed}  đơn hàng đã thanh toán</p>
            </div>
          </Col>
          <Col span={6}>
            <div className="dashboard-item" 
              style={{display:"flex",
              flexDirection:"column",
              backgroundColor:"white",
              justifyItems:"center",
              alignItems:"center",width:"250px",height:"200px",
              padding:"20px",
              borderRadius:"20px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
              }}>
              <img src={user_image} style={{width:"100px"}}/>
              <p style={{fontSize:"18px"}}>{countUsers}  người dùng</p>
            </div>
          </Col>
      </Row>
      <ChartAnalysis/>
    </>
  )
}
export default DashBoard;