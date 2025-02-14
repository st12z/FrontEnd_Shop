import { Button, Col, Form, Input, notification, Row, Upload } from "antd";
import { getJWT } from "../../utils/request";
import { useEffect, useState } from "react";
import {UploadOutlined} from "@ant-design/icons";
import { changeUser } from "../../service/userService";
function UserDetail(){
  const [user,setUser]=useState();
  const [avatar,setAvatar]=useState();
  const [api,contextHolder] = notification.useNotification();
  const openNotification = (placement,message,color) => {
    api.info({
      message: `Thông báo`,
      description: <span style={{color:color,fontSize:"20px",fontWeight:600}}>{message}</span>,
      placement,
    });
  };
  useEffect(()=>{
      const fetchApi= async ()=>{
        const result = await getJWT("user/detail");
        console.log(result);
        if(result.status==200){
          setUser(result.data);
          setAvatar(result.data.avatar);
        }
  
      }
      fetchApi();
    },[]);
  const rules=[{
    required: true,
    message: 'Vui lòng điền đầy đủ!',
  }];

  // upload image
  const [fileList,setFileList] = useState([]);
  const handleChange = (e)=>{
    const newFileList=e.fileList;
    setFileList(newFileList);
    if(newFileList.length>0){
      const newAvatarUrl=URL.createObjectURL(newFileList[0].originFileObj);
      setAvatar(newAvatarUrl);
    }

  }
  // end upload image

  const handleFinish=async(e)=>{
    let file="";
    if(fileList.length>0){
      file=fileList[0].originFileObj;
    }
    const formData=new FormData();
    const data={
      firstName:e.firstName,
      lastName:e.lastName,
      email:e.email,
      phone:e.phone,
      district:e.district,
      city:e.city
    }
    formData.append("userRequestDTO", new Blob([JSON.stringify(data)], { type: "application/json" }));
    formData.append("imageFile",file);
    setFileList([]);
    try{
      const result=await changeUser("user/change-user",formData);
      if(result.status==200){
        openNotification("topRight","Cập nhật thông tin thành công!","green");
      }
    }catch(error){
      console.error(error);
    }

  }
  return(
    <>
      {contextHolder}
      {user && (
        <>
          <div className="" style={{backgroundColor:"white",padding:"20px",marginTop:"20px",borderRadius:"20px",boxShadow:"2px 2px 5px rgba(0, 0, 0, 0.1)"}}>
            <Row gutter={[10,10]} >
            <Col span={8} style={{justifyItems:"center"}}>
              <div className="user__avatar" 
                style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}
              >
                <div className="user__image">
                  <img src={avatar} style={{width:"200px",borderRadius:"50%"}}/>
                </div>
                <Upload
                listType="picture"
                fileList={fileList}
                onChange={handleChange}
              
                >
                {fileList.length >=1 ? null : (
                  <Button type="primary" icon={<UploadOutlined />}>
                  Upload
                </Button>
                )}
              </Upload>
              </div>
            </Col>
            <Col span={16}>
              <div className="user__content">
              <Form
                onFinish={handleFinish}
                initialValues={user}
              >
                <Form.Item
                  label="Họ tên"
                  name="firstName"
                  rules={rules}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Tên người dùng"
                  name="lastName"
                  rules={rules}
                
                >
                <Input />
                </Form.Item>
                <Form.Item
                  label="Email người dùng"
                  name="email"
                  rules={rules}
                >
                <Input disabled/>
                </Form.Item>
                <Form.Item
                  label="Huyện"
                  name="district"
                  rules={rules}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Thành phố"
                  name="city"
                  rules={rules}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={rules}
                >
                  <Input />
                </Form.Item>
                <Form.Item label={null}>
                  <Button type="primary" htmlType="submit">
                    Cập nhật
                  </Button>
                </Form.Item>
              </Form>
              </div>
            </Col>
          </Row>
          </div>
        </>
      )}
    </>
  )
}
export default UserDetail;