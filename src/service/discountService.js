import { get } from "lodash";
import { getJWT, patchImage, postJWT, postJWTImage } from "../utils/request"

export const createDiscount =async (path,data)=>{
  const result = await postJWTImage(path,data);
  return result;
}
export const getAllDiscounts=async(path)=>{
  const result = await get(path);
  return result;
}
export const editDiscount =async(path,data)=>{
  const result = await patchImage(path,data);
  return result;
}
export const getDiscountById=async(path)=>{
  const result = await getJWT(path);
  return result;
}
export const saveDiscount=async(path,data)=>{
  const result = await postJWT(path,data);
  return result;
}