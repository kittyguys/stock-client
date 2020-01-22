import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { Data } from "./types";
import {
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail
} from "../profile/actions";

export const updateProfile = (
  data: Data
): ThunkAction<void, {}, undefined, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const token = Cookies.get("jwt");
    const { profile_image_url } = data;
    delete data.profile_image_url;
    dispatch(updateProfileRequest());
    if (profile_image_url) {
      const formData = new FormData();
      const entries = Object.entries(data);
      formData.append("profile_image_url", profile_image_url[0]);
      for (let i = 0; i < entries.length; i++) {
        formData.append(entries[i][0], entries[i][1]);
      }
      axios
        .patch(
          `${process.env.API_PATH}:${process.env.API_PORT}/api/users`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(res => {
          const token = Cookies.get("jwt");
          const profile: any = jwt_decode(token);
          const updateDiff: any = jwt_decode(res.data.token);
          const newProfile = {
            ...profile,
            ...updateDiff
          };
          Cookies.set("jwt", res.data.token);
          dispatch(updateProfileSuccess(newProfile));
        })
        .catch(err => {
          console.log(err.message);
          dispatch(updateProfileFail());
        });
    } else {
      axios
        .patch(
          `${process.env.API_PATH}:${process.env.API_PORT}/api/users`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(res => {
          const token = Cookies.get("jwt");
          const profile: any = jwt_decode(token);
          const updateDiff: any = jwt_decode(res.data.token);
          const newProfile = {
            ...profile,
            ...updateDiff
          };
          Cookies.set("jwt", res.data.token);
          dispatch(updateProfileSuccess(newProfile));
        })
        .catch(err => {
          console.log(err);
          dispatch(updateProfileFail());
        });
    }
  };
};
