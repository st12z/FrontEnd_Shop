import { Carousel, Col, Row } from "antd";
import bannerMid1 from "../../images/oppo-reno-13f-sliding-20-01-2025-v2.webp";
import bannerMid2 from "../../images/redmi-note-14-series-tet-ant.webp";
import bannerMid3 from "../../images/tai-nghe-sony-tet-ant-2025.webp";
import bannerRight1 from "../../images/RightBanner-con-em.webp";
import bannerRight2 from "../../images/RightBanner-nguoi-yeu.webp";
import bannerRight3 from "../../images/RightBanner-ong-ba-cha-me.webp";  
import bannerBottom from "../../images/tet-ant-2025-day1-special-desk.gif";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../service/categoryService";
import {RightOutlined} from "@ant-design/icons";
import { Link, Navigate, NavLink } from "react-router-dom";
function BannerCategory(){
  const [categories,setCategories]=useState([]);
  useEffect(()=>{
    const fetchApi=async()=>{
     try{
      const dataRes=await getAllCategories();
      if(dataRes.status==200){
        setCategories(dataRes.data);
      }
      
     }catch(error){
        console.log("Failed to fetch data",error);
      }
    }
    fetchApi();
  },[])
  return(
    <>
      <Row gutter={[20,20]} justify="center" className="banner" style={{marginTop:"20px"}}>
        <Col xxl={4} xl={4} lg={4} md={4} sm={24} xs={24} style={{display:"flex",justifyContent:"flex-end"}}>
            <div className="banner__left" >
                <div className="menu__wrapper">
                  {categories.map((category,index)=>(
                    <div className="menu__item" key={index}>
                      <div className="menu__content">
                          <a href={`/${category.slug}`}>{category.name}</a>
                      </div>
                      <div className="menu__icon">
                        <RightOutlined style={{color:"black"}}/>
                      </div>
                  </div>
                  ))}
                </div>
            </div>
        </Col>
        <Col xxl={14} xl={14} lg={14} md={14} sm={24} xs={24}>
          <div className="banner__mid" >
            <Carousel autoplay >
              <div>
                <img src={bannerMid1} />
              </div>
              <div>
                <img src={bannerMid2}/>
              </div>
              <div>
                <img src={bannerMid3}/>
              </div>
            </Carousel>
          </div>
        </Col>
        <Col xxl={6} xl={6} lg={6} md={6} sm={24} xs={24}>
          <div className="banner__right">
              <img src={bannerRight1} style={{width:"250px",height:"90px",borderRadius:"20px",marginBottom:"14px"}}/>
              <img src={bannerRight2} style={{width:"250px",height:"90px",borderRadius:"20px",marginBottom:"14px"}}/>
              <img src={bannerRight3} style={{width:"250px",height:"90px",borderRadius:"20px"}}/>
          </div>
        </Col>
      </Row>
      <Row style={{marginTop:"20px"}}>
        <Col span={24}>
          <div className="banner__bottom">
            <img src={bannerBottom} style={{width:"1180px"}}/>
          </div>
        </Col>
      </Row>
    </>
  )
}
export default BannerCategory;