import * as React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import SignupFormConfirm from "@src/common/components/pages/signup/comfirm";

const SignupConfirm = () => {
  const profile = useSelector((state: any) => state.signup.profile);
  return (
    <Layout>
      <SignupFormConfirm profile={profile} />
    </Layout>
  );
};

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SignupConfirm;
