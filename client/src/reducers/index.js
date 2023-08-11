import { combineReducers } from "redux";

import authReducer from "./AuthReducer";
import postReducer from "./PostReducer";
import chatReducer from "./ChatUserReducer";
import qaReducer from "./QaReducer";
import advertReducer from "./AdvertReducer";
import lfReducer from "./LfReducer";
import usersReducer from "./UsersReducer";

export const reducers = combineReducers({authReducer,postReducer, chatReducer, qaReducer, advertReducer, lfReducer, usersReducer})