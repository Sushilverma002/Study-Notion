import { toast } from "react-hot-toast";

import { setUser } from "../../slices/profile";
import { apiConnector } from "../apiconnector";
import { settingsEndpoints } from "../apis";
import { logout } from "./authAPI";

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;
