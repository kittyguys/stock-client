import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { createInstance } from "@src/utils/request";
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
): ThunkAction<void, {}, undefined, AnyAction> => dispatch => {
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
    const request = createInstance({
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    request({
      method: "patch",
      url: "/api/users/",
      data: {
        ...formData
      }
    })
      .then(({ data }) => {
        const token = Cookies.get("jwt");
        const profile = token && jwt_decode<any>(token!); // TODO
        if (!profile) {
          return;
        }
        const updateDiff: any = jwt_decode<any>(data.token); // TODO
        const newProfile = {
          ...profile,
          ...updateDiff
        };
        Cookies.set("jwt", data.token);
        dispatch(updateProfileSuccess(newProfile));
      })
      .catch(err => {
        console.log(err.message);
        dispatch(updateProfileFail());
      });
  } else {
    const request = createInstance();
    request({
      method: "patch",
      url: "/api/users/",
      data
    })
      .then(({ data }) => {
        const token = Cookies.get("jwt");
        const profile = token && jwt_decode<any>(token!); // TODO
        if (!profile) {
          return;
        }
        const updateDiff = jwt_decode<any>(data.token); // TODO
        const newProfile = {
          ...profile,
          ...updateDiff
        };
        Cookies.set("jwt", data.token);
        dispatch(updateProfileSuccess(newProfile));
      })
      .catch(err => {
        console.log(err);
        dispatch(updateProfileFail());
      });
  }
};
