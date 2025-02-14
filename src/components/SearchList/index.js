import { useEffect, useState } from "react";
import { getAllProductsBySearch } from "../../service/productService";
import ProductItem from "../CardItemProduct";
import { Col, Row } from "antd";

function SearchList(){
  const [products,setProduct] = useState([]);
  const url = new URL(window.location.href);
  const search=url.searchParams.get("search");
  useEffect(()=>{
    const fetchApi=async()=>{
      try{
        const result=await getAllProductsBySearch(search);
        console.log(result);
        if(result.status==200){
          const products=result.data;
          const newProducts=products.map(product => {
            return{
              ...product,
              price_new:product.price*(1-product.discount/100)
            }
          });
          console.log(newProducts);
          setProduct(newProducts);
        }
        else{
          console.log("fail");
        }
      }catch(error){
        console.error(error);
      }
    }
    fetchApi();
  },[])
  return(
    <>
      <h2>Kết quả tìm kiếm</h2>
      {products.length>0 ? (
        <div className="product__list">
          <div className="product__content">
            <Row gutter={[20,20]}>
              {products.map((product,index)=>(
                <Col span={6} key={index}>
                  <ProductItem item={product}/>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      ):(
        <h2>Không tồn tại sản phẩm</h2>
      )}
    </>
  )
}
export default SearchList;