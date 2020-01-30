export type Error = {
  message?: string;
};

export type State = {
  isSignin: boolean | string;
  error: Error;
};

export type AuthAction = {
  type: string;
  payload: { status: boolean | string; message: string };
};

export type signupParams = {
  user_name: string;
  email: string;
  password: string;
};
