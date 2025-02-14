import { del, getJWT, postJWT } from "../utils/request";

export const order=async(path,data)=>{
  const result = await postJWT(path,data);
  return result;
}
export const updateOrder=async(path)=>{
  const result = await getJWT(path);
  return result;
}
export const getOrderItems=async(path)=>{
  const result = await getJWT(path);
  return result;
}
export const getAllOrders=async(path)=>{
  const result = await getJWT(path);
  return result;
}
export const getAllStatusOrders=async(path)=>{
  const result = await getJWT(path);
  return result;
}
export const updateOrderStatus=async(path)=>{
  const result = await getJWT(path);
  return result;
}
export const deleteOrderByCode=async(path)=>{
  const result =await del(path);
  return result;
}