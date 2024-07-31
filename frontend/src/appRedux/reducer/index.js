import { combineReducers } from "redux";
import authReducer from "../slices/auth";
import profileReducer from "../slices/profile";
import cartReducer from "../slices/cart";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  cart: cartReducer,
});

export default rootReducer;
