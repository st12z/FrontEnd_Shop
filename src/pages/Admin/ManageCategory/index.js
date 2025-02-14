import { useEffect, useState } from "react";
import { deleteCategoryBySlug, getAllCategories, getAllCategoriesPagination } from "../../../service/categoryService";
import { Button, notification, Pagination, Table } from "antd";
import {DeleteOutlined} from "@ant-design/icons";
function ManageCategory(){
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
        const result = await getAllCategoriesPagination(pageNo);
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
  const handleDeleteCategory=async(slug)=>{
    try{
      
      const result =await deleteCategoryBySlug(slug);
      console.log(result);
      if(result.status==200){
        setReload(!reload);
        openNotification("topRight","Xóa danh mục thành công!","green");
      }
      else{
        openNotification("topRight","Xóa danh mục thất bại!","green");
      }
    }catch(error){
      openNotification("topRight","Xóa danh mục thất bại!","green");
      console.error(error);
    }
  }
  const columns = [
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title:"Tổng số sản phẩm ",
      key:"countProducts",
      render:(_,record)=>{
        return(
          <p>{record.products.length}</p>
        )
      }
    },
    {
      title:"Tổng số nhãn hàng",
      key:"brand",
      render:(_,record)=>{
        return(
          <p>{record.countBrands}</p>
        )
      }
    },
    {
      title:"Hành động",
      key:"action",
      render:(_,record)=>{
        return(
          <Button  style={{marginRight:"10px"}}  onClick={()=>handleDeleteCategory(record.slug)}>
            {<DeleteOutlined  />}
          </Button>
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
export default ManageCategory;