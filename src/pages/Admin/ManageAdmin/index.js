import { Button, notification, Pagination, Rate, Select, Table } from "antd";
import { useEffect, useState } from "react";
import {DeleteOutlined} from "@ant-design/icons";
import { getAllUsers, updateStatusAccount } from "../../../service/userService";
import { getAllRoles, updateRole } from "../../../service/roleService";
function ManageAdmin(){
  const [data,setData]=useState();
  const [totalItems,setTotalItems]=useState();
  const [pageNo,setPageNo]=useState(1);
  const [pageSize,setPageSize] = useState();
  const [api,contextHolder] = notification.useNotification();
  const [reload,setReload] = useState(false);
  const [roles,setRoles] = useState();
  const [value,setValue]=useState();
  const [email,setEmail]=useState();
  const [disabled,setDisabled]=useState(true);
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
        const result = await getAllUsers(`admin?pageNo=${pageNo}`);
        const resultRoles=await getAllRoles(`admin/roles`);
        if(result.status==200){
          setTotalItems(result.data.total);
          setPageSize(result.data.pageSize);
          setPageNo(result.data.pageNo);
          const data=result.data.dataRes;
          const newData=data.map(item=>{
            const newRoles=item.roles.map(role=>{
              return role.id
            });
            return{
              ...item,
              roles:newRoles
            }
          });
          setData(newData);
        }
        if(resultRoles.status==200){
          const roles=resultRoles.data.map(item=>{
            return{
              label:item.name,
              value:item.id
            }
          });
          setRoles(roles);
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
  const handleStatusAccount=async(email,status)=>{
    try{
      const result = await updateStatusAccount(`admin/${email}?status=${status}`);
      console.log(result);
      if(result.status==200){
        setReload(!reload);
        if(status==0){
          openNotification("topRight",`Bạn đã khóa tài khoản ${email}!`,"red");
        }
        else{
          openNotification("topRight",`Bạn đã mở khóa tài khoản ${email}!`,"green");
        }
      }
    }catch(error){
      openNotification("topRight","Cập nhật thất bại!","red");
      console.error(error);
    }
  }
  const handleChangeRole=(email,value)=>{
    setEmail(email);
    setValue(value);
    setDisabled(false);
  }
  const handleSave=async()=>{
    try{
      const result =await updateRole(`admin/update-role/${email}?roleIds=${value}`);
      console.log(result);
      if(result.status==200){
        openNotification("topRight",`Bạn đã cập nhật quyền của ${email}!`,"green");
      }
      else{
        openNotification("topRight",`Bạn đã cập nhật thất bại!`,"red");

      }
    }catch(error){
      console.error(error);
      openNotification("topRight",`Bạn đã cập nhật thất bại!`,"red");

    }
  }
  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Họ tên',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title:"Tên",
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title:"Huyện",
      dataIndex:"district",
      key: 'district',
    },
    {
      title:"Thành phố",
      dataIndex:"city",
      key: 'city',
    },
    {
      title:"Số điện thoại",
      dataIndex:"phone",
      key:"phone"
    },
    {
      title:"Quyền tài khoản",
      dataIndex:"role",
      key:"role",
      render:(_,record)=>{
        return(
          <>
            <Select 
              mode="multiple" 
              allowClear
              options={roles} 
              defaultValue={record.roles} 
              style={{
                width: '100%',
              }}
              onChange={(value)=>handleChangeRole(record.email,value)}
            />
          </>
        )
      }
    },
    {
      title:"Trạng thái tài khoản",
      dataIndex:"status",
      key:"status",
      render:(_,record)=>{
        return(
          <>
            {record.status ?(
              <Button color="red" variant="outlined" onClick={(email,status)=>handleStatusAccount(record.email,0)}>
                Khoá tài khoản
              </Button>
            ):(
              <Button color="green" variant="outlined" onClick={()=>handleStatusAccount(record.email,1)}>
                Kích hoạt tài khoản
              </Button>
            )}
            <Button 
              style={{marginLeft:"20px"}} 
              type="primary" 
              onClick={handleSave}
              disabled= {record.email==email ? disabled:true }
               >
              Save
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
export default ManageAdmin;