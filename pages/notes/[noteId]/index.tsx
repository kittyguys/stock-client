import { NextPage } from "next";
import styled from "styled-components";
import cookies from "next-cookies";
import jwt_decode from "jwt-decode";
import { signinSuccess } from "@src/features/auth/actions";
import { updateProfileSuccess } from "@src/features/profile/actions";
import Header from "@src/common/components/shared/Header";
import Notes from "@src/common/components/pages/notes/noteId";

const Stock: NextPage = ({}) => {
  return (
    <>
      <Header route="/stock" />
      <Notes />
    </>
  );
};

Stock.getInitialProps = async (ctx: any) => {
  const allCookies = cookies(ctx);
  const token = allCookies.jwt;
  if (typeof token === "string") {
    const profile = jwt_decode(token);
    ctx.store.dispatch(signinSuccess());
    ctx.store.dispatch(updateProfileSuccess(profile));
  }
  return { store: ctx.store };
};

export default Stock;
