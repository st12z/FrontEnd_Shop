import { Button, Col, Image, notification, Pagination, Row, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { getJWT } from "../../../utils/request";
import {DeleteOutlined ,EditOutlined,EyeOutlined} from "@ant-design/icons";
import { deleteProduct } from "../../../service/productService";
function ManageProduct(){
  const [pageNo,setPageNo]=useState(1);
  const [pageSize,setPageSize]=useState();
  const [totalItems,setTotalItems] = useState([]);
  const [data,setData]=useState();
  const [reload,setReload]=useState(false);
  const [api,contextHolder] = notification.useNotification();
  const openNotification = (placement,message,color) => {
    api.info({
      message: `Thông báo`,
      description: <span style={{color:color,fontSize:"20px",fontWeight:600}}>{message}</span>,
      placement,
    });
  };
  const handleChangePagination=(e)=>{
    setPageNo(e);
  }
  useEffect(()=>{
    const fetchApi=async()=>{
      try{
        const result = await getJWT(`admin/products?pageNo=${pageNo}`);
        console.log(result);
        if(result.status==200){
          setData(result.data.dataRes);
          setPageNo(result.data.pageNo);
          setPageSize(result.data.pageSize);
          setTotalItems(result.data.total);
        }
      }catch(error){
        console.error(error);
      }
    }
    fetchApi();
  },[pageNo,reload]);
  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ảnh sản phẩm',
      dataIndex: 'image',
      key: 'image',
      render: (_, record) => (
        <>
          <Image width={150} src={record.image} />
        </>
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (_, record) => (
        <>
          <p>{new Intl.NumberFormat('vi-VN').format(record.price)} đ</p>
        </>
      ),
    },
    {
      title: 'Giảm giá',
      key: 'discount',
      dataIndex: 'discount',
      render: (_, record) => (
        <>
          <Tag style={{fontSize:"18px"}} color="warning">{record.discount} %</Tag>
        </>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render: (_, record) => {
        const color = record.status ? "green" : "red";
        const title = record.status ? "Còn hàng" : "Hết";
        return <><Tag color={color}>{title}</Tag></>
      }
    },
    {
      title: 'Hành động',
      key: 'action',
      dataIndex: 'action',
      render: (_, record) => (
        <>
          <Button  style={{marginRight:"10px"}}  onClick={()=>handleDeleteProduct(record.slug)}>
            {<DeleteOutlined  />}
          </Button>
          <Button  style={{marginRight:"10px"}}  href={"/admin/manage-product/edit/"+record.slug}>
            {<EditOutlined />}
          </Button>
          <Button  style={{marginRight:"10px"}} href={"/admin/manage-product/view/"+record.slug}>
            {<EyeOutlined />}
          </Button>
        </>
      )

      
    },
  ];
  const handleDeleteProduct=async(slug)=>{
    try{
      const result= await deleteProduct(`admin/products/delete-product/${slug}`);
      if(result.status==200){
        setReload(!reload);
        openNotification("topRight","Đã xóa thành công!","green");
      }
      else{
        openNotification("topRight","Đã xóa thất bại!","red");
      }
      
    }catch(error){
      console.error(error);
      openNotification("topRight","Đã xóa thất bại!","red");
    }
  }
  return(
    <>
      {contextHolder}
      <Table dataSource={data} columns={columns} pagination={false} />
      <Pagination current={pageNo}  total={totalItems} onChange={handleChangePagination} pageSize={pageSize}/>
    </>
  )
}
export default ManageProduct;