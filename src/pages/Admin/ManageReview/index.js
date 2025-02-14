import { Button, notification, Pagination, Rate, Select, Table } from "antd";
import { useEffect, useState } from "react";
import {DeleteOutlined} from "@ant-design/icons";
import { deleteReviewById, getAllReviews } from "../../../service/reviewService";
function ManageReview(){
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
        const result = await getAllReviews(`admin/reviews?pageNo=${pageNo}`);
        console.log(result);
        if(result.status==200){
          setData(result.data.dataRes);
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
  const handleDeleteReview=async(id)=>{
    try{
      
      const result =await deleteReviewById(`admin/reviews/delete/${id}`);
      console.log(result);
      if(result.status==200){
        setReload(!reload);
        openNotification("topRight","Xóa bình luận thành công!","green");
      }
      else{
        openNotification("topRight","Xóa bình luận thất bại!","red");
      }
    }catch(error){
      openNotification("topRight","Xóa bình luận thất bại!","red");
      console.error(error);
    }
  }
  const columns = [
    {
      title: 'Tên người dùng',
      dataIndex: 'username',
      key: 'username',
      render:(_,record)=>{
        return(
          <p>{record.user.email}</p>
        )
      }
    },
    {
      title:"Tên người đánh giá",
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title:"Nội dung bình luận",
      key: 'content',
      render:(_,record)=>{
        return(
          <>
            <div className="content">
              <img src={record.imageReview} style={{width:"150px"}}/>
              <p><strong>Mô tả: </strong> {record.content}</p>
            </div>
          </>
        )
      }
    },
    {
      title:"Đánh giá",
      key: 'rate',
      render:(_,record)=>{
        return(
          <>
            <Rate value={record.rate}  disabled/>
          </>
        )
      }
    },
    {
      title:"Mã ID sản phẩm",
      dataIndex:"productId",
      key:"productId"
    },
    {
      title:"Hành động",
      key:"action",
      render:(_,record)=>{
        return(
          <>
            <Button  style={{marginRight:"10px"}} onClick={()=>handleDeleteReview(record.id)}>
              {<DeleteOutlined  />}
            </Button>
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
export default ManageReview;