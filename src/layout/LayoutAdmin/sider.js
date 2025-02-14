import Sider from "antd/es/layout/Sider";
import MenuSider from "../../components/MenuSider";

function SiderAdmin(){
  return(
    <>
      <Sider className="sider" style={{backgroundColor:"white",width:"240px"}}>
        <MenuSider/>
      </Sider>
    </>
  )
}
export default SiderAdmin;