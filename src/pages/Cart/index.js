import { Button, Col, Input, InputNumber, notification, Row, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import { getProductsInCart } from "../../service/productService";
import {DeleteOutlined} from "@ant-design/icons";
import { addToCart, updateQuantity,deleteItemCart } from "../../action/cart";
import {useDispatch} from "react-redux";
function Cart(){
  const [items,setItems]=useState([]);
  const dispatch= useDispatch();
  const inputRef=useRef();
  const [reload,setReload]=useState(true);
  const [totalPrice,setTotalPrice]=useState();
  useEffect(()=>{
    const fetchApi=async()=>{
    const cart = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")):[];
    const cartKey=localStorage.getItem("cartKey")     
      try{
      const result = await getProductsInCart(cart,cartKey);
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
  },[reload]);
  const handleUpdateQuantity=(id,q)=>{
    const cart=JSON.parse(localStorage.getItem("cart"));
    const existItem=cart.find(item=>item.id==id);
    if(q==-1 && existItem.quantity>1){
      dispatch(updateQuantity(id,q));
      setReload(!reload);
    }
    if(q==1){ 
      dispatch(updateQuantity(id,q));
      setReload(!reload);
    }

  }

  const deleteItem=(id)=>{
    setReload(!reload);
    dispatch(deleteItemCart(id));
  }

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
            <div style={{display:"flex"}}>
              <Button style={{marginRight:"10px"}} onClick={()=>handleUpdateQuantity(record.product.id,1)} size="small">+</Button>
              <input value={record.quantity} style={{width:"60px"}} min={1}  ref={inputRef}/>
              <Button style={{marginLeft:"10px"}} onClick={()=>handleUpdateQuantity(record.product.id,-1)} size="small">-</Button>
            </div>
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
    },
    {
      title:"Hành động",
      dataIndex:"actions",
      render:(_,record)=>{
        return(
          <>
            <Button icon=<DeleteOutlined /> style={{width:"60px"}} onClick={()=>deleteItem(record.product.id)}/>
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
        <Col span={24} style={{display:"flex",justifyContent:"flex-end"}}>
          <Button href="/payment" type="primary">Thanh toán</Button>
        </Col>

      </Row>
      <Table style={{marginTop:"30px"}} columns={columns} dataSource={items}  rowKey={(record) => record.uid}/>
    </>
  )
}
export default Cart;