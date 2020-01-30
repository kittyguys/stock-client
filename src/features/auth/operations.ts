import Router from "next/router";
import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { createInstance } from "@src/utils/request";
import { signupParams } from "./types";
import { updateProfileSuccess } from "@src/features/profile/actions";
import {
  signupRequest,
  signupSuccess,
  signupFail,
  signinRequest,
  signinSuccess,
  signinFail
} from "./actions";

export const signup = (
  params: signupParams
): ThunkAction<void, {}, undefined, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(signupRequest());
    const request = createInstance();
    request({
      method: "post",
      url: "/api/auth/signup/",
      data: {
        ...params
      }
    })
      .then(({ data }) => {
        const profile = jwt_decode(data.token);
        Cookies.set("jwt", data.token);
        dispatch(signupSuccess());
        dispatch(updateProfileSuccess(profile));
        Router.push("/");
      })
      .catch(_err => {
        dispatch(signupFail());
      });
  };
};

export const signin = (
  params: any
): ThunkAction<void, {}, undefined, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(signinRequest());
    const request = createInstance();
    request({
      method: "post",
      url: "/api/auth/signin/",
      data: {
        ...params
      }
    })
      .then(({ data }) => {
        const profile = jwt_decode(data.token);
        Cookies.set("jwt", data.token);
        dispatch(signinSuccess());
        dispatch(updateProfileSuccess(profile));
      })
      .catch(_err => {
        dispatch(signinFail());
      });
  };
};
