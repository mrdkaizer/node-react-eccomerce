import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import tokenReducer from "./tokenReducer";
import infoReducer from "./infoReducer";
import adminToken from "./adminTokenReducer";

export default combineReducers({
  cartReducer,
  tokenReducer,
  infoReducer,
  adminToken,
});
