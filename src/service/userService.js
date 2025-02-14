import { get, getJWT, patch, patchImage, post } from "../utils/request"

export const createUser=async(path,data)=>{
  const result = await post(path,data);
  return result;
}
export const loginUser=async(path,data)=>{
  const result = await post(path,data);
  return result;
}
export const changeUser=async(path,data)=>{
  const result = await patchImage(path,data);
  return result;
}
export const changePassword=async(path,data)=>{
  const result = await patch(path,data);
  return result
}
export const forgotPassword=async(path,data)=>{
  const result =await get(path);
  return result;
}
export const otpPassword=async(path,data)=>{
  const result =await get(path);
  return result;
}
export const resetPassword=async(path,data)=>{
  const result = await post(path,data);
  return result;
}
export const getAllUsers=async(path)=>{
  const result = await getJWT(path);
  return result;
}
export const updateStatusAccount=async(path)=>{
  const result = await getJWT(path);
  return result;
}

