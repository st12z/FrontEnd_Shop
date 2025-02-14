import { del, get, getJWT } from "../utils/request";

export const getAllCategories=async()=>{
  const result =await get(`categories`);
  return result;
}
export const getCategoryById=async(id)=>{
  const result = await get(`categories/${id}`);
  return result;
}
export const getAllCategoriesPagination=async(pageNo)=>{
  const result = await getJWT(`admin/categories?pageNo=${pageNo}`);
  return result;
}
export const deleteCategoryBySlug=async(slug)=>{
  const result = await del(`admin/categories/delete-category/${slug}`)
  return result;
}