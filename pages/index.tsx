import { NextPage, NextPageContext } from "next";
import { Store } from "redux";
import cookies from "next-cookies";
import jwt_decode from "jwt-decode";
import Signup from "./signup";
import { States } from "@src/app/types";
import { signinSuccess } from "@src/features/auth/actions";
import { updateProfileSuccess } from "@src/features/profile/actions";
import Header from "@src/common/components/shared/Header";
import Home from "@src/common/components/pages";

type Props = {
  store: States;
};

interface Context extends NextPageContext {
  store: Store<States>;
}

const Root: NextPage<Props> = ({ store }) => {
  const isSignin = store.auth.isSignin;

  if (isSignin) {
    return (
      <>
        <Header route="/stock" />
        <Home />
      </>
    );
  }
  return <Signup />;
};

Root.getInitialProps = (ctx: Context) => {
  const allCookies = cookies(ctx);
  const token = allCookies.jwt;

  if (typeof token === "string") {
    const profile = jwt_decode(token);
    ctx.store.dispatch(signinSuccess());
    ctx.store.dispatch(updateProfileSuccess(profile));
  }
  return { store: ctx.store.getState() };
};

export default Root;
