import { cartReducer } from "./cart";
import {combineReducers} from "redux";
import { loginReducer } from "./login";
const allReducers=combineReducers({
  cartReducer,loginReducer
})
export default allReducers;