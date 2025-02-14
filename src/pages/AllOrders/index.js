import { Button, InputNumber, Pagination, Table } from "antd"
import { useEffect, useState } from "react"
import { getOrderItems } from "../../service/orderService";
import {EyeOutlined} from "@ant-design/icons";
function AllOrders(){
  const [pageNo,setPageNo]=useState(1);
  const [totalElements,setTotalElements]= useState();
  const [items,setItems]=useState();
  const [pageSize,setPageSize]=useState();
  useEffect(()=>{
    const fetchApi = async()=>{
      const result = await getOrderItems(`order?pageNo=${pageNo}`);
      console.log(result);
      if(result.status==200){
        setItems(result.data.dataRes);
        setPageNo(result.data.pageNo);
        setTotalElements(result.data.total);
        setPageSize(result.data.pageSize)
      }
      
    }
    fetchApi();
  },[pageNo]);
  const handleChangePagination=(pageNo)=>{
    setPageNo(pageNo);
  }
  const columns =[
    {
      title:"Mã code đơn hàng",
      dataIndex:"orderCode",
      key:"orderCode"
    },
    {
      title:"Email",
      dataIndex:"email",
      key:"email"
    },
    {
      title:"Họ và tên",
      dataIndex:"fullName",
      render:(_,record)=>{
        return(
          <>
            <span >{record.firstName} {record.lastName} </span>
          </>
        )
      }
    },
    {
      title:"Địa chỉ",
      dataIndex:"address",
      render:(_,record)=>{
        return(
          <>
            <span >{record.district}-{record.city} </span>
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
            <p style={{color:"red"}}>{new Intl.NumberFormat('vi-VN').format(record.totalPrice)} đ</p>
          </>
        )
      }
    },
    {
      title:"Xem chi tiết",
      dataIndex:"totalPrice",
      render:(_,record)=>{
        return(
          <>
            <Button href={"/order/order-detail/"+record.orderCode} icon={<EyeOutlined />}></Button>
          </>
        )
      }
    }
  ]
  return(
    <>
      <Table style={{marginTop:"30px"}} columns={columns} dataSource={items}  rowKey={(record) => record.uid}/>
      <Pagination current={pageNo}  total={totalElements} onChange={handleChangePagination} pageSize={pageSize}/>

    </>
  )
}
export default AllOrders;