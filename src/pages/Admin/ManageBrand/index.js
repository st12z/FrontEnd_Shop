import { Button, notification, Pagination, Table } from "antd";
import { useEffect, useState } from "react";
import {DeleteOutlined} from "@ant-design/icons";
import { deleteBrandById, getAllBrandsPagination } from "../../../service/brandService";
function ManageBrand(){
  const [data,setData]=useState();
  const [totalItems,setTotalItems]=useState();
  const [pageNo,setPageNo]=useState(1);
  const [pageSize,setPageSize] = useState();
  const [api,contextHolder] = notification.useNotification();
  const [reload,setReload] = useState(false);
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
        const result = await getAllBrandsPagination(pageNo);
        console.log(result);
        if(result.status==200){
          const newData=result.data.dataRes.map(item=>{
            return{
              ...item,
              key:item.id
            }
          })
          setData(newData);
          setTotalItems(result.data.total);
          setPageSize(result.data.pageSize);
          setPageNo(result.data.pageNo);
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
  const handleDeleteBrand=async(id)=>{
    try{
      
      const result =await deleteBrandById(id);
      console.log(result);
      if(result.status==200){
        setReload(!reload);
        openNotification("topRight","Xóa nhãn hàng thành công!","green");
      }
      else{
        openNotification("topRight","Xóa nhãn hàng thất bại!","red");
      }
    }catch(error){
      openNotification("topRight","Xóa nhãn hàng thất bại!","red");
      console.error(error);
    }
  }
  const columns = [
    {
      title: 'Tên hãng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title:"Tổng số sản phẩm ",
      key:"countProducts",
      render:(_,record)=>{
        return(
          <p>{record.productResponseList.length}</p>
        )
      }
    },
    {
      title:"Hành động",
      key:"action",
      render:(_,record)=>{
        return(
          <Button  style={{marginRight:"10px"}}  onClick={()=>handleDeleteBrand(record.id)}>
            {<DeleteOutlined  />}
          </Button>
        )
      }
    },
   
  ];
  return(
    <>
      {contextHolder}
      <Table dataSource={data} columns={columns} pagination={false} total={totalItems}/>
      <Pagination current={pageNo}  total={totalItems} onChange={handleChangePagination} pageSize={pageSize}/>

    </>
  )
}
export default ManageBrand;