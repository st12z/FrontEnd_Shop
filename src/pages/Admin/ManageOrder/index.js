import { Button, notification, Pagination, Select, Table } from "antd";
import { useEffect, useState } from "react";
import {DeleteOutlined} from "@ant-design/icons";
import { deleteOrderByCode, getAllOrders, getAllStatusOrders, updateOrderStatus } from "../../../service/orderService";
function ManageOrder(){
  const [data,setData]=useState();
  const [totalItems,setTotalItems]=useState();
  const [pageNo,setPageNo]=useState(1);
  const [pageSize,setPageSize] = useState();
  const [api,contextHolder] = notification.useNotification();
  const [reload,setReload] = useState(false);
  const [options,setOptions]=useState();
  const [disabled,setDisabled]=useState(true);
  const [current,setCurrent] = useState();
  const [orderStatus,setOrderStatus]=useState();
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
        const result = await getAllOrders(`admin/orders?pageNo=${pageNo}`);
        const resultStatus=await getAllStatusOrders(`admin/orders/status-orders`);
        console.log(resultStatus);
        if(result.status==200){
          setData(result.data.dataRes);
          setTotalItems(result.data.total);
          setPageSize(result.data.pageSize);
          setPageNo(result.data.pageNo);
        }
        if(resultStatus.status==200){
          const keyArray=Object.keys(resultStatus.data);
          const options=keyArray.map(item=>{
            return{
              label:item,
              value:item
            }
          })
          console.log(options);
          setOptions(options);
        }
      }catch(error){
        console.error(error);
      }
    }
    fetchApi();
  },[pageNo,reload]);

  const handleChangePagination = (e)=>{
    setPageNo(e);
  }
  const handleChangeStatus=(value,orderCode)=>{
    setCurrent(orderCode);
    setDisabled(false);
    setOrderStatus(value);
  }
  const handleEditStatus=async()=>{
    try{
      const result = await updateOrderStatus(`admin/orders/update/${current}?status=${orderStatus}`);
      if(result.status==200){
        console.log(result);
        openNotification("topRight","Cập nhật trạng thái đơn hàng thành công!","green");
      }
      else{
        openNotification("topRight","Cập nhật trạng thái đơn hàng thất bại!","red");
      }
    }catch(error){
      openNotification("topRight","Cập nhật trạng thái đơn hàng thất bại!","red");
    }
  }
  const handleDeleteOrder=async(orderCode)=>{
    try{
      
      const result =await deleteOrderByCode(`admin/orders/delete/${orderCode}`);
      console.log(result);
      if(result.status==200){
        setReload(!reload);
        openNotification("topRight","Xóa đơn hàng thành công!","green");
      }
      else{
        openNotification("topRight","Xóa đơn hàng thất bại!","red");
      }
    }catch(error){
      openNotification("topRight","Xóa đơn hàng thất bại!","red");
      console.error(error);
    }
  }
  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'orderCode',
      key: 'orderCode',
    },
    {
      title:"Email",
      dataIndex: 'email',
      key: 'email',
    },
    {
      title:"Tên người đặt hàng",
      dataIndex: 'fullName',
      key: 'fullName',
      render:(_,record)=>{
        return(
          <p>{record.firstName} {record.lastName}</p>
        )
      }
    },
    {
      title:"Trạng thái đơn hàng",
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render:(_,record)=>{
        return(
          <Select options={options} width={220} defaultValue={record.orderStatus} onChange={(value)=>handleChangeStatus(value,record.orderCode)}/>
        )
      }
    },
    {
      title:"Địa chỉ đặt hàng",
      dataIndex: 'address',
      key: 'address',
      render:(_,record)=>{
        return(
          <p>{record.district},{record.city}</p>
        )
      }
    },
    {
      title:"Tổng số tiền",
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render:(_,record)=>{
        return(
          <p>{new Intl.NumberFormat('vi-VN').format(record.totalPrice)} đ</p>
        )
      }
    },
    {
      title:"Hành động",
      key:"action",
      render:(_,record)=>{
        return(
          <>
            <Button  style={{marginRight:"10px"}}  onClick={()=>handleDeleteOrder(record.orderCode)}>
              {<DeleteOutlined  />}
            </Button>
            <Button type="primary" disabled={record.orderCode==current ? disabled: true} onClick={handleEditStatus}>Save</Button>
          </>
        )
      }
    },
   
  ];
  return(
    <>
      {contextHolder}
      <Table dataSource={data} columns={columns} pagination={false} />
      <Pagination current={pageNo}  total={totalItems} onChange={handleChangePagination} pageSize={pageSize}/>
    </>
  )
}
export default ManageOrder;