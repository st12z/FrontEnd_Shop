import { Menu } from "antd";
import { AppstoreOutlined,UserOutlined,
    ProductOutlined,
    CommentOutlined,
    SettingOutlined,
    HomeOutlined,
    PicCenterOutlined,
    SketchOutlined
   } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkTokenExpiration, getRoles } from "../../utils/checkTokenExpiration";

function MenuSider(){
  const [roles,setRoles] =useState([]);
  useEffect(()=>{
 
    const access_token=localStorage.getItem("access_token");
    if(checkTokenExpiration(access_token)){
      const roles=getRoles(access_token);
      setRoles(roles);
    }
    
  
  },[]);
  const items=[
    {
      key:"/dashboard",
      label:<Link to="">Dashboard</Link>,
      icon:<HomeOutlined />,
    },
    {
      key:"/manage-product",
      label:"Quản lý sản phẩm",
      icon:<ProductOutlined />,
      children:[
        { 
          key:"/admin/manage-product",
          label:<Link to="/admin/manage-product">Quản lý sản phẩm</Link>,
        },
        {
          key:"/admin/create-product",
          label:<Link to="/admin/create-product">Tạo sản phẩm mới</Link>,
        }
      ]

    },
    {
      key:"/manage-category",
      label:"Quản lý danh mục",
      icon:<PicCenterOutlined />,
      children:[
        { 
          key:"/admin/manage-category",
          label:<Link to="/admin/manage-category">Quản lý danh mục</Link>,
        },
        {
          key:"/admin/create-product",
          label:<Link to="/admin/create-category">Tạo danh mục mới</Link>,
        }
      ]
    },
    {
      key:"/manage-brand",
      label:"Quản lý hãng sản phẩm",
      icon:<PicCenterOutlined />,
      children:[
        { 
          key:"/admin/manage-brand",
          label:<Link to="/admin/manage-brand">Quản lý hãng sản phẩm</Link>,
        },
        {
          key:"/admin/create-brand",
          label:<Link to="/admin/create-brand">Tạo hãng sản phẩm mới</Link>,
        }
      ]
    },
    {
      key:"/admin/manage-order",
      label:<Link to="/admin/manage-order">Quản lý đơn hàng</Link>,
      icon:<AppstoreOutlined/>,
    },
    {
      key:"/admin/manage-review",
      label:<Link to="/admin/manage-review">Quản lý đánh giá</Link>,
      icon:<CommentOutlined />,
    },
    {
      key:"/admin/manage-discounts",
      label: <Link to="/admin/manage-discounts">Quản lý phiếu giảm giá</Link>,
      icon:<SketchOutlined  />,
      children:[
        { 
          key:"/admin/manage-discounts",
          label:<Link to="/admin/manage-discounts">Quản lý mã sản phẩm</Link>,
        },
        {
           
          key:"/admin/create-discount",
          label:<Link to="/admin/create-discount">Tạo mới phiếu giảm giá</Link>,
          
        }
      ]
    },
   ...(roles.length>0 && roles.includes("ADMIN") || roles.includes("MANAGER") ? [
    {
      
      key:"/manage-admin",
      label:<Link to="/admin/manage-admin">Quản lý tài khoản </Link>,
      icon:<UserOutlined />,
    
    },
  ]:[]),
    
    {
      key:"/admin/manage-setting",
      label:<Link to="/admin/manage-setting">Quản lý chung</Link>,
      icon:<SettingOutlined />
    }
  ]
  return(
    <>
      <Menu
        defaultSelectedKeys={["/dashboard"]}
        defaultOpenKeys={["/dashboard"]}
        mode="inline"
        items={items}
        style={{width:"240px",height:"100%"}}
      />
    </>
  )
}
export default MenuSider;