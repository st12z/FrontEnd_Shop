import { del, getJWT, postJWT, postJWTImage } from "../utils/request"

export const createReview=async(path,formData)=>{
  const result = await postJWTImage(path,formData);
  return result;
}
export const deleteReview = async(path)=>{
  const result =await del(path);
  return result;
}
export const getAllReviews=async(path)=>{
  const result = await getJWT(path);
  return result;
}
export const deleteReviewById=async(id)=>{
  const result = await del(id);
  return result;
}