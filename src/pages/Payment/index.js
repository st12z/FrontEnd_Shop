
import { Button, Col, Input, InputNumber, notification, Row, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import { getProductsInCart } from "../../service/productService";
import FormPayment from "../../components/FormPayment";
function Payment(){
  const [items,setItems]=useState([]);
  const [totalPrice,setTotalPrice]=useState();
  useEffect(()=>{
    const fetchApi=async()=>{
    const cart = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")):[];
     try{
      const result = await getProductsInCart(cart);
      if(result.status==200){
        const items=result.data;
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
      else{
        console.log("fail");
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
      <Row >
        <Col span={24} style={{display:"flex",justifyContent:"flex-end"}}>
          <h2>Tổng tiền: <span style={{color:"red"}}>{new Intl.NumberFormat('vi-VN').format(totalPrice)} đ</span></h2>
        </Col>
      </Row>
      <Table style={{marginTop:"30px"}} columns={columns} dataSource={items}  rowKey={(record) => record.uid}/>
      <FormPayment items={items} totalPrice={totalPrice}/>
    </>
  )
}
export default Payment;