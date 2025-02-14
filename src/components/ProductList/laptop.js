import { useEffect, useState } from "react";
import { getAllProducts, getProducsByCategory } from "../../service/productService";
import { getAllCategories } from "../../service/categoryService";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import { getBrandsByCategory } from "../../service/brandService";
import "./ProductList.scss";
import ProductItem from "../CardItemProduct";
function Laptop() {
  const [products,setProducts]=useState([]);
  const [brands,setBrands]=useState([]);
  const topic="Laptop";
  useEffect(()=>{
    const fetchApi =async ()=>{
      try{
        const resultProduct = await getProducsByCategory("lap-top");
        const resultBrand = await getBrandsByCategory("lap-top");
        if(resultProduct.status==200){
          const products=resultProduct.data.dataRes;
          if(products.length>0){
            products.forEach((product) => {
              product["price_new"]=product.price*(1-product.discount/100);
            });
            setProducts(products);
          }
          
        }
        else{
          console.error("fail products");
        }
        if(resultBrand.status==200){
          const brands=resultBrand.data;
          if(brands.length>0) setBrands(brands);
        }
        else{
          console.error("fail category");
        }
      }catch(error){
          console.log(error);
      }
    }
    fetchApi();
  },[]);
  return (
    <>
      <div className="product__list">
        <div className="product__header">
          <Row>
            <Col span={6}>
              <h2>{topic}</h2>
            </Col>
            <Col span={18}>
              <div className="product__category">
                <ul>
                {brands.map((brand,index)=>(
                  <>
                    <li key={index}>
                    <a href={"/lap-top?filter=brand:" +brand.name} >{brand.name}</a>
                    </li>
                  </>
                ))}
                <li>
                  <a href="/lap-top">Xem tất cả</a>
                </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
        <div className="product__content">
          <Row gutter={[20,20]}>
            {products.map((product,index)=>(
              <Col span={6} key={index}>
                <ProductItem item={product} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
}
export default Laptop;