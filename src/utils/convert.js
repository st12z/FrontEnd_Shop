export const toObject=(queryString)=>{
  const filter={};
  const filterArray=queryString.split(",");
  filterArray.forEach(item => {
    const [key,value]=item.split(":");
    filter[key]=value;
  });
  return filter;
}