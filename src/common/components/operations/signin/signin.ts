import { Dispatch } from "react";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import client from "@src/utils/client";
import {
  signinRequest,
  signinSuccess,
  signinFail
} from "@src/features/auth/actions";
import { updateProfileSuccess } from "@src/features/profile/actions";
import { FormValues } from "@src/common/components/pages/signin/types";

export const signin = (dispatch: Dispatch<any>, values: FormValues) => {
  dispatch(signinRequest());
  client
    .post("/api/auth/signin/", {
      ...values
    })
    .then(({ data }) => {
      const profile = jwt_decode(data.token);
      Cookies.set("jwt", data.token);
      dispatch(signinSuccess());
      dispatch(updateProfileSuccess(profile));
    })
    .catch(({ response }) => {
      dispatch(signinFail({ message: response.data.errorMessage }));
    });
};
