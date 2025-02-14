import { getJWT } from "../utils/request"

export const getRoomChats=async (path)=>{
  const result = await getJWT(path);
  return result;
}