export const SIGNUP = "auth/signup/REQUEST";
export const SIGNUP_SUCCESS = "auth/signup/SUCCESS";
export const SIGNUP_FAIL = "auth/signup/FAIL";
export const SIGNIN = "auth/signin/REQUEST";
export const SIGNIN_SUCCESS = "auth/signin/SUCCESS";
export const SIGNIN_FAIL = "auth/signin/FAIL";
export const SIGNOUT = "auth/signout/REQUEST";

export const signupRequest = () => ({
  type: SIGNUP
});

export const signupSuccess = () => ({
  type: SIGNUP_SUCCESS
});

export const signupFail = () => ({
  type: SIGNUP_FAIL,
  payload: { status: false }
});

export const signinRequest = () => ({
  type: SIGNIN
});

export const signinSuccess = () => ({
  type: SIGNIN_SUCCESS
});

export const signinFail = () => ({
  type: SIGNIN_FAIL
});

export const signout = () => ({
  type: SIGNOUT
});
