import Footer from "./footer";
import Header from "./header";
import {Outlet} from "react-router-dom";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import "./LayoutDefault.scss";
import BannerCategory from "../../components/BannerCategory";
function LayoutDefault(){
  return(
    <>
      <Layout className="layout">
      <Header/>
        <Layout className="container">
        <BannerCategory/>
          <Content className="content">
            <Outlet/>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}
export default LayoutDefault;