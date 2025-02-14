import Sider from "antd/es/layout/Sider";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import HeaderAdmin from "./header";
import "./LayoutAdmin.scss"
import SiderAdmin from "./sider";
function LayoutAdmin(){
  return(
    <>
      <Layout className="layout-admin">
        <HeaderAdmin/>
        <Layout>
          <SiderAdmin/>
          <Content style={{margin:"60px"}}>
            <Outlet/>
          </Content>
        </Layout>
    </Layout>
    </>
  )
}
export default LayoutAdmin;