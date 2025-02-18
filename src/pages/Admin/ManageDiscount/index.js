import { useEffect, useState } from "react";
import { Button, notification, Pagination, Table, Tag } from "antd";
import {DeleteOutlined,EditOutlined} from "@ant-design/icons";
import { getAllDiscounts } from "../../../service/discountService";
function ManageDiscount(){
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
        const result = await getAllDiscounts(`admin/discounts?pageNo=${pageNo}`);
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
  const columns = [
    {
      title: 'Tên mã giảm giá',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title:"Số lượng",
      dataIndex:"quantity",
      key:"quantity"
    },
    {
      title:"Phần trăm",
      dataIndex:"value",
      key:"value",
      render:(_,record)=>{
        return(
          <Tag color="red">{record.value} %</Tag>
        )
      }
    },
    {
      title:"Trạng thái",
      dataIndex:"active",
      key:"active",
      render:(_,record)=>{
        return(
          record.active ? (
            <Tag color="green">Hoạt động </Tag>
          ):(
            <Tag color="red">Dừng hoạt động</Tag>
          )
        )
      }
    },
    {
      title:"Hành động",
      key:"action",
      render:(_,record)=>{
        return(
          <Button href={"/admin/edit-discount/"+record.id }  style={{marginRight:"10px"}} >
            {<EditOutlined />}
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
export default ManageDiscount;