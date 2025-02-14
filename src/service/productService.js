import { del, get, post, postJWTImage } from "../utils/request";

export const getAllProductsBySearch=async(search)=>{
  let query =search ? `?search=${search}` :"";
  const result=await get(query);
  return result;
}
export const getProducsByCategory=async(slug,filter,sort,pageNo=1)=>{
  let query=`products?category=${slug}&pageNo=${pageNo}`;
  if(filter){
    query+=`&filter=${filter}`;
  }
  if(sort){
    query+=`&sort=${sort}`;
  }
  const result=get(query);
  return result;  
}
export const getProductBySlug=async(slugProduct)=>{
  const result = await get(`products/detail/${slugProduct}`);
  return result;
}
export const getProductsInCart=async(data,cartKey)=>{
  const result = await post(`cart?cartKey=${cartKey}`,data);
  return result;
}
export const updateProductRate=async(path)=>{
  const result = await get(path);
  return result;
}
export const createProduct=async(path,data)=>{
  const result = await postJWTImage(path,data);
  return result;
}
export const editProduct = async(path,data)=>{
  const result = await postJWTImage(path,data);
  return result;
}
export const deleteProduct=async(path)=>{
  const result = await del(path);
  return result;

}