import { get, getJWT } from "../utils/request"

export const getUrlPayment=async(path,amount,option)=>{
  const newPath=`${path}&amount=${amount}&bankCode=${option}`;
  const result = await getJWT(newPath);
  return result;
}
export const getReturnlUrl = async(path)=>{
  const result = await getJWT(path);
  return result;
}