import {jwtDecode} from "jwt-decode";
export const checkTokenExpiration=(token)=> {
  if (!token) {
    return false; // Không có token
  }

  try {
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000; // chuyển sang ms
    const currentTime = Date.now();
    console.log(expirationTime);
    // Kiểm tra xem token đã hết hạn chưa
    if (expirationTime > currentTime) {
      return true; // Token hợp lệ
    } else {
      return false; // Token đã hết hạn
    }
  } catch (error) {
    console.error("Error decoding token", error);
    return false; // Nếu có lỗi khi giải mã token
  }
}
export const getRoles=(token)=>{
  if(checkTokenExpiration(token)){
    try{
      const decodedToken=jwtDecode(token);
      const roles=decodedToken.roles;
      return roles;
    }catch(error){
      console.error(error);
    }
  }
  return [];
}