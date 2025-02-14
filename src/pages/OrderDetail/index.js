import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderItems } from "../../service/orderService";
import { Col, InputNumber, Row, Table } from "antd";

function OrderDetail(){
  const [items,setItems]=useState();
  const [user,setUser]=useState();
  const params = useParams();
  const [totalPrice,setTotalPrice]=useState();
  const orderCode=params.orderCode;
  useEffect(()=>{
    const fetchApi = async()=>{
      try{
        const result = await getOrderItems(`order/order-detail/${orderCode}`);
        console.log(result);
        if(result.status==200){
          setUser(result.data.user);
          const items=result.data.items;
          const newItems=items.map(item=>{
            const product=item.product;
            const newProduct={
              ...product,
              price_new:product.price*(1-product.discount/100)
            };
            return{
              product:newProduct,
              quantity:item.quantity
            }
          })
          const totalPrice=newItems.reduce((sum,item)=>sum+item.product.price_new*item.quantity,0);
          setTotalPrice(totalPrice);
          setItems(newItems);
        }
      }catch(error){
        console.error(error);
      }
    }
    fetchApi();
  },[]);
  const columns =[
    {
      title:"Tên sản phẩm",
      dataIndex:"name",
      render:(_,record)=>{
        return(
          <>
            <p style={{fontWeight:"600",fontSize:"16px"}}>{record.product.name}</p>
          </>
        )
      }
    },
    {
      title:"Ảnh sản phẩm",
      dataIndex:"image",
      render:(_,record)=>{
        return(
          <>
            <img src= {record.product.image} style={{width:"100px",objectFit:"contain"}}/>
          </>
        )
      }
    },
    {
      title:"Mô tả",
      dataIndex:"description",
      key:"description",
      render:(_,record)=>{
        return(
          <>
            <p>{record.product.description}</p>
          </>
        )
      }
    },
    {
      title:"Số lượng",
      dataIndex:"quantity",
      render:(_,record)=>{
        return(
          <>
              <InputNumber defaultValue={record.quantity} style={{width:"60px"}} readOnly/>
          </>
        )
      }
    },
    {
      title:"Giá",
      dataIndex:"price",
      render:(_,record)=>{
        return(
          <>
            <p >{new Intl.NumberFormat('vi-VN').format(record.product.price)} đ</p>
          </>
        )
      }
    },
    {
      title:"Giảm giá",
      dataIndex:"discount",
      render:(_,record)=>{
        return(
          <>
            <p style={{color:"red"}}>{new Intl.NumberFormat('vi-VN').format(record.product.discount)} %</p>
          </>
        )
      }
    },
    {
      title:"Giá mới",
      dataIndex:"priceNew",
      render:(_,record)=>{
        return(
          <>
            <p >{new Intl.NumberFormat('vi-VN').format(record.product.price_new)} đ</p>
          </>
        )
      }
    },
    {
      title:"Tổng tiền",
      dataIndex:"totalPrice",
      render:(_,record)=>{
        return(
          <>
            <p style={{color:"red"}}>{new Intl.NumberFormat('vi-VN').format(record.product.price_new*record.quantity)} đ</p>
          </>
        )
      }
    }
  ]

  return(
    <>
      {user && (
        <>
        <h2 style={{textAlign:"center"}}>Thông tin đơn hàng #{orderCode}</h2>
        <p style={{fontSize:"20px"}}>Họ và tên: <strong>{user.firstName} {user.lastName}</strong></p>
        <p style={{fontSize:"20px"}}>Email: <strong>{user.email}</strong></p>
        <p style={{fontSize:"20px"}}>Địa chỉ: <strong>{user.district} - {user.city}</strong></p>
        <p style={{fontSize:"20px"}}>Email: <strong>{user.email}</strong></p>
        </>
      )}
      <Row >
        <Col span={24} style={{display:"flex",justifyContent:"flex-end"}}>
          <h2>Tổng tiền: <span style={{color:"red"}}>{new Intl.NumberFormat('vi-VN').format(totalPrice)} đ</span></h2>
        </Col>
      </Row>
      <Table style={{marginTop:"30px"}} columns={columns} dataSource={items}  rowKey={(record) => record.uid}/>
    </>
  )
};
export default OrderDetail;