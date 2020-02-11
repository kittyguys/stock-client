import { NextPage, NextPageContext } from "next";
import { useSelector } from "react-redux";
import cookies from "next-cookies";
import jwt_decode from "jwt-decode";
import Signup from "./signup";
import { States } from "@src/app/types";
import { signinSuccess } from "@src/features/auth/actions";
import { updateProfileSuccess } from "@src/features/profile/actions";
import Header from "@src/common/components/shared/Header";
import UserRoot from "@src/common/components/pages/root";

type Props = {
  store: States;
};

interface Context extends NextPageContext {
  store: any;
}

const Root: NextPage<Props> = ({ store }) => {
  const isSignin = useSelector((state: any) => state.auth.isSignin);

  if (isSignin) {
    return (
      <>
        <Header route="/stock" />
        <UserRoot />
      </>
    );
  }
  return <Signup />;
};

Root.getInitialProps = async (ctx: Context) => {
  const allCookies = cookies(ctx);
  const token = allCookies.jwt;

  if (typeof token === "string") {
    const profile = jwt_decode(token);
    ctx.store.dispatch(signinSuccess());
    ctx.store.dispatch(updateProfileSuccess(profile));
  }
  return { store: ctx.store };
};

export default Root;
