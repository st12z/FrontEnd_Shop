import { LogoutOutlined, DownOutlined ,UserOutlined,EditOutlined} from "@ant-design/icons";
import { Dropdown } from "antd";

function DropDownUser(props) {
  const { user } = props;
  const items = [
    {
      key: "1",
      label: (
        <a href="/user/detail">
          <UserOutlined  style={{ marginRight: "10px", fontSize: "20px" }} />
          <span>Thông tin tài khoản</span>
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a href="/user/change-password">
          <EditOutlined  style={{ marginRight: "10px", fontSize: "20px" }} />
          <span>Thay đổi mật khẩu</span>
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a href="/logout">
          <LogoutOutlined style={{ marginRight: "10px", fontSize: "20px" }} />
          <span>Đăng xuất</span>
        </a>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      {user && (
        <a onClick={(e) => e.preventDefault()}>
          <div className="inner__avatar" style={{display:"flex",alignItems:"center"}}>
            <img src={user.avatar} style={{width:"40px",marginRight:"5px",borderRadius:"50%",objectFit:"contain"}}/>
            {user.firstName} {user.lastName}
            <DownOutlined />
          </div>
          
        </a>
      )}
    </Dropdown>
  );
}

export default DropDownUser;
