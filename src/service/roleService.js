import { getJWT } from "../utils/request"

export const getAllRoles=async(path)=>{
  const result =await getJWT(path);
  return result;
}
export const updateRole=async(path)=>{
  const result = await getJWT(path);
  return result;
}