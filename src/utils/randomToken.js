export const randomToken=(len)=>{
  const s="0123456789";
  let random="";
  for(let i=0;i<len;i++){
    random+=s[Math.floor(Math.random()*s.length)];

  }
  return random;
}