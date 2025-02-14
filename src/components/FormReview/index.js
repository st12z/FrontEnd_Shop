import { Button, Col, Form, Image, Input, notification, Rate, Row, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useReducer, useRef, useState } from "react";
import { createReview } from "../../service/reviewService";
import {UploadOutlined} from "@ant-design/icons";
import { get } from "../../utils/request";
import axios from "axios";

function FormReview(props){
  const {slug,onReload}=props;
  const [rate,setRate]=useState(1);
  const [form] = Form.useForm();
  const [api,contextHolder] = notification.useNotification();

  const rules=[
    {
      required:true,
      message:"Vui lòng điền đầy đủ"
    }
  ];
  const openNotification = (placement,message,color) => {
    api.info({
      message: `Thông báo`,
      description: <span style={{color:color,fontSize:"20px",fontWeight:600}}>{message}</span>,
      placement,
    });
  };

  // Upload image
  const [fileList, setFileList] = useState([]);
  const handleChange=(e)=>{
    setFileList(e.fileList);
  }
  // End Upload image
  const handleSubmit=async(e)=>{
    let file="";
    if (fileList.length > 0) {
      file = fileList[0].originFileObj;
    }
    const data={
      fullName:e.fullName,
      phone:e.phone,
      content:e.content,
      slug:slug,
      rate:rate,
    }
    const formData = new FormData();
    formData.append(
      "reviewRequestDTO",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    
    formData.append("imageFile",file);
    const result = await createReview("review",formData);
    console.log(result);
    if(result.status==401){
      openNotification("topRight","Vui lòng đăng nhập!","red");

    }
    if(result.status==201){
      form.resetFields();
      setRate(0);
      onReload();
      openNotification("topRight", "Đánh giá thành công!", "green");
      setFileList([]);
    
    }
  }
  const handleInput=()=>{
    
  }
  return(
    <>
      {contextHolder}
      <h2>Đánh giá</h2>
      <Row style={{marginTop:"20px",justifyContent:"flex-start"}}>
        <Form onFinish={handleSubmit} form={form}>
          <Row>
            <Col span={12}>
              <Form.Item 
                label="Họ và tên" 
                name="fullName" 
                rules={rules} >
                <Input/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                label="Số điện thoại" 
                name="phone" 
                rules={rules} >
                <Input/>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Nội dung" name="content" rules={rules} >
                <TextArea rows={4} />
              </Form.Item>
            </Col>
            <Rate value={rate} onChange={setRate}/>
            <Col span={24} style={{marginTop:"20px"}}>
              <Form.Item>
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
              </Form.Item>
            </Col>
            <Col span={24} style={{justifyItems:"flex-end"}} >
              <Form.Item >
                <Button type="primary" htmlType="submit">
                  Đánh giá
                </Button>
              </Form.Item>
            </Col>
            
          </Row>
        </Form>
      </Row>
    </>
  )
}
export default FormReview;