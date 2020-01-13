import { NextPage } from "next";
import styled from "styled-components";
import cookies from "next-cookies";
import jwt_decode from "jwt-decode";
import Header from "@src/common/components/shared/Header";
import { SideBar, ProfileEditor } from "@src/common/components/pages/settings";
import { signinSuccess } from "@src/features/auth/actions";
import { updateProfileSuccess } from "@src/features/profile/actions";

const Profile: NextPage = () => {
  return (
    <>
      <Header />
      <Main>
        <SideBar />
        <ProfileEditor />
      </Main>
    </>
  );
};

Profile.getInitialProps = async (ctx: any) => {
  const allCookies = cookies(ctx);
  const token = allCookies.jwt;
  if (typeof token === "string") {
    const profile = jwt_decode(token);
    ctx.store.dispatch(signinSuccess());
    ctx.store.dispatch(updateProfileSuccess(profile));
  }
  return { store: ctx.store };
};

const Main = styled.div`
  width: 1024px;
  margin: 0 auto;
  padding: 48px;
  display: flex;
  border-radius: 8px;
`;

export default Profile;
