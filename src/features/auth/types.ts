export type State = {
  isSignin: boolean | string;
};

export type AuthAction = {
  type: string;
  payload: { status: boolean | string };
};

export type signupParams = {
  user_name: string;
  email: string;
  password: string;
};
