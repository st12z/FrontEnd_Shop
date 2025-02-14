import { Button, notification, Rate } from "antd";
import TextArea from "antd/es/input/TextArea";
import {DeleteOutlined} from "@ant-design/icons"
import { deleteReview } from "../../service/reviewService";
import { updateProductRate } from "../../service/productService";
function ReviewItem(props){
  const {item,onReload,user,slug}=props;
  const [api,contextHolder]=notification.useNotification();
  console.log(slug);
  const openNotification = (placement,message,color) => {
    api.info({
      message: `Thông báo`,
      description: <span style={{color:color,fontSize:"20px",fontWeight:600}}>{message}</span>,
      placement,
    });
  };
  const handleDelete=async(id)=>{
    try{
      const result = await deleteReview(`review/${id}`);
      const resultUpdateRate=await updateProductRate(`products/update-rate/${slug}`)
      console.log(result);
      console.log(resultUpdateRate);
      if(result.status==200){
        openNotification("topRight","Xoá đánh giá thành công!","green");
        onReload();
      }
    }catch(error){
      console.error(error);
    }
  }
  return(
    <>
      {contextHolder}
      <div className="review__item" style={{
        backgroundColor:"white",
        border:"1px solid #ddd",
        marginBottom:"10px",
        padding:"20px",
        borderRadius:"10px"
        }}>
        <div className="review__avatar" style={{display:"flex",alignItems:"center",justifyItems:"center"}}>
          <img src={item.user.avatar} style={{
            width:"60px",
            height:"60px",
            borderRadius:"50%",
            objectFit:"contain",
            marginRight:"10px"
          }}/>
          <span style={{fontSize:"15px",fontWeight:"600"}}>{item.fullName}</span>
        </div>
        <div className="review__contant" style={{marginTop:"10px",padding:"10px"}}>
          <TextArea value={item.content} readOnly/>
          <h3>Ảnh đánh giá</h3>
          <img src={item.imageReview} style={{width:"100px"}}/>
        </div>
        <div className="review__rate">
          <Rate value={item.rate} disabled/>
        </div>
        {user && item.user && user.email==item.user.email && (
          <Button icon={<DeleteOutlined />} onClick={()=>handleDelete(item.id)}/>
        )}
      </div>
    </>
  )

}
export default ReviewItem;