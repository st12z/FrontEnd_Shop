import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductBySlug } from "../../../service/productService";
import { Rate, Tag } from "antd";
import { getCategoryById } from "../../../service/categoryService";
import { getBrandById, getBrandsByCategory } from "../../../service/brandService";

function ProductDetailAdmin(){
  const [product,setProduct]=useState();
  const [category,setCategory]=useState();
  const [brand,setBrand] = useState();
  const params=useParams();
  const slug=params.slug;
  useEffect(()=>{
    const fetchApi=async()=>{
      try{
        const result = await getProductBySlug(slug);
        console.log(result);
        if(result.status==200){
          const resultCategory= await getCategoryById(result.data.categoryId);
          if(resultCategory.status==200){
            const resultBrand = await getBrandById(result.data.brandId);
            if(resultBrand.status==200){
              setBrand(resultBrand.data);
            }
            setCategory(resultCategory.data);
          }
          setProduct(result.data);
        }
      }catch(error){
        console.log(error);
      }
    };
    fetchApi();
  },[])
  return(
    <>
      <h2>Thông tin sản phẩm</h2>
      {product && (
        <>
        <p style={{fontSize:"18px"}}><strong>Tên sản phẩm:</strong> {product.name}</p>
        <img src={product.image} style={{width:"150px"}} />
        <p><strong>Giá :</strong> {new Intl.NumberFormat('vi-VN').format(product.price)} đ</p>
        <p><strong>Giảm giá: </strong><Tag color="error">{product.discount} %</Tag></p>
        <p>
          <strong>Trạng thái: </strong>
          {product.status ? 
            (
              <Tag color="success">Còn hàng</Tag>
            ):
            (
              <Tag color="error">Hết hàng</Tag>
            )
          }
        </p>
        <p><strong>Mô tả: </strong>{product.description}</p>
        <p><strong>Tần số: </strong>{product.frequency} Hz</p>
        <p><strong>Bộ nhớ: </strong>{product.memory} GB</p>
        <p><strong>Kích thước màn hình: </strong>{product.monitorSize} inch</p>
        <p><strong>Đánh giá: </strong><Rate value={product.rate}/></p>
        <p><strong>Số lượng bán: </strong>{product.sold}</p>
        {category && <p><strong>Danh mục: </strong>{category.name}</p>}
        {brand && <p><strong>Hãng điện thoại: </strong>{brand.name}</p>}
        </>
      )}
    </>
  )
}
export default ProductDetailAdmin;