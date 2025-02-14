import { del, get, getJWT } from "../utils/request";

export const getBrandsByCategory = async (category) => {
  const result = await get(`brands?category=${category}`);
  return result;
}
export const getBrandById= async(id)=>{
  const result = await get(`brands/${id}`);
  return result;
}
export const getAllBrands=async()=>{
  const result = await get(`brands`);
  return result;
}
export const getAllBrandsPagination=async(pageNo)=>{
  const result = await getJWT(`admin/brands?pageNo=${pageNo}`);
  return result;
}
export const deleteBrandById=async(id)=>{
  const result = await del(`admin/brands/${id}`);
  return result;
}