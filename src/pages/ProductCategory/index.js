import { useEffect, useState } from "react";
import { getProducsByCategory } from "../../service/productService";
import { getBrandsByCategory } from "../../service/brandService";
import { Button, Col, Pagination, Row, Select } from "antd";
import { Link, Navigate, Outlet, useParams, useSearchParams } from "react-router-dom";
import {DownOutlined,UpOutlined} from "@ant-design/icons";
import "./ProductCategory.scss";
import { toObject } from "../../utils/convert";
import PriceFilter from "../../components/Filter/PriceFilter";
import MemoryFilter from "../../components/Filter/MemoryFilter";
import FrequencyFilter from "../../components/Filter/FrequencyFilter";
import ProductItem from "../../components/CardItemProduct";
function ProductCategory(){
  const [products,setProducts]=useState([]);
  const [brands,setBrands]=useState([]);
  const currentUrl=new URL(window.location.href);
  const sortString =currentUrl.searchParams.get("sort");
  const sort =sortString ? toObject(sortString) :{};
  const filterString =currentUrl.searchParams.get("filter");
  const filter =filterString ? toObject(filterString) :{};
  const [pageNo,setPageNo] = useState(1);
  const [pageSize,setPageSize] = useState();
  const [totalItems,setTotalItems]=useState();
  console.log(sort);
  const params=useParams();
  const handleChangePagination=(pageNo)=>{
    setPageNo(pageNo);
  }
  console.log(pageNo);
    useEffect(()=>{
      const fetchApi =async ()=>{
        try{
          const resultProduct = await getProducsByCategory(params.slugCategory,filterString,sortString,pageNo);
          const resultBrand = await getBrandsByCategory(params.slugCategory);
          if(resultProduct.status==200){
            const data=resultProduct.data;
            const products=data.dataRes;
            console.log(data);
            products.forEach((product) => {
              product["price_new"]=product.price*(1-product.discount/100);
            });
            setPageSize(data.pageSize);
            setProducts(products);
            setTotalItems(data.total);
          }
          else{
            console.error("fail products");
          }
          if(resultBrand.status==200){
            setBrands(resultBrand.data);
          }
          else{
            console.error("fail category");
          }
        }catch(error){
            console.log(error);
        }
      }
      fetchApi();
    },[pageNo]);

    

    const handleChange=(value,key)=>{
      const sorts=sortString ?sortString.split(",") : [];
      const sortIndex=sorts.findIndex(f=>f.startsWith(`${key}`));
      if(value!==""){
        if(sortIndex!=-1){
          sorts[sortIndex] =`${key}:${value}`
        }
        else{
          sorts.push(`${key}:${value}`);
        }
      }
      else{
        if(sortIndex!=-1){
          sorts.splice(sortIndex,1);
          if(sorts.length==0){

          }
        }
      }
      currentUrl.searchParams.set("sort",sorts.join(","));
      window.location.href = currentUrl;
    }
    const handleClick = (key, value) => {
      const filters = filterString ? filterString.split(",") : [];
      const filterIndex = filters.findIndex((f) => f.startsWith(`${key}`));
      if (filterIndex != -1) {
        if (filters[filterIndex] === `${key}:${value}`)
          filters.splice(filterIndex, 1);
        if(filters.length==0){
          currentUrl.searchParams.delete("sort");
        }
        else {
          filters[filterIndex] = `${key}:${value}`;
        }
      } else {
        filters.push(`${key}:${value}`);
      }
      currentUrl.searchParams.set("filter", filters.join(","));
  
      console.log(currentUrl);
      window.location.href = currentUrl;
    };
    
    
  return(
    <>
      
      <Row style={{marginTop:"20px"}}>
        <Col span={6}>
          <Row className="category">
              <Col span={24}><h2>Thương hiệu</h2></Col>
              {brands.map((brand,index)=>(
                <Col span={9} key={index}>
                    <Button 
                    className={"category__item "+(filter.brand===brand.name ? "category__item--selected":"")} 
                    onClick={()=>handleClick("brand",brand.name)}>{brand.name}</Button>
                </Col>
              ))}
              <PriceFilter topic="price"/>
              <MemoryFilter topic="memory"/>
              <FrequencyFilter topic="frequency"/>
          </Row>
        </Col>
        <Col span={18}>
          <div className="product__sort">
            <ul>
              <li className="title">Sắp xếp theo</li>
              <li>
                <Select defaultValue="" style={{width:200}} 
                  onChange={(value,key)=>handleChange(value,"rate")}
                  value={sort.rate !=null ? sort.rate:"" }
                  options={[
                  {
                    value:"",
                    label:"Đánh giá",
                  },
                  {
                    value:"asc",
                    label:"Đánh giá thấp"
                  },
                  {
                    value:"desc",
                    label:"Đánh giá cao"
                  }
                ]}/>
              </li>
              <li>
              <Select defaultValue="" style={{width:180}} 
                  onChange={(value,key)=>handleChange(value,"sold")}
                  value={sort.sold !=null ? sort.sold:"" }
                  options={[
                  {
                    value:"",
                    label:"Bán chạy"
                  },
                  {
                    value:"asc",
                    label:"Bán chạy ít"
                  },
                  {
                    value:"desc",
                    label:"Bán chạy nhất"
                  }
                ]}/>
              </li>
              <li>
              <Select defaultValue="" style={{width:180}} 
                  onChange={(value,key)=>handleChange(value,"create_date")}
                  value={sort.create_date !=null ? sort.create_date:"" }
                  options={[
                  {
                    value:"",
                    label:"Hàng mới ra"
                  },
                  {
                    value:"asc",
                    label:"Hàng cũ nhất"
                  },
                  {
                    value:"desc",
                    label:"Hàng mới nhất"
                  }
                ]}/>
              </li>
              <li>
                <Select defaultValue="" style={{width:180}} 
                  onChange={(value,key)=>handleChange(value,"price")}
                  value={sort.price !=null ? sort.price:"" }
                  options={[
                  {
                    value:"",
                    label:"Sắp xếp theo giá"
                  },
                  {
                    value:"asc",
                    label:"Sắp xếp theo giá tăng dần"
                  },
                  {
                    value:"desc",
                    label:"Sắp xếp theo giá giảm dần"
                  }
                ]}/>
              </li>
            </ul>
          </div>
          <div className="product__content">
            <Row gutter={[20,20]}>
              {products.length>0 ? (
                products.map((product,index)=>(
                <Col span={8} key={index}>
                  <ProductItem item={product} slugCategory={params.slugCategory}/>
                </Col>
              ))
              ):(
                <>
                  <h2>Không tìm thấy sản phẩm</h2>
                </>
              )}
              <Col span={24}>
              <Pagination current={pageNo}  total={totalItems} onChange={handleChangePagination} pageSize={pageSize}/>
              </Col>
            </Row>
          </div>
          
        </Col>
      </Row>
    </>
  )
}
export default ProductCategory;