export const addToCart=(id)=>{
  return{
    type:"ADD_TO_CART",
    id:id,
  }
}
export const updateQuantity=(id,quantity=1)=>{
  return{
    type:"UPDATE_QUANTITY",
    id:id,
    quantity:quantity
  }
}
export const deleteItemCart=(id)=>{
  return{
    type:"DELETE_ITEM",
    id:id
  }
}