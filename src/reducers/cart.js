import { randomToken } from "../utils/randomToken";

export const cartReducer=(state=[],action)=>{
  console.log(state,action);
  let newState=JSON.parse(localStorage.getItem("cart"));
  if(newState==undefined || newState.length==0){
    newState=[];
    const cartKey=localStorage.getItem("cartKey");
    if(cartKey==undefined){
      localStorage.setItem("cartKey",randomToken(6));
    }
    
  }
  switch(action.type){
    case "ADD_TO_CART":
      const cartAdd=[
        ...newState,
        {
          id:action.id,
          quantity:1
        }
      ]
      localStorage.setItem("cart",JSON.stringify(cartAdd));
      return cartAdd;
    case "UPDATE_QUANTITY":
      const itemUpdate=newState.find(item=>item.id==action.id);
      itemUpdate["quantity"]+=action.quantity;
      localStorage.setItem("cart",JSON.stringify(newState));
      return newState;
    case "DELETE_ITEM":
      const cartDelete= newState.filter(item=>item.id!=action.id);
      localStorage.setItem("cart",JSON.stringify(cartDelete));
      return cartDelete;
    default:
      return state;
  }

}