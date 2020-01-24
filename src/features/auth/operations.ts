import Router from "next/router";
import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
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
    axios
      .post(
        `http://${process.env.API_PATH}:${process.env.API_PORT}/api/auth/signup`,
        params
      )
      .then(res => {
        const profile = jwt_decode(res.data.token);
        Cookies.set("jwt", res.data.token);
        dispatch(signupSuccess());
        dispatch(updateProfileSuccess(profile));
        Router.push("/");
      })
      .catch(err => {
        console.log(err);
        dispatch(signupFail());
        Router.push("/");
      });
  };
};

export const signin = (
  params: any
): ThunkAction<void, {}, undefined, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(signinRequest());
    axios
      .post(
        `http://${process.env.API_PATH}:${process.env.API_PORT}/api/auth/signin`,
        params
      )
      .then(res => {
        const profile = jwt_decode(res.data.token);
        Cookies.set("jwt", res.data.token);
        dispatch(signinSuccess());
        dispatch(updateProfileSuccess(profile));
      })
      .catch(err => {
        dispatch(signinFail());
      });
  };
};
