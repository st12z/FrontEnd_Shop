export const API_DOMAIN="http://localhost:8080";
export const get = async(path)=>{
  const response =await fetch(`${API_DOMAIN}/${path}`)
  const result =await response.json();
  return result;
}
export const post =async(path,data)=>{
  const response =await fetch(`${API_DOMAIN}/${path}`,{
    method:"POST",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
    },
    body:JSON.stringify(data)
    
  })
  const result=await response.json();
  return result;
}
export const getJWT=async(path)=>{
  const access_token=localStorage.getItem("access_token");
  const response = await fetch(`${API_DOMAIN}/${path}`,{
    method:"GET",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
      Authorization:`Bearer ${access_token}`
    },
    credentials:"include"
  });
  const result=response.json();
  return result;
}
export const postJWT=async(path,data)=>{
  const access_token=localStorage.getItem("access_token");
  const response = await fetch(`${API_DOMAIN}/${path}`,{
    method:"POST",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
      Authorization:`Bearer ${access_token}`
    },
    body: JSON.stringify(data),
    credentials:"include"
  });
  
  const result=await response.json();
  return result;
}

// post image
export const postJWTImage=async(path,formData)=>{
  const access_token=localStorage.getItem("access_token");
  const response = await fetch(`${API_DOMAIN}/${path}`,{
    method:"POST",
    headers:{
      Authorization:`Bearer ${access_token}`
    },
    body: formData,
    credentials:"include"
  });
  
  const result=await response.json();
  return result;
}
// end post image
export const del = async(path)=>{
  const access_token=localStorage.getItem("access_token");
  const response =await fetch(`${API_DOMAIN}/${path}`,{
    method:"DELETE",
    headers:{
      Authorization:`Bearer ${access_token}`
    },
    credentials:"include"
  });
  const result=await response.json();
  return result;
}
export const patch =async(path,data)=>{
  const access_token=localStorage.getItem("access_token");
  const response =await fetch(`${API_DOMAIN}/${path}`,{
    method:"PATCH",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
      Authorization:`Bearer ${access_token}`
    },
    body:JSON.stringify(data),
    credentials:"include"
  })
  const result=await response.json();
  return result;
}
export const patchImage =async(path,data)=>{
    const access_token=localStorage.getItem("access_token");
    const response =await fetch(`${API_DOMAIN}/${path}`,{
      method:"PATCH",
      headers:{
        Authorization:`Bearer ${access_token}`
      },
      body:data,
      credentials:"include"
    })
  const result=await response.json();
  return result;
}